import { Button, Stack } from "@mantine/core";
import { IoClose } from "react-icons/io5";
import { auth } from "../../header/lang_header";
import { useLanguage } from "../../../contexts/LanguageContext";
import { ImSpinner4 } from "react-icons/im";

interface Props {
  registrationCode: string;
  codeError?: string;
  formDisabled: boolean;
  setRegistrationCode: (value: string) => void;
  setCodeError: (value: string | undefined) => void;
  handleNext: () => void;
  closeModal: () => void;
  setForm: (value: "login" | "register" | "reset") => void;
}

export default function RegisterCodeForm({
  registrationCode,
  codeError,
  formDisabled,
  setCodeError,
  setRegistrationCode,
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
    setRegistrationCode(code);
    setCodeError(undefined);
  }

  return (
    <Stack mx={8}>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">
          {register_code_modal.title[language]}
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
      <p className="text-lg">
        {register_code_modal.text_before_code[language]}
      </p>
      <Button
        variant="default"
        size="lg"
        radius={12}
        disabled={formDisabled}
        onClick={openBot}
      >
        {register_code_modal.open_bot[language]}
      </Button>
      <p className="text-lg">{register_code_modal.text_after_code[language]}</p>
      <input
        onChange={handleCodeInput}
        type="number"
        placeholder={register_code_modal.placeholder[language]}
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
          registrationCode.length !== 6 ||
          formDisabled ||
          codeError !== undefined
        }
        className={`rounded-xl ${
          registrationCode.length === 6 &&
          !formDisabled &&
          codeError === undefined
            ? "button-primary"
            : "button-primary-disabled"
        }`}
      >
        {formDisabled ? (
          <ImSpinner4 size={20} className="animate-spin" />
        ) : (
          register_code_modal.next_button[language]
        )}
      </Button>
      <div className="text-center">
        {auth.already_registered[language]}{" "}
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

const register_code_modal = {
  title: {
    uz: "Ro'yxatdan o'tish",
    en: "Password reset",
    ru: "Password reset",
  },
  text_before_code: {
    uz: `Ro'yxatdan o'tish uchun @DiagonalAuthBot Telegram botini oching va
        registratsiya kodini oling.`,
    en: `To create your account, please open @DiagonalAuthBot on Telegram and
        request a registration code.`,
    ru: `To create your account, please open @DiagonalAuthBot on Telegram and
        request a registration code.`,
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
    uz: "Registratsiya kodi",
    en: "Registration code",
    ru: "Registration code",
  },
  next_button: {
    uz: "Davom etish",
    en: "Next",
    ru: "Next",
  },
};
