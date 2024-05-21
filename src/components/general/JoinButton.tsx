import { Button } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { join_button } from "./lang_general";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { Slide, toast } from "react-toastify";
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

  const notifyNotAuthenticated = () =>
    toast.error("A'zo bo'lish uchun hisobingizga kiring", {
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
        api
          .get(`/api/community/action/${community_id}/?action=leave`)
          .then(() => refresh());
      } else {
        api
          .get(`/api/community/action/${community_id}/?action=join`)
          .then(() => refresh());
      }
    } else {
      notifyNotAuthenticated();
    }
  }

  function refresh() {
    query.invalidateQueries({ queryKey: ["community-list-joined"] });
    query.invalidateQueries({ queryKey: ["community-list-discover"] });
    query.invalidateQueries({ queryKey: [`community-page-${community_link}`] });
  }

  return (
    <Button
      onClick={handleClick}
      className={`rounded-full px-3 ${
        isJoined ? "button-secondary" : "button-primary"
      }`}
    >
      {isJoined ? join_button.joined[language] : join_button.join[language]}
    </Button>
  );
}
