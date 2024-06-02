import { Modal, Stack, Text, Group, Button } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { navbar } from "../../lang_components";
import { useLanguage } from "../../../contexts/LanguageContext";
import { FaPlus } from "react-icons/fa6";
import { community } from "../lang_modals";
import { useWindowSize } from "../../../contexts/WindowSizeContext";
import { Slide, toast } from "react-toastify";
import { ImSpinner4 } from "react-icons/im";
import useCredentials from "../../../services/useCredentials";
import CommunityDescription from "./CommunityDescription";
import CommunityName from "./CommunityName";
import CommunityUrl from "./CommunityUrl";

interface Props {
  closeDrawer?: () => void;
}

export default function CreateCommunityForm({ closeDrawer }: Props) {
  const api = useCredentials();
  const queryClient = useQueryClient();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const notifyCommunityCreationSuccess = () =>
    toast.success(toast_success[language], {
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

  const mutation = useMutation({
    mutationFn: (newCommunity: {}) =>
      api.post("/api/community/create/", newCommunity),
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({
        queryKey: [`community-list`],
      });
      closeModal();
      setFormDisabled(false);
      navigate(`/c/${response.data}`);
      notifyCommunityCreationSuccess();
    },
  });

  // initial values of form fields
  const [opened, { open, close }] = useDisclosure();
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [linkSuccess, setLinkSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [description, setDescription] = useState("");
  const [formDisabled, setFormDisabled] = useState(false);
  const isSafeToProceed =
    name.trim().length > 0 && linkSuccess && description.trim().length > 0;
  const isSmall = useWindowSize().screenWidth < 768;

  async function handleSubmit(e: any) {
    e.preventDefault();
    setFormDisabled(true);
    const newCommunity = {
      name: name.trim(),
      link: link,
      description: description,
    };
    mutation.mutate(newCommunity);
  }

  // close modal and reset form values
  function closeModal() {
    close();
    setName("");
    setLink("");
    setDescription("");
    setFormDisabled(false);
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        radius={12}
        size="xl"
        shadow="xs"
        overlayProps={{ backgroundOpacity: 0.9 }}
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
        fullScreen={isSmall}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack
            gap={isSmall ? 10 : 16}
            pt={isSmall ? 4 : "md"}
            px={isSmall ? 0 : "md"}
            className="h-screen sm:h-fit mb-1"
          >
            <Text className="text-lg sm:text-xl font-bold mb-2">
              {community.new_community[language]}
            </Text>
            <CommunityName
              name={name}
              setName={setName}
              formDisabled={formDisabled}
            />
            <CommunityDescription
              description={description}
              setDescription={setDescription}
              formDisabled={formDisabled}
            />
            <CommunityUrl
              link={link}
              setLink={setLink}
              formDisabled={formDisabled}
              error={error}
              setError={setError}
              setLinkSuccess={setLinkSuccess}
            />
            <Group justify="flex-end">
              <Button
                variant="default"
                onClick={closeModal}
                disabled={formDisabled}
                size={isSmall ? "sm" : "md"}
                radius={12}
              >
                {community.cancel[language]}
              </Button>
              <Button
                w={120}
                type="submit"
                disabled={!isSafeToProceed || formDisabled}
                size={isSmall ? "sm" : "md"}
                radius={12}
                className={
                  isSafeToProceed && !formDisabled
                    ? "button-primary"
                    : "button-primary-disabled"
                }
              >
                {formDisabled ? (
                  <ImSpinner4 size={20} className="animate-spin" />
                ) : (
                  community.create[language]
                )}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
      <button
        onClick={() => {
          open();
          closeDrawer && closeDrawer();
        }}
        className="flex items-center gap-1 text-white rounded-full px-4 py-2 border text-base hover:bg-dark-700"
      >
        <FaPlus />
        {navbar.create_community[language]}
      </button>
    </>
  );
}

const toast_success = {
  uz: "Hamjamiyat muvaffaqiyatli yaratildi",
  en: "Community was created successfully",
  ru: "Community was created successfully",
};
