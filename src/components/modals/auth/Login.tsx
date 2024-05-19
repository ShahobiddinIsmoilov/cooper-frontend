import { useState } from "react";
import { Button, Stack } from "@mantine/core";
import { IoClose } from "react-icons/io5";
import { useAuthContext } from "../../../contexts/AuthContext";
import { auth } from "../../header/lang_header";
import { useLanguage } from "../../../contexts/LanguageContext";

interface Props {
  handleSwitch: () => void;
  closeModal: () => void;
}

export default function Login({ handleSwitch, closeModal }: Props) {
  const { language } = useLanguage();
  const { loginUser } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    const userData = {
      username: username,
      password: password,
    };
    loginUser(userData);
  }

  return (
    <Stack mx={8}>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">Log in</span>
        <button
          onClick={closeModal}
          className="p-1 hover:bg-dark-750 rounded-full hover:text-white"
        >
          <IoClose size={30} />
        </button>
      </div>
      <span className="text-center text-xl">Welcome back</span>
      <input
        type="text"
        placeholder="Username"
        onChange={(e: any) => {
          setUsername(e.target.value);
        }}
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e: any) => {
          setPassword(e.target.value);
        }}
        className="input"
      />
      <Button
        onClick={handleLogin}
        size="lg"
        radius={12}
        className="button-primary"
      >
        Log in
      </Button>
      <div className="text-center">
        {auth.not_registered[language]}{" "}
        <button
          onClick={handleSwitch}
          className="text-blue-400 hover:text-blue-300"
        >
          {auth.register_capital[language]}
        </button>
      </div>
    </Stack>
  );
}
