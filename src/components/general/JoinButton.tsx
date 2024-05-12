import { Button } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { join_button } from "./lang_general";
import { useLanguage } from "../../contexts/LanguageContext";
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

  function handleClick() {
    if (isJoined) {
      api
        .get(`/api/community/action/${community_id}/?action=leave`)
        .then(() => refresh());
    } else {
      api
        .get(`/api/community/action/${community_id}/?action=join`)
        .then(() => refresh());
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
