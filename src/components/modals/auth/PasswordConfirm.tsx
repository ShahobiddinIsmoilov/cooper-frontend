import { Button, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";

interface Props {
  passwordsMatch: boolean;
  passwordConfirm: string;
  formDisabled: boolean;
  setPasswordConfirm: (value: string) => void;
  setPasswordConfirmSuccess: (value: boolean) => void;
}

export default function PasswordConfirm({
  passwordsMatch,
  passwordConfirm,
  formDisabled,
  setPasswordConfirm,
  setPasswordConfirmSuccess,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const { language } = useLanguage();

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleChange(value: string) {
    setPasswordConfirm(value);
    setPasswordConfirmSuccess(false);
  }

  useEffect(() => {
    if (passwordsMatch && passwordConfirm.length > 0) {
      setPasswordConfirmSuccess(true);
    } else {
      setPasswordConfirmSuccess(false);
    }
  });

  return (
    <Stack gap={0}>
      <span className="text-lg ml-1">Confirm Password:</span>
      <div
        className={`flex justify-between gap-2 items-center input ${
          passwordsMatch
            ? "border border-green-400"
            : passwordConfirm.length > 0
            ? "border border-red-400"
            : "border border-line"
        }`}
      >
        <input
          onChange={(e) => handleChange(e.target.value)}
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
        {!passwordsMatch && passwordConfirm.length > 0 ? (
          <div className="text-red-400">
            <MdOutlineCancel size={24} />
          </div>
        ) : (
          passwordConfirm.length > 0 && (
            <div className="text-green-400">
              <FaRegCheckCircle size={22} />
            </div>
          )
        )}
      </div>
      {!passwordsMatch && passwordConfirm.length > 0 && (
        <p className="text-red-400 text-sm ml-1">
          {validation_status.error.did_not_match[language]}
        </p>
      )}
    </Stack>
  );
}

const validation_status = {
  error: {
    did_not_match: {
      uz: `Parollar bir xil emas`,
      en: `Passwords don't match`,
      ru: `Passwords don't match`,
    },
  },
};

const placeholder = {
  uz: "Parolni qayta kiriting",
  en: "Enter your password again",
  ru: "Enter your password again",
};
