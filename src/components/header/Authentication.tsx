import { useAuthContext } from "../../contexts/AuthContext";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Stack } from "@mantine/core";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useWindowSize } from "../../contexts/WindowSizeContext";
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
    setLoginMessage(<p className="text-2xl text-center">Welcome back</p>);
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
                value="Log in"
                className="text-white bg-cyan-700 hover:bg-cyan-600 p-3 rounded-xl text-lg h-12 font-bold cursor-pointer"
              />
              {showRegisterButton && (
                <div className="text-center">
                  Don't have an account yet?{" "}
                  <button
                    onClick={(e) => handleSwitch(e)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    REGISTER
                  </button>
                </div>
              )}
            </Stack>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <p className="text-2xl text-center">Create your account</p>
            <Stack gap="sm" p="md">
              <UsernameRegister setUsername={setUsername} />
              <PasswordRegister setPassword={setPassword} />
              <input
                type="submit"
                value="Create Account"
                className="mt-2 text-white bg-cyan-700 hover:bg-cyan-600 p-3 rounded-xl text-lg h-12 font-bold cursor-pointer"
              />
              <div className="text-center">
                Already have an account?{" "}
                <button
                  onClick={(e) => handleSwitch(e)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  LOG IN
                </button>
              </div>
            </Stack>
          </form>
        )}
      </Modal>
      <button
        onClick={handleOpen}
        className={`flex items-center gap-1 hover:bg-dark-700 border-white border-opacity-25 rounded-full px-3 ${
          plussize === 20 ? "py-[8px]" : "py-[6px]"
        }`}
      >
        <FaPlus size={plussize} />
        Create
      </button>
      <button
        onClick={handleOpen}
        className={`bg-cyan-700 hover:bg-cyan-600 rounded-full px-3 ${
          plussize === 20 ? "py-[8px]" : "py-[6px]"
        }`}
      >
        Log in
      </button>
    </>
  );
}
