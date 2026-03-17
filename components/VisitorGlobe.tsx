"use client";

import { useEffect, useRef, useMemo, useCallback } from "react";
import createGlobe from "cobe";
import { getCoords } from "@/lib/geo";

interface Props {
  countries: Record<string, number>;
}

export default function VisitorGlobe({ countries }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phi = useRef(0);

  const markers = useMemo(
    () =>
      Object.entries(countries)
        .map(([code, count]) => {
          const coords = getCoords(code);
          if (!coords) return null;
          return {
            location: coords as [number, number],
            size: Math.min(0.1 + count * 0.02, 0.35),
          };
        })
        .filter(Boolean) as { location: [number, number]; size: number }[],
    [countries],
  );

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current =
      e.clientX - pointerInteractionMovement.current;
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
  }, []);

  const onPointerUp = useCallback(() => {
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  }, []);

  const onPointerOut = useCallback(() => {
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (pointerInteracting.current !== null) {
      pointerInteractionMovement.current =
        e.clientX - pointerInteracting.current;
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    let width = canvas.offsetWidth;

    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);

    let globe: ReturnType<typeof createGlobe>;
    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.25,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.15, 0.15, 0.15],
        markerColor: [0.96, 0.62, 0.04],
        glowColor: [0.08, 0.08, 0.08],
        markers,
        onRender: (state) => {
          if (pointerInteracting.current === null) {
            phi.current += 0.003;
          } else {
            phi.current += pointerInteractionMovement.current / 200;
          }
          state.phi = phi.current;
          state.width = width * 2;
          state.height = width * 2;
        },
      });
    } catch {
      // WebGL not available — fail silently
      return;
    }

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [markers]);

  return (
    <div
      className="relative w-full aspect-square max-w-md mx-auto"
      style={{ cursor: "grab" }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerOut={onPointerOut}
        onPointerMove={onPointerMove}
        className="w-full h-full"
        style={{ contain: "layout paint size" }}
      />
      <p
        className="text-center text-[10px] mt-2"
        style={{ color: "var(--muted)" }}
      >
        Drag to rotate &middot; Amber dots = visitor locations
      </p>
    </div>
  );
}
