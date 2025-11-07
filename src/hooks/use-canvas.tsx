import { useEffect, useRef } from "react";

interface Props {
  size: number;
  draw: (context: CanvasRenderingContext2D) => void;
}

export function useCanvas({ size, draw }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext("2d");
    if (!context) return;

    draw(context);
  }, [size, draw]);

  return ref;
}
