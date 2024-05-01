import { Stack } from "@mantine/core";
import { CommentProps } from "../../../interfaces/commentProps";
import { PostProps } from "../../../interfaces/postProps";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../contexts/AuthContext";
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
  if (!username) username = useAuthContext().user?.username;
  const user = useAuthContext().user?.user_id;
  const sort = sortOption.toLowerCase();

  const { isPending, error, data } = useQuery({
    queryKey: [`useractivity-${username}`],
    queryFn: () =>
      getUserActivity(
        `/api/user/activity/${username}/?user=${user}&sort=${sort}`
      ),
  });

  if (isPending) return "Loading";

  if (error) return "Couldn't load data";

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
          This user hasn't made any posts or comments
        </p>
      )}
    </Stack>
  );
}
