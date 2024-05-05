import { Button, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { UserDetailProps } from "../../../interfaces/userDetailProps";
import { FaTrashAlt } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersettings } from "./../lang_userprofile";
import { useLanguage } from "../../../contexts/LanguageContext";
import Account from "./Account";
import Social from "./Social";
import Line from "../../../utils/Line";
import useCredentials from "../../../services/useCredentials";

interface Props {
  user: UserDetailProps;
  setActive: (value: string) => void;
}

export default function UserComments({ setActive, user }: Props) {
  useEffect(() => {
    setActive("settings");
  }, []);

  const initialDisplayName = user.display_name ? user.display_name : "";
  const initialPhone = user.phone ? user.phone : "";
  const initialTelegram = user.telegram ? user.telegram : "";
  const initialInstagram = user.instagram ? user.instagram : "";
  const initialFacebook = user.facebook ? user.facebook : "";
  const initialTwitter = user.twitter ? user.twitter : "";

  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [phone, setPhone] = useState(initialPhone);
  const [telegram, setTelegram] = useState(initialTelegram);
  const [instagram, setInstagram] = useState(initialInstagram);
  const [facebook, setFacebook] = useState(initialFacebook);
  const [twitter, setTwitter] = useState(initialTwitter);

  function enableButtons() {
    if (displayName.trim() !== initialDisplayName) return true;
    if (phone !== initialPhone) return true;
    if (telegram !== initialTelegram) return true;
    if (instagram !== initialInstagram) return true;
    if (facebook !== initialFacebook) return true;
    if (twitter !== initialTwitter) return true;
    return false;
  }

  function discard() {
    setDisplayName(initialDisplayName);
    setPhone(initialPhone);
    setTelegram(initialTelegram);
    setInstagram(initialInstagram);
    setFacebook(initialFacebook);
    setTwitter(initialTwitter);
  }

  const api = useCredentials();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newSettings: {}) =>
      api.put(`/api/user/update/${user.id}/`, newSettings),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile-page"],
      });
    },
  });

  function handleSave() {
    setDisplayName(displayName.trim() === "" ? user.username : displayName);
    const newSettings = {
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

  const { language } = useLanguage();

  return (
    <Stack gap={32}>
      <div className="gap-2 flex justify-end items-center -mb-8">
        <Button
          onClick={discard}
          disabled={!enableButtons()}
          className={`px-3 rounded-xl bg-transparent border border-line ${
            enableButtons() && "hover:bg-dark-700"
          }`}
        >
          {usersettings.usersettings.discard_changes[language]}
        </Button>
        <Button
          onClick={handleSave}
          disabled={!enableButtons()}
          className={`px-3 rounded-xl ${
            enableButtons()
              ? "bg-cyan-600 hover:bg-cyan-500"
              : "bg-dark-600 text-dark-900"
          }`}
        >
          {usersettings.usersettings.save_changes[language]}
        </Button>
      </div>
      <Account
        user={user}
        displayName={displayName}
        phone={phone}
        setDisplayName={setDisplayName}
        setPhone={setPhone}
        removeSpaces={removeSpaces}
        enableButtons={enableButtons}
      />
      <Social
        user={user}
        telegram={telegram}
        instagram={instagram}
        facebook={facebook}
        twitter={twitter}
        setTelegram={setTelegram}
        setInstagram={setInstagram}
        setFacebook={setFacebook}
        setTwitter={setTwitter}
        removeSpaces={removeSpaces}
        enableButtons={enableButtons}
      />
      <div>
        <p className="mb-2 text-xs font-bold tracking-widest">
          {usersettings.usersettings.danger_zone[language]}
        </p>
        <Line />
      </div>
      <button className="w-fit text-red-400 flex items-center gap-1">
        <FaTrashAlt />
        {usersettings.usersettings.delete_account[language]}
      </button>
    </Stack>
  );
}
