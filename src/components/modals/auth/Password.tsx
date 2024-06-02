import { Button, Stack, Tooltip } from "@mantine/core";
import { useState } from "react";
import { FaQuestionCircle, FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { auth } from "../lang_modals";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useDebouncedCallback } from "@mantine/hooks";

interface Props {
  username: string;
  formDisabled: boolean;
  setPassword: (username: string) => void;
  setPasswordSuccess: (value: boolean) => void;
}

export default function Password({
  username,
  formDisabled,
  setPassword,
  setPasswordSuccess,
}: Props) {
  const [validationError, setValidationError] = useState<string | undefined>(
    undefined
  );
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { language } = useLanguage();

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  const handleValidation = useDebouncedCallback((value: string) => {
    setPasswordSuccess(false);
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (value != "" && !regex.test(value)) {
      setValidationError(validation_status.error.regex[language]);
    } else if (value.length > 0 && value.length < 8) {
      setValidationError(validation_status.error.too_short[language]);
    } else if (value === username && username.length > 0) {
      setValidationError(validation_status.error.username[language]);
    } else if (value.length > 0) {
      setValidationError(undefined);
      setPasswordSuccess(true);
      setSuccess(true);
    } else {
      setValidationError(undefined);
      setSuccess(false);
    }
  }, 500);

  function handleChange(value: string) {
    setPassword(value);
    setSuccess(false);
    setPasswordSuccess(false);
    handleValidation(value);
  }

  return (
    <Stack gap={0}>
      <p className="ml-1 flex gap-1 text-lg items-center">
        {auth.password[language]}:
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
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder={placeholder[language]}
          disabled={formDisabled}
          className="w-full placeholder-white/25 bg-transparent outline-none"
        />
        <Button unstyled onClick={toggleShowPassword}>
          {showPassword ? (
            <IoMdEyeOff size={24} opacity={0.5} />
          ) : (
            <IoMdEye size={24} opacity={0.5} />
          )}
        </Button>
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
  uz: (
    <div>
      Kamida 8 ta belgidan iborat bo'lgan mustahkam parol kiriting. Parolda
      quyidagilar bo'lishi shart:
      <br />
      - kamida bitta katta lotin harfi (A-Z)
      <br />
      - kamida bitta kichik lotin harfi (a-z)
      <br />
      - kamida bitta raqam (0-9)
      <br />
      Maxsus belgilardan foydalanish majburiy emas, lekin tavsiya etiladi.
      Parolda foydalanuvchi nomingizni ishlatmang.
    </div>
  ),

  en: (
    <div>
      Enter a strong password that is at least 8 characters long. Your password
      must include:
      <br />
      - at least one uppercase (A-Z) letter
      <br />
      - at least one lowercase (a-z) letter
      <br />
      - at least one digit (0-9)
      <br />
      Special characters are not required, but recommended for better security.
      Do not include your username in your password.
    </div>
  ),

  ru: `Choose a unique username. You are allowed to use
      uppercase (A-Z) and lowercase (a-z) letters, digits (0-9), hyphens (-)
      and underscores (_). You can change your username only once in 30 days,
      so choose carefully. Maximum length of a username is 24 characters.`,
};

const validation_status = {
  error: {
    regex: {
      uz: `Parolda kamida bitta lotincha katta harf, bitta kichik harf va bitta
          raqam ishlatilishi shart`,
      en: `Password must contain at least one uppercase letter, one lowercase
          letter and one digit`,
      ru: `Password must contain at least one uppercase letter, one lowercase
          letter and one digit`,
    },
    too_short: {
      uz: "Parol juda qisqa",
      en: "Password is too short",
      ru: "Password is too short",
    },
    username: {
      uz: "Foydalanuvchi nomi bilan parol bir xil bo'lmasligi kerak",
      en: "Username and password cannot be the same",
      ru: "Password and username cannot be the same",
    },
  },
};

const placeholder = {
  uz: "Mustahkam parol kiriting",
  en: "Enter a strong password",
  ru: "Enter a strong password",
};
