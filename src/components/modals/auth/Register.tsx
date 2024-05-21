import { useState } from "react";
import { Transition } from "@mantine/core";
import { useAuthContext } from "../../../contexts/AuthContext";
import { makeRequest } from "../../../services/makeRequest";
import { Slide, toast } from "react-toastify";
import ReceiveCodeForm from "./ReceiveCodeForm";
import RegisterForm from "./RegisterForm";

interface Props {
  formDisabled: boolean;
  setFormDisabled: (value: boolean) => void;
  handleSwitch: () => void;
  setConfirmModalClose: (value: boolean) => void;
  closeModal: () => void;
}

export default function Register({
  formDisabled,
  setFormDisabled,
  closeModal,
  setConfirmModalClose,
  handleSwitch,
}: Props) {
  const { registerUser, loginUser } = useAuthContext();
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
        data: { code: registrationCode },
      });
      if (response.data["status"] === "ERROR") {
        if (response.data["message"] === "Invalid code") {
          setCodeError("Invalid code entered");
        } else if (response.data["message"] === "Expired code") {
          setCodeError("This code has expired. Please get a new code");
        }
      } else {
        setRegisterFormOpened(true);
        setConfirmModalClose(true);
        setPhone(response.data["phone"]);
      }
    } catch {
      alert("Something went wrong. Please try again later");
    } finally {
      setFormDisabled(false);
    }
  }

  const notifyRegisterSuccess = () =>
    toast.success("Account created successfully", {
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
      alert("Something went wrong. Please try again later");
    }
  }

  return (
    <div>
      <div hidden={registerFormOpened}>
        <ReceiveCodeForm
          registrationCode={registrationCode}
          codeError={codeError}
          formDisabled={formDisabled}
          setRegistrationCode={setRegistrationCode}
          setCodeError={setCodeError}
          handleSwitch={handleSwitch}
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
