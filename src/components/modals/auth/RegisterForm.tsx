import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useDisclosure } from "@mantine/hooks";
import { Button, Group, Modal, Stack } from "@mantine/core";
import { useState } from "react";
import { ImSpinner4 } from "react-icons/im";
import Username from "./Username";
import Password from "./Password";
import PasswordConfirm from "./PasswordConfirm";

interface Props {
  username: string;
  password: string;
  passwordConfirm: string;
  formDisabled: boolean;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setPasswordConfirm: (value: string) => void;
  setConfirmModalClose: (value: boolean) => void;
  closeModal: () => void;
  handleRegister: () => void;
}

export default function RegisterForm({
  username,
  password,
  passwordConfirm,
  formDisabled,
  setUsername,
  setPassword,
  setPasswordConfirm,
  setConfirmModalClose,
  closeModal,
  handleRegister,
}: Props) {
  const [opened, { open, close }] = useDisclosure();
  const [usernameSuccess, setUsernameSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordConfirmSuccess, setPasswordConfirmSuccess] = useState(false);
  const safeToRegister =
    usernameSuccess && passwordSuccess && passwordConfirmSuccess;

  function handleClose() {
    close();
    closeModal();
    setConfirmModalClose(false);
  }

  return (
    <>
      <Stack mx={8} mb={4}>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">Create account</span>
          <button
            disabled={formDisabled}
            onClick={open}
            className={`p-1 rounded-full ${
              formDisabled
                ? "text-white/25"
                : "hover:bg-dark-750 hover:text-white"
            }`}
          >
            <IoClose size={30} />
          </button>
        </div>
        <span className="text-lg ml-1">
          All good! Now you can create your account.
        </span>
        <Username
          password={password}
          setUsername={setUsername}
          setUsernameSuccess={setUsernameSuccess}
          formDisabled={formDisabled}
        />
        <Password
          username={username}
          setPassword={setPassword}
          setPasswordSuccess={setPasswordSuccess}
          formDisabled={formDisabled}
        />
        <PasswordConfirm
          passwordsMatch={password === passwordConfirm && password.length > 0}
          passwordConfirm={passwordConfirm}
          setPasswordConfirm={setPasswordConfirm}
          setPasswordConfirmSuccess={setPasswordConfirmSuccess}
          formDisabled={formDisabled}
        />
        <Button
          size="lg"
          onClick={handleRegister}
          disabled={!safeToRegister || formDisabled}
          className={`rounded-xl ${
            safeToRegister && !formDisabled
              ? "button-primary"
              : "button-primary-disabled"
          }`}
        >
          {formDisabled ? (
            <ImSpinner4 size={20} className="animate-spin" />
          ) : (
            "Create account"
          )}
        </Button>
        <span className="text-sm text-center">
          By creating your Diagonal.uz account, you agree to our{" "}
          <Link
            to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-400"
          >
            terms and conditions
          </Link>
          .
        </span>
      </Stack>
      <Modal
        size="lg"
        opened={opened}
        onClose={close}
        centered
        radius={12}
        shadow="xs"
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <Stack className="items-center">
          <span className="text-lg">
            Are you sure you want to exit the registration process? Your
            information will not be saved.
          </span>
          <Group pt={12}>
            <Button
              variant="default"
              radius={12}
              size="md"
              w={100}
              onClick={close}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              radius={12}
              size="md"
              w={100}
              onClick={handleClose}
            >
              Exit
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
