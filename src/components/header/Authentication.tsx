import { useAuthContext } from "../../contexts/AuthContext";
import { useDisclosure } from "@mantine/hooks";
import { Button, Modal, Transition } from "@mantine/core";
import { useWindowSize } from "../../contexts/WindowSizeContext";
import { auth } from "./lang_header";
import { useLanguage } from "../../contexts/LanguageContext";
import { useState } from "react";
import Register from "../modals/auth/Register";
import Login from "../modals/auth/Login";
import Dashboard from "./Dashboard";
import Reset from "../modals/auth/Reset";

export function Authentication() {
  const user = useAuthContext().user;
  const isExtraSmall = useWindowSize().screenWidth < 576;
  const screenHeight = useWindowSize().screenHeight;
  const plussize = screenHeight > 700 ? 20 : 16;
  const { language } = useLanguage();
  const [opened, { open, close }] = useDisclosure();
  const [confirmModalClose, setConfirmModalClose] = useState(false);
  const [form, setForm] = useState<"login" | "register" | "reset">("login");
  const [formDisabled, setFormDisabled] = useState(false);

  function openRegisterForm() {
    setForm("register");
    open();
  }

  function openLoginForm() {
    setForm("login");
    open();
  }

  function closeModal() {
    close();
  }

  return user ? (
    <Dashboard username={user.username} />
  ) : (
    <>
      <Modal
        opened={opened}
        onClose={closeModal}
        centered
        radius={12}
        shadow="xs"
        keepMounted={false}
        withCloseButton={false}
        overlayProps={{ backgroundOpacity: 0.9 }}
        fullScreen={isExtraSmall}
        closeOnEscape={!confirmModalClose && !formDisabled}
        closeOnClickOutside={!confirmModalClose && !formDisabled}
      >
        <div className="h-screen xs:h-fit">
          <Transition
            mounted={form === "login"}
            transition={"fade-down"}
            duration={200}
            timingFunction="ease"
            keepMounted
          >
            {(transitionStyle) => (
              <div
                style={{ ...transitionStyle, zIndex: 1 }}
                hidden={form !== "login"}
              >
                <Login
                  formDisabled={formDisabled}
                  setFormDisabled={setFormDisabled}
                  closeModal={closeModal}
                  setForm={setForm}
                />
              </div>
            )}
          </Transition>
          <Transition
            mounted={form === "register"}
            transition={"fade-up"}
            duration={200}
            timingFunction="ease"
            keepMounted
          >
            {(transitionStyle) => (
              <div
                style={{ ...transitionStyle, zIndex: 1 }}
                hidden={form !== "register"}
              >
                <Register
                  formDisabled={formDisabled}
                  setFormDisabled={setFormDisabled}
                  setForm={setForm}
                  setConfirmModalClose={setConfirmModalClose}
                  closeModal={closeModal}
                />
              </div>
            )}
          </Transition>
          <Transition
            mounted={form === "reset"}
            transition={"fade-up"}
            duration={200}
            timingFunction="ease"
            keepMounted
          >
            {(transitionStyle) => (
              <div
                style={{ ...transitionStyle, zIndex: 1 }}
                hidden={form !== "reset"}
              >
                <Reset
                  formDisabled={formDisabled}
                  setFormDisabled={setFormDisabled}
                  setConfirmModalClose={setConfirmModalClose}
                  setForm={setForm}
                  closeModal={closeModal}
                />
              </div>
            )}
          </Transition>
        </div>
      </Modal>
      <Button
        onClick={openRegisterForm}
        className={`rounded-full px-3 button-primary ${
          plussize === 20 ? "py-[8px]" : "py-[6px]"
        }`}
      >
        {auth.create_account_button[language]}
      </Button>
      <Button
        onClick={openLoginForm}
        className={`rounded-full px-3 button-secondary ${
          plussize === 20 ? "py-[8px]" : "py-[6px]"
        }`}
      >
        {auth.login_button[language]}
      </Button>
    </>
  );
}
