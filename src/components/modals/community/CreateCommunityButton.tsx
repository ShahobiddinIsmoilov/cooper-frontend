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
import useCredentials from "../../../services/useCredentials";
import CommunityDescription from "./CommunityDescription";
import CommunityName from "./CommunityName";

export default function CreateCommunityForm() {
  const api = useCredentials();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { language } = useLanguage();

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
    },
  });

  // modal state
  const [opened, { open, close }] = useDisclosure();

  // initial values of form fields
  const [name, setName] = useState("");
  // const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [formDisabled, setFormDisabled] = useState(false);
  const isSmall = useWindowSize().screenWidth < 768;

  async function handleSubmit(e: any) {
    e.preventDefault();
    const newCommunity = {
      name: name,
      link: name,
      description: description,
    };
    setFormDisabled(true);
    mutation.mutate(newCommunity);
  }

  // close modal and reset form values
  function closeModal() {
    close();
    setName("");
    // setLink("");
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
            <Group justify="flex-end">
              <Button
                variant="default"
                onClick={closeModal}
                size={isSmall ? "sm" : "md"}
                className="rounded-xl"
              >
                {community.cancel[language]}
              </Button>
              <Button
                type="submit"
                size={isSmall ? "sm" : "md"}
                className="bg-cyan-700 hover:bg-cyan-600 rounded-xl"
              >
                {community.create[language]}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
      <button
        onClick={open}
        className="flex items-center gap-1 text-white rounded-full px-4 py-2 border text-base hover:bg-dark-700"
      >
        <FaPlus />
        {navbar.create_community[language]}
      </button>
    </>
  );
}
