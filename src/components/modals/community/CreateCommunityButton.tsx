import { Modal, Stack, Text, Group, Button } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import useCredentials from "../../../services/useCredentials";
import CommunityDescription from "./CommunityDescription";
import CommunityName from "./CommunityName";

export default function CreateCommunityForm() {
  const api = useCredentials();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack gap="lg" pt="xs" px="md">
            <Text className="text-xl font-bold">Create a new community</Text>
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
                size="md"
                className="rounded-xl w-32"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="md"
                className="bg-cyan-700 hover:bg-cyan-600 rounded-xl w-32"
              >
                Create
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
      <button
        onClick={open}
        className="text-white rounded-full px-4 py-2 border text-base hover:bg-dark-700"
      >
        + Create a community
      </button>
    </>
  );
}
