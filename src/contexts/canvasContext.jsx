import { createContext, useState } from "react";

export const CanvasContext = createContext(null);

export function CanvasProvider({ children }) {
  const [flameLevel, setFlameLevel] = useState(1);
  const [blockTool, setBlockTool] = useState({ size: 4, direction: 'x' });

  return (
    <CanvasContext.Provider value={{ flameLevel, setFlameLevel, blockTool, setBlockTool }}>
      {children}
    </CanvasContext.Provider>
  );
}
