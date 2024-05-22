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
        <span className="text-2xl font-bold">Password reset</span>
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
        To reset your password, please open our Telegram bot and request a
        password reset code.
      </p>
      <Button
        variant="default"
        size="lg"
        radius={12}
        disabled={formDisabled}
        onClick={openBot}
      >
        Open bot
      </Button>
      <p className="text-lg">Once received, enter the code below:</p>
      <input
        onChange={handleCodeInput}
        type="number"
        placeholder="Password reset code"
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
          "Next"
        )}
      </Button>
      <div className="text-center">
        Parol esga tushdimi?{" "}
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
