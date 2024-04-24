import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface WindowSizeProps {
  screenWidth: number;
  screenHeight: number;
}

const WindowSizeContext = createContext<WindowSizeProps | null>(null);

export function useWindowSize() {
  return useContext(WindowSizeContext) as WindowSizeProps;
}

interface WindowSizeProviderProps {
  children: ReactNode;
}

function WindowSizeProvider({ children }: WindowSizeProviderProps) {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  let contextData = {
    screenWidth: screenWidth,
    screenHeight: screenHeight,
  };

  return (
    <WindowSizeContext.Provider value={contextData}>
      {children}
    </WindowSizeContext.Provider>
  );
}

export default WindowSizeProvider;
