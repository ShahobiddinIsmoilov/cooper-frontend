import { useState } from "react";
import { Transition } from "@mantine/core";
import { useAuthContext } from "../../../contexts/AuthContext";
import { makeRequest } from "../../../services/makeRequest";
import { Slide, toast } from "react-toastify";
import { useLanguage } from "../../../contexts/LanguageContext";
import ResetCodeForm from "./ResetCodeForm";
import ResetForm from "./ResetForm";

interface Props {
  formDisabled: boolean;
  setFormDisabled: (value: boolean) => void;
  setConfirmModalClose: (value: boolean) => void;
  closeModal: () => void;
  setForm: (value: "login" | "register" | "reset") => void;
}

export default function Reset({
  formDisabled,
  setFormDisabled,
  closeModal,
  setConfirmModalClose,
  setForm,
}: Props) {
  const { resetPassword, loginUser } = useAuthContext();
  const { language } = useLanguage();
  const [resetCode, setResetCode] = useState("");
  const [codeError, setCodeError] = useState<string | undefined>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [restoreFormOpened, setRestoreFormOpened] = useState(false);

  async function handleNext() {
    setFormDisabled(true);
    try {
      const response = await makeRequest(`/api/user/check-code/`, {
        method: "post",
        data: { code: resetCode, type: "reset" },
      });
      if (response.data["status"] === "ERROR") {
        if (response.data["message"] === "Invalid code") {
          setCodeError(reset_modal.errors.invalid_code[language]);
        } else if (response.data["message"] === "Expired code") {
          setCodeError(reset_modal.errors.expired[language]);
        } else if (response.data["message"] === "Not registered") {
          setCodeError(reset_modal.errors.no_account[language]);
        }
      } else {
        setRestoreFormOpened(true);
        setConfirmModalClose(true);
        setUsername(response.data["username"]);
      }
    } catch {
      alert(reset_modal.errors.fatal_error[language]);
    } finally {
      setFormDisabled(false);
    }
  }

  const notifyRestoreSuccess = () =>
    toast.success(reset_modal.toast[language], {
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

  async function handleReset() {
    setFormDisabled(true);
    const userData = {
      username: username,
      password: password,
    };
    try {
      await resetPassword(userData);
      const loginData = {
        username: username,
        password: password,
      };
      await loginUser(loginData);
      setFormDisabled(false);
      notifyRestoreSuccess();
    } catch {
      alert(reset_modal.errors.fatal_error[language]);
    }
  }

  return (
    <div>
      <div hidden={restoreFormOpened}>
        <ResetCodeForm
          restoreCode={resetCode}
          codeError={codeError}
          formDisabled={formDisabled}
          setForm={setForm}
          setRestoreCode={setResetCode}
          setCodeError={setCodeError}
          handleNext={handleNext}
          closeModal={closeModal}
        />
      </div>
      <Transition
        mounted={restoreFormOpened}
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
            hidden={!restoreFormOpened}
          >
            <ResetForm
              username={username}
              password={password}
              passwordConfirm={passwordConfirm}
              formDisabled={formDisabled}
              setPassword={setPassword}
              setPasswordConfirm={setPasswordConfirm}
              setConfirmModalClose={setConfirmModalClose}
              closeModal={closeModal}
              handleReset={handleReset}
            />
          </div>
        )}
      </Transition>
    </div>
  );
}

const reset_modal = {
  toast: {
    uz: "Parol muvaffaqiyatli o'zgartirildi",
    en: "Password was changed successfully",
    ru: "Password was changed successfully",
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
    no_account: {
      uz: "Bu telefon raqamiga bog'langan hisob mavjud emas",
      en: "There is no account with the given phone number",
      ru: "There is no account with the given phone number",
    },
    fatal_error: {
      uz: "Nimadir xato ketdi. Iltimos keyinroq urinib ko'ring",
      en: "Something went wrong. Please try again later",
      ru: "Something went wrong. Please try again later",
    },
  },
};
