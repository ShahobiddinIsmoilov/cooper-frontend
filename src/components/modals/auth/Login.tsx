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
  closeModal: () => void;
  setForm: (value: "login" | "register" | "reset") => void;
}

export default function Login({
  formDisabled,
  setFormDisabled,
  setForm,
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
    toast.success(login_modal.success[language], {
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
        {login_modal.forgot_username_dialog.text[language]}
        <div className="flex justify-center gap-4">
          <Button
            onClick={openBot}
            className="rounded-full button-secondary w-32"
          >
            {login_modal.forgot_username_dialog.open_bot[language]}
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
        setLoginError(login_modal.wrong_credentials[language]);
      } else {
        setLoginError(login_modal.fatal_error[language]);
      }
      setFormDisabled(false);
    }
  }

  return (
    <Stack mx={8}>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">
          {login_modal.title[language]}
        </span>
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
      <span className="text-center text-xl">
        {login_modal.welcome_text[language]}
      </span>
      {loginError && <p className="text-red-400">{loginError}</p>}
      <input
        type="text"
        id="username"
        name="username"
        maxLength={24}
        placeholder={login_modal.username[language]}
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
          {login_modal.forgot_username_button[language]}
        </button>
      </div>
      <input
        type="password"
        id="password"
        name="password"
        placeholder={login_modal.password[language]}
        disabled={formDisabled}
        onChange={(e: any) => {
          setPassword(e.target.value);
          setLoginError(undefined);
        }}
        className="input"
      />
      <div className="flex justify-end -mt-4 mr-1">
        <button
          onClick={() => setForm("reset")}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          {login_modal.forgot_password_button[language]}
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
          login_modal.login_button[language]
        )}
      </Button>
      <div className="text-center">
        {auth.not_registered[language]}{" "}
        <button
          onClick={() => setForm("register")}
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

const login_modal = {
  title: {
    uz: "Hisobga kirish",
    en: "Log in",
    ru: "Log in",
  },
  welcome_text: {
    uz: "Xush kelibsiz",
    en: "Welcome back",
    ru: "Welcome back",
  },
  username: {
    uz: "Foydalanuvchi nomi",
    en: "Username",
    ru: "Username",
  },
  password: {
    uz: "Parol",
    en: "Password",
    ru: "Password",
  },
  forgot_username_button: {
    uz: "Foydalanuvchi nomingizni unutdingizmi?",
    en: "Forgot username?",
    ru: "Forgot username?",
  },
  forgot_password_button: {
    uz: "Parolingizni unutdingizmi?",
    en: "Forgot password?",
    ru: "Forgot password?",
  },
  login_button: {
    uz: "Kirish",
    en: "Log in",
    ru: "Log in",
  },
  wrong_credentials: {
    uz: "Noto'g'ri foydalanuvchi nomi yoki parol kiritildi",
    en: "Incorrect username or password",
    ru: "Incorrect username or password",
  },
  fatal_error: {
    uz: "Nimadir xato ketdi. Iltimos keyinroq urinib ko'ring",
    en: "Something went wrong. Please try again later",
    ru: "Something went wrong. Please try again later",
  },
  success: {
    uz: "Hisobga muvaffaqiyatli kirildi",
    en: "Logged in successfully",
    ru: "Logged in successfully",
  },
  forgot_username_dialog: {
    text: {
      uz: `Foydalanuvchi nomingizni ko'rish uchun Telegram botimizni oching va "Foydalanuvchi
          nomini ko'rish" tugmasini bosing`,
      en: `To retrieve your username, open our Telegram bot and click "My username"`,
      ru: `To retrieve your username, open our Telegram bot and click "My username"`,
    },
    open_bot: {
      uz: "Botni ochish",
      en: "Open bot",
      ru: "Open bot",
    },
  },
};
