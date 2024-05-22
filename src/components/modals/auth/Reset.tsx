import { useState } from "react";
import { Transition } from "@mantine/core";
import { useAuthContext } from "../../../contexts/AuthContext";
import { makeRequest } from "../../../services/makeRequest";
import { Slide, toast } from "react-toastify";
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
          setCodeError("Invalid code entered");
        } else if (response.data["message"] === "Expired code") {
          setCodeError(
            "This code has expired. Please get a new password reset code"
          );
        } else if (response.data["message"] === "Not registered") {
          setCodeError("There is no account with the given phone number");
        }
      } else {
        setRestoreFormOpened(true);
        setConfirmModalClose(true);
        setUsername(response.data["username"]);
      }
    } catch {
      alert("Something went wrong. Please try again later");
    } finally {
      setFormDisabled(false);
    }
  }

  const notifyRestoreSuccess = () =>
    toast.success("Password was changed successfully", {
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
      alert("Something went wrong. Please try again later");
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
