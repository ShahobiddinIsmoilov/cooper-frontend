import { Stack } from "@mantine/core";
import { PostProps } from "../../../interfaces/postProps";
import Line from "../../../utils/Line";
import PostCard from "../../post/postcard/PostCard";
import getUserPosts from "../../../services/post/getUserPosts";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";

export default function UserPostList({ sortOption }: { sortOption: string }) {
  let { username } = useParams();

  if (!username) username = useAuthContext().user?.username;
  const user = useAuthContext().user?.user_id;
  const sort = sortOption.toLowerCase();

  const { isPending, error, data } = useQuery({
    queryKey: [`userposts-${username}`],
    queryFn: () =>
      getUserPosts(
        `/api/post/list/?filter=user&username=${username}&user=${user}&sort=${sort}`
      ),
  });

  if (isPending) return "Loading";

  if (error) return "Couldn't load data";

  const posts = data.data;

  return (
    <Stack gap={0}>
      {posts.map((post: PostProps) => (
        <div key={`userpost-${post.id}`}>
          <PostCard post={post} notCommunity={true} />
          <Line />
        </div>
      ))}
    </Stack>
  );
}
