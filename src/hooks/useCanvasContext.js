import { useContext } from "react";
import { CanvasContext } from "../contexts/canvasContext";

export function useCanvasContext() {
  const context = useContext(CanvasContext);

  if (!context) {
    throw new Error("CanvasContext Provider not found!");
  }

  return context;
}
