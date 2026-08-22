"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 100;
const FRAME_WIDTH = 800;
const FRAME_HEIGHT = 694;
const FRAME_PATH = (i: number) => `/hero-frames/frame-${String(i + 1).padStart(4, "0")}.webp`;

export default function HeroAvatar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = FRAME_WIDTH * dpr;
    canvas.height = FRAME_HEIGHT * dpr;
    ctx.scale(dpr, dpr);

    const draw = (index: number) => {
      const img = framesRef.current[index];
      if (!img || !img.complete) return;
      ctx.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
      ctx.drawImage(img, 0, 0, FRAME_WIDTH, FRAME_HEIGHT);
    };

    let cancelled = false;

    const preload = async () => {
      const images: HTMLImageElement[] = new Array(FRAME_COUNT);
      const load = (i: number) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = FRAME_PATH(i);
          images[i] = img;
        });

      // load poster first so something renders immediately
      await load(0);
      if (cancelled) return;
      draw(0);

      const CONCURRENCY = 8;
      let next = 1;
      const workers = Array.from({ length: CONCURRENCY }, async () => {
        while (next < FRAME_COUNT && !cancelled) {
          const i = next++;
          await load(i);
        }
      });
      await Promise.all(workers);
      framesRef.current = images;
    };

    framesRef.current = [];
    preload();

    if (prefersReducedMotion) {
      return () => {
        cancelled = true;
      };
    }

    let raf = 0;
    const animate = () => {
      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      if (current !== target) {
        const diff = target - current;
        const step = Math.sign(diff) * Math.max(1, Math.round(Math.abs(diff) * 0.15));
        currentFrameRef.current = Math.max(
          0,
          Math.min(FRAME_COUNT - 1, current + step)
        );
        draw(currentFrameRef.current);
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const heroSection = canvas.closest("section");
    const handlePointerMove = (e: PointerEvent) => {
      const rect = (heroSection ?? canvas).getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      targetFrameRef.current = Math.round(x * (FRAME_COUNT - 1));
    };

    heroSection?.addEventListener("pointermove", handlePointerMove);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      heroSection?.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none select-none h-[85%] w-auto max-h-[85%]"
      aria-hidden
    />
  );
}
