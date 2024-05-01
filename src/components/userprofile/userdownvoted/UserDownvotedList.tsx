import { Stack } from "@mantine/core";
import { PostProps } from "../../../interfaces/postProps";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../contexts/AuthContext";
import Line from "../../../utils/Line";
import PostCard from "../../post/postcard/PostCard";
import getUserPosts from "../../../services/post/getUserPosts";

export default function UserDownvotedList({
  sortOption,
}: {
  sortOption: string;
}) {
  const user = useAuthContext().user?.user_id;

  const { isPending, error, data } = useQuery({
    queryKey: ["user-downvoted"],
    queryFn: () =>
      getUserPosts(
        `/api/post/privatelist/?filter=downvoted&user=${user}&sort=${sortOption.toLowerCase()}`
      ),
  });

  if (isPending) return "Loading";

  if (error) return "Couldn't load data";

  const posts = data.data;

  return (
    <Stack gap={0}>
      {posts.length > 0 ? (
        posts.map((post: PostProps) => (
          <div key={`userdownvoted-${post.id}`}>
            <PostCard post={post} headerVariant="home" />
            <Line />
          </div>
        ))
      ) : (
        <p className="text-center mt-8 text-white/50">This list is empty</p>
      )}
    </Stack>
  );
}
