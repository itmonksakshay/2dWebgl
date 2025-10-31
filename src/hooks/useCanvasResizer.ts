import { useEffect, useRef, useState } from "react";

export const useCanvasResizer = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dimensions, setDimension] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          let width: number = 0;
          let height: number = 0;
          let dpr = window.devicePixelRatio;
          if (entry.devicePixelContentBoxSize) {
            // NOTE: Only this path gives the correct answer
            // The other paths are imperfect fallbacks
            // for browsers that don't provide anyway to do this
            width = entry.devicePixelContentBoxSize[0].inlineSize;
            height = entry.devicePixelContentBoxSize[0].blockSize;
            dpr = 1; // it's already in width and height
          } else if (entry.contentBoxSize) {
            if (entry.contentBoxSize[0]) {
              width = entry.contentBoxSize[0].inlineSize;
              height = entry.contentBoxSize[0].blockSize;
            }
          } else {
            width = entry.contentRect.width;
            height = entry.contentRect.height;
          }
          const displayWidth = Math.round(width * dpr);
          const displayHeight = Math.round(height * dpr);
          if (
            canvas.width !== displayWidth ||
            canvas.height !== displayHeight
          ) {
            canvas.width = displayWidth;
            canvas.height = displayHeight;
            setDimension({ width: displayWidth, height: displayHeight });
            setIsReady(true);
          }
        }
      }
    );

    try {
      // only call us of the number of device pixels changed
      resizeObserver.observe(canvas, { box: "device-pixel-content-box" });
    } catch {
      // device-pixel-content-box is not supported so fallback to this
      resizeObserver.observe(canvas, { box: "content-box" });
    }

    return () => resizeObserver.disconnect();
  }, [canvasRef]);
  return { canvasRef, isReady, dimensions };
};
