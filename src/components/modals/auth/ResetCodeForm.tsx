import { Button, Stack } from "@mantine/core";
import { IoClose } from "react-icons/io5";
import { auth } from "../../header/lang_header";
import { useLanguage } from "../../../contexts/LanguageContext";
import { ImSpinner4 } from "react-icons/im";

interface Props {
  restoreCode: string;
  codeError?: string;
  formDisabled: boolean;
  setRestoreCode: (value: string) => void;
  setCodeError: (value: string | undefined) => void;
  handleNext: () => void;
  closeModal: () => void;
  setForm: (value: "login" | "register" | "reset") => void;
}

export default function ResetCodeForm({
  restoreCode,
  codeError,
  formDisabled,
  setCodeError,
  setRestoreCode,
  handleNext,
  setForm,
  closeModal,
}: Props) {
  const { language } = useLanguage();
  const authBot = import.meta.env.VITE_AUTH_BOT;

  function openBot() {
    window.open(authBot);
  }

  function handleCodeInput(e: any) {
    const code = e.target.value;
    setRestoreCode(code);
    setCodeError(undefined);
  }

  return (
    <Stack mx={8}>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">
          {reset_code_modal.title[language]}
        </span>
        <button
          disabled={formDisabled}
          onClick={closeModal}
          className={`p-1 rounded-full ${
            formDisabled
              ? "text-white/25"
              : "hover:bg-dark-750 hover:text-white"
          }`}
        >
          <IoClose size={30} />
        </button>
      </div>
      <p className="text-lg">{reset_code_modal.text_before_code[language]}</p>
      <Button
        variant="default"
        size="lg"
        radius={12}
        disabled={formDisabled}
        onClick={openBot}
      >
        {reset_code_modal.open_bot[language]}
      </Button>
      <p className="text-lg">{reset_code_modal.text_after_code[language]}</p>
      <input
        onChange={handleCodeInput}
        type="number"
        placeholder={reset_code_modal.placeholder[language]}
        maxLength={6}
        autoComplete="off"
        disabled={formDisabled}
        className={`input text-center ${codeError && "border-red-400"}`}
      />
      {codeError && (
        <span className="text-red-400 -mt-4 ml-1">{codeError}</span>
      )}
      <Button
        onClick={handleNext}
        size="lg"
        disabled={
          restoreCode.length !== 6 || formDisabled || codeError !== undefined
        }
        className={`rounded-xl ${
          restoreCode.length === 6 && !formDisabled && codeError === undefined
            ? "button-primary"
            : "button-primary-disabled"
        }`}
      >
        {formDisabled ? (
          <ImSpinner4 size={20} className="animate-spin" />
        ) : (
          reset_code_modal.next_button[language]
        )}
      </Button>
      <div className="text-center">
        {reset_code_modal.remembered_password_text[language]}{" "}
        <button
          disabled={formDisabled}
          onClick={() => setForm("login")}
          className={`${
            formDisabled ? "text-white/25" : "text-blue-400 hover:text-blue-300"
          }`}
        >
          {auth.login_capital[language]}
        </button>
      </div>
    </Stack>
  );
}

const reset_code_modal = {
  title: {
    uz: "Parolni tiklash",
    en: "Password reset",
    ru: "Password reset",
  },
  text_before_code: {
    uz: `Hisobingizga kirish huquqini qayta tiklash uchun, @DiagonalAuthBot Telegram botini
        oching va parolni tiklash kodini oling.`,
    en: `To restore access to your password, open @DiagonalAuthBot on Telegram and request a
        password reset code.`,
    ru: `To restore access to your password, open @DiagonalAuthBot on Telegram and request a
        password reset code.`,
  },
  open_bot: {
    uz: "Botni ochish",
    en: "Open bot",
    ru: "Open bot",
  },
  text_after_code: {
    uz: "Kodni olgach, uni bu yerga kiriting:",
    en: "Once received, enter the code below:",
    ru: "Once received, enter the code below:",
  },
  placeholder: {
    uz: "Parolni tiklash kodi",
    en: "Password reset code",
    ru: "Password reset code",
  },
  next_button: {
    uz: "Davom etish",
    en: "Next",
    ru: "Next",
  },
  remembered_password_text: {
    uz: "Parol esga tushdimi?",
    en: "Remembered your password?",
    ru: "Remembered your password?",
  },
  remembered_password_button: {
    uz: "HISOBGA KIRISH",
    en: "LOG IN",
    ru: "LOG IN",
  },
};
