import { useState } from "react";
import { Button, Stack } from "@mantine/core";
import { IoClose } from "react-icons/io5";
import { useAuthContext } from "../../../contexts/AuthContext";
import { auth } from "../../header/lang_header";
import { useLanguage } from "../../../contexts/LanguageContext";
import { ImSpinner4 } from "react-icons/im";
import { useDialog } from "../../../contexts/DialogContext";
import { Slide, toast } from "react-toastify";

interface Props {
  formDisabled: boolean;
  setFormDisabled: (value: boolean) => void;
  handleSwitch: () => void;
  closeModal: () => void;
}

export default function Login({
  formDisabled,
  setFormDisabled,
  handleSwitch,
  closeModal,
}: Props) {
  const { language } = useLanguage();
  const { loginUser } = useAuthContext();
  const { setDialogContent, openDialog, closeDialog } = useDialog();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | undefined>();
  const safeToLogin = username.length > 0 && password.length > 0;
  const authBot = import.meta.env.VITE_AUTH_BOT;

  const notifyLoginSuccess = () =>
    toast.success("Logged in successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

  function openBot() {
    window.open(authBot);
  }

  function handleForgotUsername() {
    const dialogContent = (
      <Stack className="text-lg">
        To retrieve your username, open @MagicAuthBot on Telegram and click "My
        username"
        <div className="flex justify-center gap-4">
          <Button
            onClick={openBot}
            className="rounded-full button-secondary w-32"
          >
            Open bot
          </Button>
          <Button
            onClick={closeDialog}
            className="rounded-full button-primary w-32"
          >
            OK
          </Button>
        </div>
      </Stack>
    );
    setDialogContent(dialogContent);
    openDialog();
  }

  async function handleLogin() {
    setFormDisabled(true);
    const userData = {
      username: username,
      password: password,
    };
    try {
      await loginUser(userData);
      setFormDisabled(false);
      notifyLoginSuccess();
    } catch (error: any) {
      if (error.response.status === 401) {
        setLoginError("Incorrect username or password");
      } else {
        setLoginError("Something went wrong. Please try again later");
      }
      setFormDisabled(false);
    }
  }

  return (
    <Stack mx={8}>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">Log in</span>
        <button
          onClick={closeModal}
          disabled={formDisabled}
          className={`p-1 rounded-full ${
            formDisabled
              ? "text-white/25"
              : "hover:bg-dark-750 hover:text-white"
          }`}
        >
          <IoClose size={30} />
        </button>
      </div>
      <span className="text-center text-xl">Welcome back</span>
      {loginError && <p className="text-red-400">{loginError}</p>}
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Username"
        disabled={formDisabled}
        onChange={(e: any) => {
          setUsername(e.target.value);
          setLoginError(undefined);
        }}
        className="input"
      />
      <div className="flex justify-end -mt-4 mr-1">
        <button
          onClick={handleForgotUsername}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          Forgot username?
        </button>
      </div>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        disabled={formDisabled}
        onChange={(e: any) => {
          setPassword(e.target.value);
          setLoginError(undefined);
        }}
        className="input"
      />
      <div className="flex justify-end -mt-4 mr-1">
        <button
          onClick={notifyLoginSuccess}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          Forgot password?
        </button>
      </div>
      <Button
        size="lg"
        onClick={handleLogin}
        disabled={!safeToLogin || formDisabled}
        radius={12}
        className={
          safeToLogin && !formDisabled
            ? "button-primary"
            : "button-primary-disabled"
        }
      >
        {formDisabled ? (
          <ImSpinner4 size={20} className="animate-spin" />
        ) : (
          "Login"
        )}
      </Button>
      <div className="text-center">
        {auth.not_registered[language]}{" "}
        <button
          onClick={handleSwitch}
          disabled={formDisabled}
          className={
            formDisabled ? "text-white/25" : "text-blue-400 hover:text-blue-300"
          }
        >
          {auth.register_capital[language]}
        </button>
      </div>
    </Stack>
  );
}
