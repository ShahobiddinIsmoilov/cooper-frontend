import { useState } from "react";
import { Transition } from "@mantine/core";
import { useAuthContext } from "../../../contexts/AuthContext";
import { makeRequest } from "../../../services/makeRequest";
import { Slide, toast } from "react-toastify";
import { useLanguage } from "../../../contexts/LanguageContext";
import RegisterCodeForm from "./RegisterCodeForm";
import RegisterForm from "./RegisterForm";

interface Props {
  formDisabled: boolean;
  setFormDisabled: (value: boolean) => void;
  setConfirmModalClose: (value: boolean) => void;
  closeModal: () => void;
  setForm: (value: "login" | "register" | "reset") => void;
}

export default function Register({
  formDisabled,
  setFormDisabled,
  closeModal,
  setConfirmModalClose,
  setForm,
}: Props) {
  const { registerUser, loginUser } = useAuthContext();
  const { language } = useLanguage();
  const [registrationCode, setRegistrationCode] = useState("");
  const [codeError, setCodeError] = useState<string | undefined>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [registerFormOpened, setRegisterFormOpened] = useState(false);

  async function handleNext() {
    setFormDisabled(true);
    try {
      const response = await makeRequest(`/api/user/check-code/`, {
        method: "post",
        data: { code: registrationCode, type: "register" },
      });
      if (response.data["status"] === "ERROR") {
        if (response.data["message"] === "Invalid code") {
          setCodeError(register_modal.errors.invalid_code[language]);
        } else if (response.data["message"] === "Expired code") {
          setCodeError(register_modal.errors.expired[language]);
        } else if (response.data["message"] === "Already registered") {
          setCodeError(register_modal.errors.account_exists[language]);
        }
      } else {
        setRegisterFormOpened(true);
        setConfirmModalClose(true);
        setPhone(response.data["phone"]);
      }
    } catch {
      alert(register_modal.errors.fatal_error[language]);
    } finally {
      setFormDisabled(false);
    }
  }

  const notifyRegisterSuccess = () =>
    toast.success(register_modal.succes_toast[language], {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

  async function handleRegister() {
    setFormDisabled(true);
    const newUser = {
      username: username,
      display_name: username,
      password: password,
      phone: phone,
    };
    try {
      await registerUser(newUser);
      const loginData = {
        username: username,
        password: password,
      };
      await loginUser(loginData);
      setFormDisabled(false);
      notifyRegisterSuccess();
    } catch {
      alert(register_modal.errors.fatal_error[language]);
    }
  }

  return (
    <div>
      <div hidden={registerFormOpened}>
        <RegisterCodeForm
          registrationCode={registrationCode}
          codeError={codeError}
          formDisabled={formDisabled}
          setRegistrationCode={setRegistrationCode}
          setCodeError={setCodeError}
          setForm={setForm}
          handleNext={handleNext}
          closeModal={closeModal}
        />
      </div>
      <Transition
        mounted={registerFormOpened}
        transition={"slide-left"}
        duration={200}
        timingFunction="ease"
        keepMounted
      >
        {(transitionStyle) => (
          <div
            style={{
              ...transitionStyle,
              zIndex: 1,
            }}
            hidden={!registerFormOpened}
          >
            <RegisterForm
              username={username}
              password={password}
              passwordConfirm={passwordConfirm}
              formDisabled={formDisabled}
              setUsername={setUsername}
              setPassword={setPassword}
              setPasswordConfirm={setPasswordConfirm}
              setConfirmModalClose={setConfirmModalClose}
              closeModal={closeModal}
              handleRegister={handleRegister}
            />
          </div>
        )}
      </Transition>
    </div>
  );
}

const register_modal = {
  succes_toast: {
    uz: "Hisob muvaffaqiyatli yaratildi",
    en: "Account created successfully",
    ru: "Account created successfully",
  },
  errors: {
    invalid_code: {
      uz: "Noto'g'ri kod kiritildi",
      en: "Invalid code entered",
      ru: "Invalid code entered",
    },
    expired: {
      uz: "Bu kod eskirgan. Botdan yangi parolni tiklash kodi oling",
      en: "This code has expired. Please get a new password reset code",
      ru: "This code has expired. Please get a new password reset code",
    },
    account_exists: {
      uz: "Bu telefon raqami bilan bog'langan hisob mavjud",
      en: "This phone number is already in use",
      ru: "This phone number is already in use",
    },
    fatal_error: {
      uz: "Nimadir xato ketdi. Iltimos keyinroq urinib ko'ring",
      en: "Something went wrong. Please try again later",
      ru: "Something went wrong. Please try again later",
    },
  },
};
