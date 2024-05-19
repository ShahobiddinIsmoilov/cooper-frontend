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
  handleSwitch: () => void;
  closeModal: () => void;
}

export default function ReceiveCodeForm({
  registrationCode,
  codeError,
  formDisabled,
  setCodeError,
  setRegistrationCode,
  handleNext,
  handleSwitch,
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
        <span className="text-2xl font-bold">Registration</span>
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
        To create your account, please open our Telegram bot and request a
        registration code.
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
        placeholder="Registration code"
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
          "Next"
        )}
      </Button>
      <div className="text-center">
        {auth.already_registered[language]}{" "}
        <button
          disabled={formDisabled}
          onClick={handleSwitch}
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
