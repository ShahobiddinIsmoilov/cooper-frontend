import { useState } from "react";
import { Link } from "react-router-dom";
import { IoCube } from "react-icons/io5";
import { Flex, Portal } from "@mantine/core";
import { Authentication } from "./Authentication";

export default function Header() {
  const [showLogo, setShowLogo] = useState(true);

  const logo = (
    <div className="fixed top-0 left-0 bg-dark-850 w-screen h-screen z-[101]">
      <div className="flex justify-center items-center w-full h-full">
        <IoCube size={80} className="mb-8 sm:mb-8" />
      </div>
    </div>
  );

  setTimeout(() => {
    setShowLogo(false);
  }, 1500);

  return (
    <div className="flex justify-between bg-dark-900 h-full text-white px-4 xs:px-8 py-2 z-50">
      {showLogo && <Portal>{logo}</Portal>}
      <Link to="/home" className="flex items-center">
        <IoCube size={32} />
      </Link>
      <Flex align="center" gap={8}>
        <Authentication />
      </Flex>
    </div>
  );
}
