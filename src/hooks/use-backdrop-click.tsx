import { useEffect, useRef } from "react";

interface Props {
  callback: () => void;
}

export function useBackdropClick<Element extends HTMLElement>({
  callback,
}: Props) {
  const targetRef = useRef<Element>(null);

  useEffect(() => {
    function handleMouseUp(event: MouseEvent) {
      if (
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        callback();
      }
    }

    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [targetRef, callback]);

  return targetRef;
}
