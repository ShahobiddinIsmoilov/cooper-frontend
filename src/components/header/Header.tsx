import { useState } from "react";
import { Link } from "react-router-dom";
import { IoCube } from "react-icons/io5";
import { Flex, Portal } from "@mantine/core";
import { Authentication } from "./Authentication";
import { useLanguage } from "../../contexts/LanguageContext";
import { useWindowSize } from "../../contexts/WindowSizeContext";

export default function Header() {
  const [showLogo, setShowLogo] = useState(true);
  const { screenWidth } = useWindowSize();

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
      <Link to="/all" className="flex items-center gap-3">
        <IoCube size={32} />
        {screenWidth >= 576 && (
          <span className="text-xl font-bold">Diagonal.uz</span>
        )}
      </Link>
      <div className="flex items-center">
        {screenWidth >= 700 && <LanguageChoices />}
        <Flex align="center" gap={8}>
          <Authentication />
        </Flex>
      </div>
    </div>
  );
}

export function LanguageChoices() {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="mr-4 flex gap-4 text-xs font-bold">
      <button
        onClick={() => {
          changeLanguage("en");
        }}
        className={`w-8 h-8 min-w-8 min-h-8 rounded-full hover:bg-dark-700 flex justify-center items-center ${
          language === "en" ? "border-2 border-white" : "bg-dark-900"
        } `}
      >
        EN
      </button>
      <button
        onClick={() => {
          changeLanguage("uz");
        }}
        className={`w-8 h-8 min-w-8 min-h-8 rounded-full hover:bg-dark-700 flex justify-center items-center ${
          language === "uz" ? "border-2 border-white" : "bg-dark-900"
        }`}
      >
        UZ
      </button>
    </div>
  );
}
