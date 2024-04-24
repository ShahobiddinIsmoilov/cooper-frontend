import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { PostProps } from "../../../interfaces/postProps";
import { useAuthContext } from "../../../contexts/AuthContext";
import Line from "../../../utils/Line";
import PostCard from "../../post/postcard/PostCard";
import getUserPosts from "../../../services/post/getUserPosts";

export default function UserUpvotedList({
  sortOption,
}: {
  sortOption: string;
}) {
  const user = useAuthContext().user?.user_id;

  const { isPending, error, data } = useQuery({
    queryKey: ["user-upvoted"],
    queryFn: () =>
      getUserPosts(
        `/api/post/privatelist/?filter=upvoted&user=${user}&sort=${sortOption.toLowerCase()}`
      ),
  });

  if (isPending) return "Loading";

  if (error) return "Couldn't load data";

  const posts = data.data;

  return (
    <Stack gap={0}>
      {posts.map((post: PostProps) => (
        <div key={`userupvoted-${post.id}`}>
          <PostCard post={post} />
          <Line />
        </div>
      ))}
    </Stack>
  );
}
