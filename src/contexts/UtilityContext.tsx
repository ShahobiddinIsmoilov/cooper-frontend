import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface UtilityContextProps {
  screenWidth: number;
  screenHeight: number;
}

const UtilityContext = createContext<UtilityContextProps | null>(null);

export function useWindowSize() {
  return useContext(UtilityContext) as UtilityContextProps;
}

interface UtilityProviderProps {
  children: ReactNode;
}

export default function UtilityProvider(props: UtilityProviderProps) {
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
  }, []);

  let contextData = {
    screenWidth: screenWidth,
    screenHeight: screenHeight,
  };

  return (
    <UtilityContext.Provider value={contextData}>
      {props.children}
    </UtilityContext.Provider>
  );
}
