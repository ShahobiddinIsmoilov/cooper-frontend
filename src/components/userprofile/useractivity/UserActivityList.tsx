import { Stack } from "@mantine/core";
import { CommentProps } from "../../../interfaces/commentProps";
import { PostProps } from "../../../interfaces/postProps";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../contexts/AuthContext";
import { FetchError, FetchLoading } from "../../../utils/FetchStatus";
import { useractivity } from "../lang_userprofile";
import { useLanguage } from "../../../contexts/LanguageContext";
import Line from "../../../utils/Line";
import PostCard from "../../post/postcard/PostCard";
import UserCommentCard from "../usercomments/UserCommentCard";
import getUserActivity from "../../../services/getUserActivity";

export default function UserActivityList({
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
    queryKey: [`useractivity-${username}`],
    queryFn: () =>
      getUserActivity(
        `/api/user/activity/${username}/?user=${user}&sort=${sort}`
      ),
  });

  if (isPending) return <FetchLoading mt={8} size={20} />;

  if (error) return <FetchError mt={8} />;

  const list = data.data;

  return (
    <Stack gap={0}>
      {list.length > 0 ? (
        list.map((item: CommentProps | PostProps) =>
          "title" in item ? (
            <div key={`useractivity-post-${item.id}`}>
              <PostCard post={item} headerVariant="home" />
              <Line />
            </div>
          ) : (
            <div key={`useractivity-comment-${item.id}`}>
              <UserCommentCard comment={item} />
              <Line />
            </div>
          )
        )
      ) : (
        <p className="text-center mt-8 text-white/50">
          {isProfilePage
            ? useractivity.empty_message_self[language]
            : useractivity.empty_message[language]}
        </p>
      )}
    </Stack>
  );
}
