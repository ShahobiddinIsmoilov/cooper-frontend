import { ReactNode, createContext, useContext, useState } from "react";

interface LanguageContextProps {
  language: "uz" | "en" | "ru";
  changeLanguage: (value: "uz" | "en" | "ru") => void;
}

const LanguageContext = createContext<LanguageContextProps | null>(null);

export function useLanguage() {
  return useContext(LanguageContext) as LanguageContextProps;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const LANGUAGE_KEY = "language";

  function getLanguage(): "uz" | "en" | "ru" {
    const userLanguage = localStorage.getItem(LANGUAGE_KEY);
    if (
      userLanguage &&
      ["uz", "en", "ru"].includes(userLanguage as "uz" | "en" | "ru")
    ) {
      return userLanguage as "uz" | "en" | "ru";
    } else {
      return "uz";
    }
  }

  const [language, setLanguage] = useState<"uz" | "en" | "ru">(getLanguage);

  function changeLanguage(language: "uz" | "en" | "ru") {
    setLanguage(language);
    if (["uz", "en", "ru"].includes(language)) {
      localStorage.setItem(LANGUAGE_KEY, language);
    }
  }

  let contextData = {
    language: language,
    changeLanguage: changeLanguage,
  };

  return (
    <LanguageContext.Provider value={contextData}>
      {children}
    </LanguageContext.Provider>
  );
}
