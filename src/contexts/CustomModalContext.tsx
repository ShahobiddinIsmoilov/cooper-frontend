import { ReactNode, createContext, useContext, useRef, useState } from "react";

interface CustomModalProps {
  customModalContent: ReactNode;
  customModalContentRef: any;
  isCustomModalOpen: boolean;
  withCloseButton: boolean;
  overlayColor: string;
  openCustomModal: () => void;
  closeCustomModal: () => void;
  setOverlayColor: (value: string) => void;
  setWithCloseButton: (value: boolean) => void;
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
  const [withCloseButton, setWithCloseButton] = useState(true);
  const [overlayColor, setOverlayColor] = useState("black/85");
  const [customModalContent, setCustomModalContent] =
    useState<ReactNode | null>(null);

  function openCustomModal() {
    setIsCustomModalOpen(true);
  }

  function closeCustomModal() {
    setIsCustomModalOpen(false);
  }

  let contextData = {
    customModalContentRef: customModalContentRef,
    customModalContent: customModalContent,
    isCustomModalOpen: isCustomModalOpen,
    withCloseButton: withCloseButton,
    overlayColor: overlayColor,
    openCustomModal: openCustomModal,
    setOverlayColor: setOverlayColor,
    closeCustomModal: closeCustomModal,
    setWithCloseButton: setWithCloseButton,
    setCustomModalContent: setCustomModalContent,
  };

  return (
    <CustomModalContext.Provider value={contextData}>
      {children}
    </CustomModalContext.Provider>
  );
}
