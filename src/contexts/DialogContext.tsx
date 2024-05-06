import { ReactNode, createContext, useContext, useRef, useState } from "react";

interface DialogProps {
  isDialogVisible: boolean;
  setIsDialogVisible: (e: boolean) => void;
  withCloseButton: boolean;
  handleDialogClose: () => void;
  dialogContent: ReactNode;
  setDialogContent: (e: ReactNode) => void;
  dialogContentRef: any;
  setWithCloseButton: (e: boolean) => void;
}

const DialogContext = createContext<DialogProps | null>(null);

export function useDialog() {
  return useContext(DialogContext) as DialogProps;
}

interface DialogProviderProps {
  children: ReactNode;
}

export default function DialogProvider({ children }: DialogProviderProps) {
  const dialogContentRef = useRef<HTMLElement>(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [withCloseButton, setWithCloseButton] = useState(false);
  const [dialogContent, setDialogContent] = useState<ReactNode | null>(null);

  function handleDialogClose() {
    setIsDialogVisible(false);
  }

  let contextData = {
    isDialogVisible: isDialogVisible,
    setIsDialogVisible: setIsDialogVisible,
    withCloseButton: withCloseButton,
    handleDialogClose: handleDialogClose,
    dialogContent: dialogContent,
    setDialogContent: setDialogContent,
    dialogContentRef: dialogContentRef,
    setWithCloseButton: setWithCloseButton,
  };

  return (
    <DialogContext.Provider value={contextData}>
      {children}
    </DialogContext.Provider>
  );
}
