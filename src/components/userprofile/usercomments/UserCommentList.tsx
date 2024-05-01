import { CommentProps } from "../../../interfaces/commentProps";
import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getComments } from "../../../services/comment/getComments";
import { useAuthContext } from "../../../contexts/AuthContext";
import UserCommentCard from "./UserCommentCard";
import Line from "../../../utils/Line";

export default function UserCommentList({
  sortOption,
}: {
  sortOption: string;
}) {
  let { username } = useParams();

  if (!username) username = useAuthContext().user?.username;
  const user = useAuthContext().user?.user_id;
  const sort = sortOption.toLowerCase();

  const { isPending, error, data } = useQuery({
    queryKey: [`usercomments-${username}`],
    queryFn: () =>
      getComments(
        `/api/comment/list/?filter=user&username=${username}&user=${user}&sort=${sort}`
      ),
  });

  if (isPending) return "Loading";

  if (error) return "Couldn't load data";

  const comments = data.data;

  return (
    <Stack gap={0}>
      {comments.length > 0 ? (
        comments.map((comment: CommentProps) => (
          <div key={`usercomment-${comment.id}`}>
            <UserCommentCard comment={comment} />
            <Line />
          </div>
        ))
      ) : (
        <p className="text-center mt-8 text-white/50">
          This user hasn't made any comments
        </p>
      )}
    </Stack>
  );
}
