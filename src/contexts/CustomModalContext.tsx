import { ReactNode, createContext, useContext, useRef, useState } from "react";

interface CustomModalProps {
  isCustomModalOpen: boolean;
  customModalContent: ReactNode;
  customModalContentRef: any;
  openCustomModal: () => void;
  closeCustomModal: () => void;
  setCustomModalContent: (e: ReactNode) => void;
}

const CustomModalContext = createContext<CustomModalProps | null>(null);

export function useCustomModal() {
  return useContext(CustomModalContext) as CustomModalProps;
}

interface CustomModalProviderProps {
  children: ReactNode;
}

export default function CustomModalProvider({
  children,
}: CustomModalProviderProps) {
  const customModalContentRef = useRef<HTMLElement>(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customModalContent, setCustomModalContent] =
    useState<ReactNode | null>(null);

  function openCustomModal() {
    setIsCustomModalOpen(true);
  }

  function closeCustomModal() {
    setIsCustomModalOpen(false);
  }

  let contextData = {
    isCustomModalOpen: isCustomModalOpen,
    customModalContent: customModalContent,
    customModalContentRef: customModalContentRef,
    openCustomModal: openCustomModal,
    closeCustomModal: closeCustomModal,
    setCustomModalContent: setCustomModalContent,
  };

  return (
    <CustomModalContext.Provider value={contextData}>
      {children}
    </CustomModalContext.Provider>
  );
}