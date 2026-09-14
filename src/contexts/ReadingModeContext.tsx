import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type FontSize = "normal" | "large" | "extra-large";

interface ReadingModeContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  isReadingMode: boolean;
  highContrast: boolean;
  toggleHighContrast: () => void;
}

const ReadingModeContext = createContext<ReadingModeContextType | undefined>(undefined);

export const ReadingModeProvider = ({ children }: { children: ReactNode }) => {
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    const saved = localStorage.getItem("readingFontSize") as FontSize;
    return saved || "normal";
  });

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    const saved = localStorage.getItem("highContrast");
    return saved === "true";
  });

  const isReadingMode = fontSize !== "normal";

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all font size classes first
    root.classList.remove("reading-large", "reading-extra-large");
    
    // Add appropriate class
    if (fontSize === "large") {
      root.classList.add("reading-large");
    } else if (fontSize === "extra-large") {
      root.classList.add("reading-extra-large");
    }
    
    localStorage.setItem("readingFontSize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    const root = document.documentElement;
    
    if (highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
    
    localStorage.setItem("highContrast", String(highContrast));
  }, [highContrast]);

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  return (
    <ReadingModeContext.Provider value={{ fontSize, setFontSize, isReadingMode, highContrast, toggleHighContrast }}>
      {children}
    </ReadingModeContext.Provider>
  );
};

export const useReadingMode = () => {
  const context = useContext(ReadingModeContext);
  if (!context) {
    throw new Error("useReadingMode must be used within a ReadingModeProvider");
  }
  return context;
};
