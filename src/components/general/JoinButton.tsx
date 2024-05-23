import { useState } from "react";
import { Button } from "@mantine/core";
import { Slide, toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { join_button } from "./lang_general";
import useCredentials from "../../services/useCredentials";

interface Props {
  isJoined: boolean;
  community_id: number;
  community_link: string;
}

export default function JoinButton({
  isJoined,
  community_id,
  community_link,
}: Props) {
  const api = useCredentials();
  const query = useQueryClient();
  const { language } = useLanguage();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const notifyNotAuthenticated = () =>
    toast.error(login_to_join[language], {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

  function handleClick() {
    if (user) {
      if (isJoined) {
        setIsLoading(true);
        api
          .get(`/api/community/action/${community_id}/?action=leave`)
          .then(() => refresh());
      } else {
        setIsLoading(true);
        api
          .get(`/api/community/action/${community_id}/?action=join`)
          .then(() => refresh());
      }
    } else {
      notifyNotAuthenticated();
    }
  }

  async function refresh() {
    await query.invalidateQueries({ queryKey: ["community-list-joined"] });
    await query.invalidateQueries({ queryKey: ["community-list-discover"] });
    await query.invalidateQueries({
      queryKey: [`community-page-${community_link}`],
    });
    setIsLoading(false);
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      className={`rounded-full px-3 ${
        isJoined
          ? isLoading
            ? "button-secondary-disabled"
            : "button-secondary"
          : isLoading
          ? "button-primary-disabled"
          : "button-primary"
      }`}
    >
      {isJoined ? join_button.joined[language] : join_button.join[language]}
    </Button>
  );
}

const login_to_join = {
  uz: "A'zo bo'lish uchun hisobingizga kiring",
  en: "You must be logged in to join a community",
  ru: "Log in to your account in order to join",
};
