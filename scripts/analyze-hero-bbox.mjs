import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, "../public/hero");

const HUE_CENTER = 197;
const HUE_FLAT = 14;
const HUE_ZERO = 30;
const SAT_LO0 = 12, SAT_LO1 = 18, SAT_HI0 = 42, SAT_HI1 = 50;
const VAL_LO = 60, VAL_HI = 72;

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

async function bboxOf(filePath) {
  const { data, info } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const [h, s, v] = rgb2hsv(data[i], data[i + 1], data[i + 2]);
      const hueDiff = Math.min(Math.abs(h - HUE_CENTER), 360 - Math.abs(h - HUE_CENTER));
      const mHue = rampDown(hueDiff, HUE_FLAT, HUE_ZERO);
      const mSat = trapezoid(s, SAT_LO0, SAT_LO1, SAT_HI0, SAT_HI1);
      const mVal = rampUp(v, VAL_LO, VAL_HI);
      const bgMembership = mHue * mSat * mVal;
      const isFg = bgMembership < 0.5;
      if (isFg) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { minX, maxX, minY, maxY, width, height };
}

async function main() {
  const files = fs.readdirSync(SRC_DIR).filter((f) => f.endsWith(".png")).sort();
  const sample = files.filter((_, i) => i % 15 === 0); // ~20 frames
  let gMinX = Infinity, gMaxX = -Infinity, gMinY = Infinity, gMaxY = -Infinity;
  for (const f of sample) {
    const b = await bboxOf(path.join(SRC_DIR, f));
    gMinX = Math.min(gMinX, b.minX);
    gMaxX = Math.max(gMaxX, b.maxX);
    gMinY = Math.min(gMinY, b.minY);
    gMaxY = Math.max(gMaxY, b.maxY);
    console.log(f, b);
  }
  console.log("UNION BBOX", { gMinX, gMaxX, gMinY, gMaxY });
}

main().catch(console.error);
