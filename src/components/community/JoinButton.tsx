import { useQueryClient } from "@tanstack/react-query";
import useCredentials from "../../services/useCredentials";
import { Button } from "@mantine/core";

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
      className={`rounded-full ${
        isJoined
          ? "bg-transparent border hover:bg-dark-700 border-white/50"
          : "bg-cyan-700 hover:bg-cyan-600"
      }`}
    >
      {isJoined ? "Joined" : "Join"}
    </Button>
  );
}
