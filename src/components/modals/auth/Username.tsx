import { Button, Stack, Tooltip } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { useState } from "react";
import { FaQuestionCircle, FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { auth } from "../lang_modals";
import { useLanguage } from "../../../contexts/LanguageContext";
import { makeRequest } from "../../../services/makeRequest";

interface Props {
  password: string;
  formDisabled: boolean;
  setUsername: (username: string) => void;
  setUsernameSuccess: (value: boolean) => void;
}

export default function Username({
  password,
  formDisabled,
  setUsername,
  setUsernameSuccess,
}: Props) {
  const [validationError, setValidationError] = useState<string | undefined>(
    undefined
  );
  const [success, setSuccess] = useState(false);
  const { language } = useLanguage();

  async function checkAvailability(username: string) {
    try {
      const response = await makeRequest("/api/user/check-username/", {
        method: "post",
        data: { username: username },
      });
      if (response.data["status"] === "OK") {
        setValidationError(undefined);
        setUsernameSuccess(true);
        setUsername(username);
        setSuccess(true);
      } else {
        setValidationError(validation_status.error.unavailable[language]);
      }
    } catch {
      setValidationError(validation_status.error.error[language]);
    }
  }

  const handleValidation = useDebouncedCallback((value: string) => {
    setUsernameSuccess(false);
    const regex = /^[a-zA-Z0-9_-]+$/;
    if (value != "" && !regex.test(value)) {
      setValidationError(validation_status.error.regex[language]);
    } else if (value.length > 0 && value.length < 4) {
      setValidationError(validation_status.error.too_short[language]);
    } else if (value === password && password.length > 0) {
      setValidationError(validation_status.error.password[language]);
    } else if (value.length > 0) {
      setValidationError(undefined);
      checkAvailability(value);
    } else {
      setValidationError(undefined);
      setSuccess(false);
    }
  }, 500);

  function handleChange(value: string) {
    setSuccess(false);
    setUsernameSuccess(false);
    handleValidation(value);
  }

  return (
    <Stack gap={0}>
      <p className="ml-1 flex gap-1 text-lg items-center">
        {auth.username[language]}:
        <Tooltip
          multiline
          w={320}
          p={12}
          withArrow
          transitionProps={{ duration: 200 }}
          label={tooltip[language]}
          className="bg-dark-900 text-white/75"
        >
          <Button unstyled>
            <FaQuestionCircle size={14} opacity={0.5} />
          </Button>
        </Tooltip>
      </p>
      <div
        className={`flex justify-between gap-2 items-center input ${
          validationError
            ? "border border-red-400"
            : success
            ? "border border-green-400"
            : "border border-line"
        }`}
      >
        <input
          onChange={(e) => handleChange(e.target.value)}
          onFocus={(e) => handleChange(e.target.value)}
          // onBlur={(e) => handleChange(e.target.value)}
          type="text"
          maxLength={24}
          placeholder={placeholder[language]}
          disabled={formDisabled}
          className="w-full outline-none bg-transparent placeholder-white/25"
        />
        {validationError ? (
          <div className="text-red-400">
            <MdOutlineCancel size={24} />
          </div>
        ) : (
          success && (
            <div className="text-green-400">
              <FaRegCheckCircle size={22} />
            </div>
          )
        )}
      </div>
      {validationError && (
        <p className="text-red-400 text-sm ml-1">{validationError}</p>
      )}
    </Stack>
  );
}

const tooltip = {
  uz: `O'zingiz uchun foydalanuvchi nomi tanlang. Bunda siz lotin
      katta (A-Z) va kichik (a-z) harflaridan, raqamlardan (0-9), chiziqchadan (-)
      va tagchiziqdan (_) foydalanishingiz mumkin. Foydalanuvchi nomini faqat 30 kunda
      bir marta o'zgartirish mumkin, shuning uchun yaxshilab o'ylab keyin tanlang.
      Nom uzunligi eng kam miqdori 4 ta, eng ko'pi 24 ta belgi bo'la oladi.`,

  en: `Choose a unique username. You are allowed to use
      uppercase (A-Z) and lowercase (a-z) letters, digits (0-9), hyphens (-)
      and underscores (_). You can change your username only once in 30 days,
      so choose wisely. Minimum length allowed is 4, maximum is 24 characters.`,

  ru: `Choose a unique username. You are allowed to use
      uppercase (A-Z) and lowercase (a-z) letters, digits (0-9), hyphens (-)
      and underscores (_). You can change your username only once in 30 days,
      so choose carefully. Maximum length of a username is 24 characters.`,
};

const validation_status = {
  error: {
    regex: {
      uz: `Foydalanuvchi nomida faqat lotin katta (A-Z) va kichik (a-z) harflari,
        raqamlar (0-9), chiziqcha (-) va tagchiziq (_) ishlatilishi mumkin`,
      en: `Username can only include uppercase (A-Z) and lowercase (a-z) letters,
        digits (0-9), hyphens (-) and underscores (_)`,
      ru: `Username can only include uppercase (A-Z) and lowercase (a-z) letters,
        digits (0-9), hyphens (-) and underscores (_)`,
    },
    too_short: {
      uz: "Foydalanuvchu nomi juda qisqa",
      en: "Username is too short",
      ru: "Username too short",
    },
    unavailable: {
      uz: "Bu foydalanuvchi nomi band",
      en: "This username is taken",
      ru: "Username already taken",
    },
    error: {
      uz: "Foydalanuvchi nomini tekshirib bo'lmadi. Iltimos keyinroq urinib ko'ring",
      en: "Could not check username availability. Please try again later",
      ru: "Could not check username availability. Please try again later",
    },
    password: {
      uz: "Foydalanuvchi nomi bilan parol bir xil bo'lmasligi kerak",
      en: "Username and password cannot be the same",
      ru: "Password and username cannot be the same",
    },
  },
};

const placeholder = {
  uz: "O'zingizga nom tanlang",
  en: "Enter a unique username",
  ru: "Enter a unique username",
};
