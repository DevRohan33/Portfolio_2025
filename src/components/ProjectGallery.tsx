"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/content/caseStudies";

const isPortrait = (img: GalleryImage) => img.height > img.width;

export default function ProjectGallery({
  images,
  name,
}: {
  images: GalleryImage[];
  name: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpen((i) =>
        i === null ? i : (i + dir + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  // Phone screenshots read best side by side; wide ones need the full row.
  const indexed = images.map((img, i) => ({ img, i }));
  const portrait = indexed.filter(({ img }) => isPortrait(img));
  const landscape = indexed.filter(({ img }) => !isPortrait(img));

  const thumb = (
    { img, i }: { img: GalleryImage; i: number },
    sizes: string,
  ) => (
    <figure key={img.src} className="group">
      <button
        type="button"
        onClick={() => setOpen(i)}
        className="block w-full overflow-hidden rounded-control border border-paper-text/10 bg-white transition-all duration-150 hover:border-paper-text/30 hover:-translate-y-0.5"
        aria-label={`Open ${img.alt}`}
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          sizes={sizes}
          className="w-full h-auto"
        />
      </button>
      {img.caption && (
        <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.06em] text-paper-text/50">
          {img.caption}
        </figcaption>
      )}
    </figure>
  );

  const current = open === null ? null : images[open];

  return (
    <>
      {portrait.length > 0 && (
        <div
          className={`grid gap-5 ${
            portrait.length >= 4
              ? "grid-cols-2 md:grid-cols-4"
              : "grid-cols-2 md:grid-cols-3"
          }`}
        >
          {portrait.map((item) => thumb(item, "(min-width: 768px) 25vw, 50vw"))}
        </div>
      )}
      {landscape.length > 0 && (
        <div
          className={`grid md:grid-cols-2 gap-6 ${portrait.length ? "mt-8" : ""}`}
        >
          {landscape.map((item) =>
            thumb(item, "(min-width: 768px) 50vw, 100vw"),
          )}
        </div>
      )}

      {current && open !== null && (
        <div
          className="fixed inset-0 z-[70] bg-ink/95 backdrop-blur-sm flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={`${name} screenshots`}
          onClick={close}
        >
          <div className="flex items-center justify-between px-5 lg:px-8 py-5 text-text-primary">
            <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-text-subtle">
              {name} - {open + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={close}
              className="label-eyebrow border border-hairline rounded-full p-2 hover:text-text-primary"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          <div
            className="relative flex-1 min-h-0 px-14 md:px-20 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-hairline text-text-primary flex items-center justify-center hover:bg-accent hover:text-ink hover:border-accent transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-hairline text-text-primary flex items-center justify-center hover:bg-accent hover:text-ink hover:border-accent transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {current.caption && (
            <p
              className="pb-6 px-5 text-center font-mono text-[12px] uppercase tracking-[0.06em] text-text-muted"
              onClick={(e) => e.stopPropagation()}
            >
              {current.caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}
