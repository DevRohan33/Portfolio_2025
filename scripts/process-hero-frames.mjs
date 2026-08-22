import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, "../public/hero");
const OUT_DIR = path.join(__dirname, "../public/hero-frames");
const STEP = 3; // keep every 3rd frame

// Crop box in native 1280x720 source coordinates, found by scanning the
// keyed alpha bounding box across the sequence (scripts/analyze-hero-bbox.mjs)
// and padding for the head-turn range. Excludes the decorative sparkle glyph
// that occasionally reaches further right than the subject.
const CROP = { left: 230, top: 0, width: 830, height: 720 };
const OUT_WIDTH = 800;

// Background is a light blue gradient; hue stays ~195-199 across it regardless
// of the vignette's lightness/saturation swing, which is what makes hue-based
// keying work where a single flat-color reference (corner sampling) doesn't.
const HUE_CENTER = 197;
const HUE_FLAT = 14;
const HUE_ZERO = 30;
const SAT_LO0 = 12, SAT_LO1 = 18, SAT_HI0 = 42, SAT_HI1 = 50;
const VAL_LO = 60, VAL_HI = 72;

const testMode = process.argv.includes("--test");

function rgb2hsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : d / max;
  const v = max;
  return [h, s * 100, v * 100];
}

function rampDown(d, d1, d2) {
  if (d <= d1) return 1;
  if (d >= d2) return 0;
  return 1 - (d - d1) / (d2 - d1);
}
function trapezoid(x, x0, x1, x2, x3) {
  if (x <= x0 || x >= x3) return 0;
  if (x >= x1 && x <= x2) return 1;
  if (x < x1) return (x - x0) / (x1 - x0);
  return (x3 - x) / (x3 - x2);
}
function rampUp(v, v1, v2) {
  if (v <= v1) return 0;
  if (v >= v2) return 1;
  return (v - v1) / (v2 - v1);
}

async function keyFrame(filePath) {
  // Key at native resolution first (more accurate HSV than keying a
  // downscaled/blurred image), then crop, then resize down for delivery.
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const [h, s, v] = rgb2hsv(data[i], data[i + 1], data[i + 2]);
    const hueDiff = Math.min(Math.abs(h - HUE_CENTER), 360 - Math.abs(h - HUE_CENTER));
    const mHue = rampDown(hueDiff, HUE_FLAT, HUE_ZERO);
    const mSat = trapezoid(s, SAT_LO0, SAT_LO1, SAT_HI0, SAT_HI1);
    const mVal = rampUp(v, VAL_LO, VAL_HI);
    const bgMembership = mHue * mSat * mVal;
    data[i + 3] = Math.round(255 * (1 - bgMembership));
  }

  return sharp(data, { raw: { width, height, channels } })
    .extract(CROP)
    .resize(OUT_WIDTH, null)
    .png();
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const files = fs
    .readdirSync(SRC_DIR)
    .filter((f) => f.endsWith(".png"))
    .sort();

  if (testMode) {
    for (const name of ["ezgif-frame-001.png", "ezgif-frame-150.png", "ezgif-frame-225.png"]) {
      const out = await keyFrame(path.join(SRC_DIR, name));
      const outPath = path.join(OUT_DIR, `test-${name.replace(".png", ".webp")}`);
      await out.webp({ quality: 85, alphaQuality: 95 }).toFile(outPath);
      console.log("wrote", outPath);
    }
    return;
  }

  const selected = files.filter((_, i) => i % STEP === 0);
  console.log(`Processing ${selected.length} of ${files.length} frames...`);

  let count = 0;
  let outHeight = 0;
  for (const file of selected) {
    const out = await keyFrame(path.join(SRC_DIR, file));
    const outName = `frame-${String(count + 1).padStart(4, "0")}.webp`;
    const info = await out.webp({ quality: 82, alphaQuality: 92 }).toFile(path.join(OUT_DIR, outName));
    outHeight = info.height;
    count++;
    if (count % 20 === 0) console.log(`  ${count}/${selected.length}`);
  }

  fs.writeFileSync(
    path.join(OUT_DIR, "manifest.json"),
    JSON.stringify({ count, width: OUT_WIDTH, height: outHeight }, null, 2)
  );
  console.log(`Done. Wrote ${count} frames (${OUT_WIDTH}x${outHeight}) + manifest.json to ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
