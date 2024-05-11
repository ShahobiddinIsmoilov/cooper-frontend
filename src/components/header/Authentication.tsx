import { useAuthContext } from "../../contexts/AuthContext";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Stack } from "@mantine/core";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useWindowSize } from "../../contexts/WindowSizeContext";
import { auth } from "./lang_header";
import { useLanguage } from "../../contexts/LanguageContext";
import UsernameLogin from "../modals/auth/UsernameLogin";
import PasswordLogin from "../modals/auth/PasswordLogin";
import UsernameRegister from "../modals/auth/UsernameRegister";
import PasswordRegister from "../modals/auth/PasswordRegister";
import Dashboard from "./Dashboard";

export function Authentication() {
  const {
    showLogin,
    loginMessage,
    setShowLogin,
    setLoginMessage,
    loginUser,
    registerUser,
    showRegisterButton,
    setShowRegisterButton,
  } = useAuthContext();
  const user = useAuthContext().user;
  const { language } = useLanguage();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState(false);
  const [opened, { open, close }] = useDisclosure();

  function handleLogin(e: any) {
    e.preventDefault();
    const userData = {
      username: username,
      password: password,
    };
    loginUser(userData);
  }

  function handleRegister(e: any) {
    e.preventDefault();
    const userData = {
      username: username,
      display_name: username,
      password: password,
    };
    registerUser(userData);
  }

  function handleSwitch(e: any) {
    e.preventDefault();
    setUsername("");
    setPassword("");
    setValidate(!validate);
    setShowLogin(!showLogin);
  }

  function handleOpen() {
    setShowLogin(true);
    setLoginMessage(
      <p className="text-2xl text-center">{auth.login_text[language]}</p>
    );
    setShowRegisterButton(true);
    open();
  }

  function handleClose() {
    setUsername("");
    setPassword("");
    close();
  }

  const screenHeight = useWindowSize().screenHeight;
  const plussize = screenHeight > 700 ? 20 : 16;

  return user ? (
    <Dashboard username={user.username} />
  ) : (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        centered
        radius={12}
        shadow="xs"
        keepMounted={false}
        withCloseButton={false}
      >
        <div className="text-end">
          <button
            onClick={handleClose}
            className="p-1 hover:bg-dark-750 rounded-full hover:text-white"
          >
            <IoClose size={30} />
          </button>
        </div>
        {showLogin ? (
          <form onSubmit={handleLogin}>
            {loginMessage}
            <Stack gap="md" p="md">
              <UsernameLogin setUsername={setUsername} />
              <PasswordLogin setPassword={setPassword} />
              <input
                type="submit"
                value={auth.login_button[language]}
                className="text-white bg-cyan-700 hover:bg-cyan-600 p-3 rounded-xl text-lg h-12 font-bold cursor-pointer"
              />
              {showRegisterButton && (
                <div className="text-center">
                  {auth.not_registered[language]}{" "}
                  <button
                    onClick={(e) => handleSwitch(e)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    {auth.register_capital[language]}
                  </button>
                </div>
              )}
            </Stack>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <p className="text-2xl text-center">
              {auth.register_text[language]}
            </p>
            <Stack gap="sm" p="md">
              <UsernameRegister setUsername={setUsername} />
              <PasswordRegister setPassword={setPassword} />
              <input
                type="submit"
                value={auth.register_button[language]}
                className="mt-2 text-white bg-cyan-700 hover:bg-cyan-600 p-3 rounded-xl text-lg h-12 font-bold cursor-pointer"
              />
              <div className="text-center">
                {auth.already_registered[language]}{" "}
                <button
                  onClick={(e) => handleSwitch(e)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {auth.login_capital[language]}
                </button>
              </div>
            </Stack>
          </form>
        )}
      </Modal>
      <button
        onClick={handleOpen}
        className={`rounded-full px-3 button-primary ${
          plussize === 20 ? "py-[8px]" : "py-[6px]"
        }`}
      >
        {auth.create_account_button[language]}
      </button>
      <button
        onClick={handleOpen}
        className={`rounded-full px-3 button-secondary ${
          plussize === 20 ? "py-[8px]" : "py-[6px]"
        }`}
      >
        {auth.login_button[language]}
      </button>
    </>
  );
}
