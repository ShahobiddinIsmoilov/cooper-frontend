import { Stack } from "@mantine/core";
import { PostProps } from "../../../interfaces/postProps";
import Line from "../../../utils/Line";
import PostCard from "../../post/postcard/PostCard";
import getUserPosts from "../../../services/post/getUserPosts";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../contexts/AuthContext";

export default function UserSavedList({ sortOption }: { sortOption: string }) {
  const user = useAuthContext().user?.user_id;

  const { isPending, error, data } = useQuery({
    queryKey: ["user-saved"],
    queryFn: () =>
      getUserPosts(
        `/api/post/privatelist/?filter=saved&user=${user}&sort=${sortOption.toLowerCase()}`
      ),
  });

  if (isPending) return "Loading";

  if (error) return "Couldn't load data";

  const posts = data.data;

  return (
    <Stack gap={0}>
      {posts.map((post: PostProps) => (
        <div key={`usersaved-${post.id}`}>
          <PostCard post={post} headerVariant="home" />
          <Line />
        </div>
      ))}
    </Stack>
  );
}
