import { useState, useLayoutEffect, useCallback, useRef } from "react";

import { visuals } from "./style.module.css";

export function ShaderCanvas() {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const ref = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    console.log("layout...");
    console.log(ref.current);
  }, [ref.current]);

  useLayoutEffect(() => {
    if (ctx) {
      ctx.fillStyle = "green";
      ctx.fillRect(10, 10, 150, 100);
    }
  }, [ctx]);

  const callbackRef = useCallback(
    (canvas: HTMLCanvasElement | null) => {
      if (canvas) {
        setCtx(canvas.getContext("2d"));
      } else {
        setCtx(null);
      }
    },
    [setCtx]
  );

  return <canvas className={visuals} ref={ref} />;
}
