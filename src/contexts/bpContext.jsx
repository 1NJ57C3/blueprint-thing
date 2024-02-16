import { createContext, useContext, useState } from "react";

const BPContext = createContext(null);

export function BPProvider({ children }) {

  return (
    <BPContext.Provider value={{
      
    }}>
      {children}
    </BPContext.Provider>
  )
}

export function useBPContext() {
  const context = useContext(BPContext);

  if (!context) {
    throw new Error("BPContext Provider not found!");
  }

  return context;
}
