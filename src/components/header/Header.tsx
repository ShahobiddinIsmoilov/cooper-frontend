import { Flex } from "@mantine/core";
import { Link } from "react-router-dom";
import { IoCube } from "react-icons/io5";
import { Authentication } from "./Authentication";
import { useLayoutEffect } from "react";
import { useCustomModal } from "../../contexts/CustomModalContext";

export default function Header() {
  const {
    openCustomModal,
    setCustomModalContent,
    setWithCloseButton,
    setOverlayColor,
    closeCustomModal,
  } = useCustomModal();

  setTimeout(() => {
    closeCustomModal();
  }, 1500);

  useLayoutEffect(() => {
    setCustomModalContent(
      <div className="flex justify-center items-center w-full h-full">
        <IoCube size={80} className="mb-8 sm:mb-8" />
      </div>
    );
    setWithCloseButton(false);
    setOverlayColor("dark-900");
    openCustomModal();
  }, []);

  return (
    <div className="flex justify-between bg-dark-900 h-full text-white px-4 xs:px-8 py-2 z-50">
      <Link to="/home" className="flex items-center">
        <IoCube size={32} />
      </Link>
      <Flex align="center" gap={8}>
        <Authentication />
      </Flex>
    </div>
  );
}
