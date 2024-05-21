import { ReactNode, createContext, useContext, useState } from "react";

interface DialogProps {
  isDialogOpen: boolean;
  dialogContent: ReactNode;
  openDialog: () => void;
  closeDialog: () => void;
  setDialogContent: (e: ReactNode) => void;
}

const DialogContext = createContext<DialogProps | null>(null);

export function useDialog() {
  return useContext(DialogContext) as DialogProps;
}

interface DialogProviderProps {
  children: ReactNode;
}

export default function DialogProvider({ children }: DialogProviderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<ReactNode | null>(null);

  function openDialog() {
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
  }

  let contextData = {
    isDialogOpen: isDialogOpen,
    dialogContent: dialogContent,
    openDialog: openDialog,
    closeDialog: closeDialog,
    setDialogContent: setDialogContent,
  };

  return (
    <DialogContext.Provider value={contextData}>
      {children}
    </DialogContext.Provider>
  );
}
