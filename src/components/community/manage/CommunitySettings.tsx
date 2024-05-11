import { useState } from "react";
import { Button, Stack } from "@mantine/core";
import { useWindowSize } from "../../../contexts/WindowSizeContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommunityDetailProps } from "../../../interfaces/communityDetailProps";
import { FileWithPath } from "@mantine/dropzone";
import ManageVisuals from "./ManageVisuals";
import ManageDetails from "./ManageDetails";
import useCredentials from "../../../services/useCredentials";

interface Props {
  community: CommunityDetailProps;
}

export default function CommunitySettings({ community }: Props) {
  const isExtraSmall = useWindowSize().screenWidth < 576;
  const api = useCredentials();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newSettings: {}) =>
      api.put(`/api/community/update/${community.id}/`, newSettings),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`manage-${community.link}`],
      });
    },
  });

  const [newAvatar, setNewAvatar] = useState<FileWithPath | undefined>();
  const [newBanner, setNewBanner] = useState<FileWithPath | undefined>();
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [newBannerUrl, setNewBannerUrl] = useState("");
  const [name, setName] = useState(community.name);
  const [description, setDescription] = useState(community.description);

  function itemChanged() {
    if (newAvatar) return true;
    if (newBanner) return true;
    if (name !== community.name) return true;
    if (description !== community.description) return true;
    return false;
  }

  function safeToSave() {
    if (newAvatar) return true;
    if (newBanner) return true;
    if (name.trim() !== community.name && name.trim() !== "") return true;
    if (
      description.trim() !== community.description &&
      description.trim() !== ""
    )
      return true;
    return false;
  }

  function discardChanges() {
    setNewAvatar(undefined);
    setNewAvatarUrl("");
    setNewBanner(undefined);
    setNewBannerUrl("");
    setName(community.name);
    setDescription(community.description);
  }

  function saveChanges() {
    const newSettings = {
      avatar: newAvatar,
      banner: newBanner,
      name: name,
      description: description,
    };
    mutation.mutate(newSettings);
  }

  return (
    <Stack gap={8}>
      <div className="gap-2 flex justify-end items-center mb-4">
        <Button
          size={isExtraSmall ? "sm" : "md"}
          onClick={(e) => {
            e.preventDefault();
            discardChanges();
          }}
          disabled={itemChanged() ? false : true}
          className={`rounded-xl ${
            itemChanged() ? "button-secondary" : "button-secondary-disabled"
          }`}
        >
          Bekor qilish
        </Button>
        <Button
          size={isExtraSmall ? "sm" : "md"}
          onClick={(e) => {
            e.preventDefault();
            saveChanges();
          }}
          disabled={safeToSave() ? false : true}
          className={`rounded-xl ${
            safeToSave() ? "button-primary" : "button-primary-disabled"
          }`}
        >
          O'zgarishlarni saqlash
        </Button>
      </div>
      <ManageVisuals
        avatar={community.avatar}
        banner={community.banner}
        setNewAvatar={setNewAvatar}
        setNewBanner={setNewBanner}
        newAvatarUrl={newAvatarUrl}
        setNewAvatarUrl={setNewAvatarUrl}
        newBannerUrl={newBannerUrl}
        setNewBannerUrl={setNewBannerUrl}
      />
      <ManageDetails
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
      />
    </Stack>
  );
}
