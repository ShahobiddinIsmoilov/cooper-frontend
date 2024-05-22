import { IoClose } from "react-icons/io5";
import { useDisclosure } from "@mantine/hooks";
import { Button, Group, Modal, Stack } from "@mantine/core";
import { useState } from "react";
import { ImSpinner4 } from "react-icons/im";
import Password from "./Password";
import PasswordConfirm from "./PasswordConfirm";

interface Props {
  username: string;
  password: string;
  passwordConfirm: string;
  formDisabled: boolean;
  setPassword: (value: string) => void;
  setPasswordConfirm: (value: string) => void;
  setConfirmModalClose: (value: boolean) => void;
  closeModal: () => void;
  handleReset: () => void;
}

export default function ResetForm({
  username,
  password,
  passwordConfirm,
  formDisabled,
  setPassword,
  setPasswordConfirm,
  setConfirmModalClose,
  closeModal,
  handleReset,
}: Props) {
  const [opened, { open, close }] = useDisclosure();
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordConfirmSuccess, setPasswordConfirmSuccess] = useState(false);
  const safeToRegister = passwordSuccess && passwordConfirmSuccess;

  function handleClose() {
    close();
    closeModal();
    setConfirmModalClose(false);
  }

  return (
    <>
      <Stack mx={8} mb={4}>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">New password</span>
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
          Hello, <span className="text-orange-400 font-bold">{username}</span>.
          Create a new, secure password to restore access to your account.
        </span>
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
          onClick={handleReset}
          disabled={!safeToRegister || formDisabled}
          radius={12}
          className={
            safeToRegister && !formDisabled
              ? "button-primary"
              : "button-primary-disabled"
          }
        >
          {formDisabled ? (
            <ImSpinner4 size={20} className="animate-spin" />
          ) : (
            "Parolni tiklash va hisobga kirish"
          )}
        </Button>
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
            Are you sure you want to quit the process?
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
