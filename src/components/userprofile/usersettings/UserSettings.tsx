import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Button, Stack } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserDetailProps } from "../../../interfaces/userDetailProps";
import { useWindowSize } from "../../../contexts/WindowSizeContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import { usersettings } from "./../lang_userprofile";
import { FileWithPath } from "@mantine/dropzone";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import Account from "./Account";
import Social from "./Social";
import Line from "../../../utils/Line";
import useCredentials from "../../../services/useCredentials";

interface Props {
  user: UserDetailProps;
}

export default function UserComments({ user }: Props) {
  const initialDisplayName = user.display_name ? user.display_name : "";
  const initialPhone = user.phone ? user.phone : "";
  const initialTelegram = user.telegram ? user.telegram : "";
  const initialInstagram = user.instagram ? user.instagram : "";
  const initialFacebook = user.facebook ? user.facebook : "";
  const initialTwitter = user.twitter ? user.twitter : "";

  const [newAvatar, setNewAvatar] = useState<FileWithPath | undefined>();
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [phone, setPhone] = useState(initialPhone);
  const [telegram, setTelegram] = useState(initialTelegram);
  const [instagram, setInstagram] = useState(initialInstagram);
  const [facebook, setFacebook] = useState(initialFacebook);
  const [twitter, setTwitter] = useState(initialTwitter);

  function itemChanged() {
    if (newAvatar) return true;
    if (displayName !== initialDisplayName) return true;
    if (phone !== initialPhone) return true;
    if (telegram !== initialTelegram) return true;
    if (instagram !== initialInstagram) return true;
    if (facebook !== initialFacebook) return true;
    if (twitter !== initialTwitter) return true;
    return false;
  }

  function safeToSave() {
    if (newAvatar) return true;
    if (displayName.trim() !== initialDisplayName) return true;
    if (phone !== initialPhone) return true;
    if (telegram !== initialTelegram) return true;
    if (instagram !== initialInstagram) return true;
    if (facebook !== initialFacebook) return true;
    if (twitter !== initialTwitter) return true;
    return false;
  }

  const notifyUserSettingsSavedSuccess = () =>
    toast.success("Changes were saved successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

  function discardChanges() {
    setNewAvatar(undefined);
    setNewAvatarUrl("");
    setDisplayName(initialDisplayName);
    setPhone(initialPhone);
    setTelegram(initialTelegram);
    setInstagram(initialInstagram);
    setFacebook(initialFacebook);
    setTwitter(initialTwitter);
  }

  const isExtraSmall = useWindowSize().screenWidth < 576;
  const api = useCredentials();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const mutation = useMutation({
    mutationFn: (newSettings: {}) =>
      api.put(`/api/user/update/${user.id}/`, newSettings),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["usersettings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
      notifyUserSettingsSavedSuccess();
      // setFormDisabled(false);
      navigate(`/c/profile`);
    },
  });

  function saveChanges() {
    setDisplayName(displayName.trim() === "" ? user.username : displayName);
    const newSettings = {
      avatar: newAvatar,
      display_name: displayName.trim() === "" ? user.username : displayName,
      phone: phone,
      telegram: telegram,
      instagram: instagram,
      facebook: facebook,
      twitter: twitter,
    };
    mutation.mutate(newSettings);
  }

  function removeSpaces(s: string) {
    s = s.replace(/\s/g, "");
    return s;
  }

  return (
    <Stack gap={32} mb={100}>
      <div className="gap-2 flex justify-end items-center -mb-8">
        <Button
          size={isExtraSmall ? "sm" : "md"}
          onClick={discardChanges}
          disabled={!itemChanged()}
          className={`rounded-xl ${
            itemChanged() ? "button-secondary" : "button-secondary-disabled"
          }`}
        >
          {usersettings.usersettings.discard_changes[language]}
        </Button>
        <Button
          size={isExtraSmall ? "sm" : "md"}
          onClick={saveChanges}
          disabled={!safeToSave()}
          className={`rounded-xl ${
            safeToSave() ? "button-primary" : "button-primary-disabled"
          }`}
        >
          {usersettings.usersettings.save_changes[language]}
        </Button>
      </div>
      <Account
        avatar={user.avatar}
        setNewAvatar={setNewAvatar}
        newAvatarUrl={newAvatarUrl}
        setNewAvatarUrl={setNewAvatarUrl}
        username={user.username}
        displayName={displayName}
        phone={phone}
        setDisplayName={setDisplayName}
        setPhone={setPhone}
        removeSpaces={removeSpaces}
      />
      <Social
        username={user.username}
        telegram={telegram}
        instagram={instagram}
        facebook={facebook}
        twitter={twitter}
        setTelegram={setTelegram}
        setInstagram={setInstagram}
        setFacebook={setFacebook}
        setTwitter={setTwitter}
        removeSpaces={removeSpaces}
      />
      <div>
        <p className="mb-2 text-xs font-bold tracking-widest">
          {usersettings.usersettings.danger_zone[language]}
        </p>
        <Line />
        <button className="w-fit text-red-400 flex items-center gap-2 mt-4">
          <FaTrashAlt />
          {usersettings.usersettings.delete_account[language]}
        </button>
      </div>
    </Stack>
  );
}
