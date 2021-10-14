import { useState, useLayoutEffect, useCallback } from "react";

import { visuals } from "./style.module.css";

export function ShaderCanvas() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  const callbackRef = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (canvas) {
        setCanvas(canvas);
      } else {
        setCanvas(null);
      }
    },
    [setCanvas]
  );

  const [[width, height], setDimensions] = useState<[number, number]>([0, 0]);

  useLayoutEffect(() => {
    if (canvas) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      setDimensions([canvas.clientWidth, canvas.clientHeight]);

      const observer = new ResizeObserver(([{ contentBoxSize }]) => {
        let [{ blockSize, inlineSize }] = contentBoxSize;
        setDimensions([inlineSize, blockSize]);
        console.log(`resize: ${inlineSize}, ${blockSize}`);
      });

      observer.observe(canvas);

      return () => {
        observer.disconnect();
      };
    } else {
      setDimensions([0, 0]);
    }
  }, [canvas, setDimensions]);

  useLayoutEffect(() => {
    if (canvas && width > 0 && height > 0) {
      const ctx = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;

      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(50, 50, 200, 100);
      }
    }
  }, [canvas, width, height]);

  return <canvas className={visuals} ref={callbackRef} />;
}
