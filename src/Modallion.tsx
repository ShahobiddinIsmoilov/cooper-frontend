import { useEffect } from "react";
import { FocusTrap, Portal } from "@mantine/core";
import { IoMdClose } from "react-icons/io";
import { useCustomModal } from "./contexts/CustomModalContext";

export default function Modallion() {
  const {
    isCustomModalOpen,
    customModalContent,
    customModalContentRef,
    closeCustomModal,
  } = useCustomModal();

  useEffect(() => {
    function handleEscape(event: any) {
      if (event.key === "Escape") {
        closeCustomModal();
      }
    }
    window.addEventListener("keydown", handleEscape);

    function handleOutsideClick(e: any) {
      if (
        customModalContentRef.current &&
        !customModalContentRef.current.contains(e.target)
      ) {
        closeCustomModal();
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
          {customModalContent}
        </div>
        <button
          onClick={closeCustomModal}
          className="absolute top-6 right-6 p-2 bg-dark-950/50 hover:bg-dark-800 rounded-full text-2xl"
        >
          <IoMdClose />
        </button>
      </div>
    </FocusTrap>
  );

  if (isCustomModalOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return isCustomModalOpen ? <Portal>{modallion}</Portal> : null;
}
