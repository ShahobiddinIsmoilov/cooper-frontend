import { useEffect } from "react";
import { FocusTrap, Portal } from "@mantine/core";
import { IoMdClose } from "react-icons/io";
import { useDialog } from "./contexts/DialogContext";

export default function Modallion() {
  const {
    isDialogVisible,
    withCloseButton,
    dialogContent,
    dialogContentRef,
    handleDialogClose,
  } = useDialog();

  useEffect(() => {
    function handleEscape(event: any) {
      if (event.key === "Escape") {
        handleDialogClose();
      }
    }
    window.addEventListener("keydown", handleEscape);

    function handleOutsideClick(e: any) {
      if (
        dialogContentRef.current &&
        !dialogContentRef.current.contains(e.target)
      ) {
        handleDialogClose();
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const modallion = (
    <FocusTrap>
      <div
        className={`fixed top-0 left-0 z-[101] w-screen h-screen bg-black/85`}
      >
        <div className="w-full h-full flex justify-center items-center">
          {dialogContent}
        </div>
        {withCloseButton && (
          <button
            onClick={handleDialogClose}
            className="absolute top-6 right-6 p-2 bg-dark-950/50 hover:bg-dark-800 rounded-full text-2xl"
          >
            <IoMdClose />
          </button>
        )}
      </div>
    </FocusTrap>
  );

  if (isDialogVisible) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return isDialogVisible ? <Portal>{modallion}</Portal> : null;
}
