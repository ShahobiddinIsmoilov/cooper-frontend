import { CommentProps } from "../../../interfaces/commentProps";
import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getComments } from "../../../services/comment/getComments";
import { useAuthContext } from "../../../contexts/AuthContext";
import { FetchError, FetchLoading } from "../../../utils/FetchStatus";
import { useLanguage } from "../../../contexts/LanguageContext";
import { usercomments } from "../lang_userprofile";
import UserCommentCard from "./UserCommentCard";
import Line from "../../../utils/Line";

export default function UserCommentList({
  sortOption,
}: {
  sortOption: string;
}) {
  let { username } = useParams();
  let isProfilePage = false;
  if (!username) {
    username = useAuthContext().user?.username;
    isProfilePage = true;
  }

  const user = useAuthContext().user?.user_id;
  const sort = sortOption;
  const { language } = useLanguage();

  const { isPending, error, data } = useQuery({
    queryKey: [`usercomments-${username}`],
    queryFn: () =>
      getComments(
        `/api/comment/list/?filter=user&username=${username}&user=${user}&sort=${sort}`
      ),
  });

  if (isPending) return <FetchLoading mt={8} size={20} />;

  if (error) return <FetchError mt={8} />;

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
          {isProfilePage
            ? usercomments.empty_message_self[language]
            : usercomments.empty_message[language]}
        </p>
      )}
    </Stack>
  );
}
