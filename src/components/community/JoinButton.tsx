import { useQueryClient } from "@tanstack/react-query";
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
    <button
      onClick={handleClick}
      className="text-white rounded-full px-4 py-1 border text-base ml-4 hover:bg-dark-600 h-8"
    >
      {isJoined ? "Leave" : "Join"}
    </button>
  );
}
