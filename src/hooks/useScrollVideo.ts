"use client";

import { useEffect, useRef, useCallback } from "react";
import { ScrollTrigger } from "@/lib/gsap-register";

const FRAME_SOURCES = [
  "/images/keyframe-01.png",
  "/images/keyframe-02.png",
  "/images/keyframe-03.png",
  "/images/keyframe-04.png",
  "/images/keyframe-05.png",
  "/images/keyframe-06.png",
];

/**
 * Preloads all keyframe images and returns them as HTMLImageElement[].
 */
function preloadImages(srcs: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(
    srcs.map(
      (src) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        })
    )
  );
}

export function useScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || frames.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const progress = progressRef.current;
    const lastIndex = frames.length - 1;
    const exactIndex = progress * lastIndex;
    const lower = Math.floor(exactIndex);
    const upper = Math.min(lower + 1, lastIndex);
    const blend = exactIndex - lower; // 0–1 between two frames

    // Size canvas to fill its container
    const { width, height } = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Draw the lower frame (cover-fit)
    drawCover(ctx, frames[lower], width, height);

    // Crossfade: draw upper frame on top with blend alpha
    if (blend > 0 && upper !== lower) {
      ctx.globalAlpha = blend;
      drawCover(ctx, frames[upper], width, height);
      ctx.globalAlpha = 1;
    }

    rafRef.current = null;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let st: ScrollTrigger | null = null;

    preloadImages(FRAME_SOURCES).then((frames) => {
      framesRef.current = frames;

      // Draw first frame immediately
      progressRef.current = 0;
      drawFrame();

      st = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          if (rafRef.current === null) {
            rafRef.current = requestAnimationFrame(drawFrame);
          }
        },
      });
    });

    return () => {
      st?.kill();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  return { canvasRef, containerRef };
}

/** Draw image to fill canvas area (object-cover equivalent). */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(cw / iw, ch / ih);
  const sw = iw * scale;
  const sh = ih * scale;
  const sx = (cw - sw) / 2;
  const sy = (ch - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh);
}
