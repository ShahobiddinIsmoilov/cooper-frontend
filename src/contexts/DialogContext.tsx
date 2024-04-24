import { ReactNode, createContext, useContext, useState } from "react";

interface DialogProps {
  isDialogVisible: boolean;
  setIsDialogVisible: (e: boolean) => void;
  handleDialogClose: () => void;
  dialogContent: ReactNode;
  setDialogContent: (e: ReactNode) => void;
}

const DialogContext = createContext<DialogProps | null>(null);

export function useDialog() {
  return useContext(DialogContext) as DialogProps;
}

interface DialogProviderProps {
  children: ReactNode;
}

function DialogProvider({ children }: DialogProviderProps) {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState<ReactNode | null>(null);

  function handleDialogClose() {
    setIsDialogVisible(false);
  }

  let contextData = {
    isDialogVisible: isDialogVisible,
    setIsDialogVisible: setIsDialogVisible,
    handleDialogClose: handleDialogClose,
    dialogContent: dialogContent,
    setDialogContent: setDialogContent,
  };

  return (
    <DialogContext.Provider value={contextData}>
      {children}
    </DialogContext.Provider>
  );
}

export default DialogProvider;
