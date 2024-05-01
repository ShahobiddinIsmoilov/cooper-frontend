import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { PostProps } from "../../interfaces/postProps";
import { useAuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import Line from "../../utils/Line";
import PostCard from "./postcard/PostCard";
import getPosts from "../../services/post/getPosts";

interface Props {
  filter: "home" | "explore" | "all" | "community";
  sortOption: string;
  community?: number;
}

export default function PostList({ filter, sortOption, community }: Props) {
  const user = useAuthContext().user?.user_id;

  const { isPending, error, data } = useQuery({
    queryKey: community
      ? [`posts-community-${community}`]
      : [`posts-${filter}`],
    queryFn: () =>
      getPosts({
        filter: filter,
        sortOption: sortOption,
        community: community,
        user: user,
      }),
  });

  if (isPending) return "Loading...";

  if (error) return "Error";

  const posts = data.data;

  let emptyMessage: ReactNode;
  if (filter === "home") {
    emptyMessage = (
      <div className="text-center mt-8 text-white/50">
        <p>Here we show posts from the communities you joined.</p>
        <p>You have not joined any community yet.</p>
        <p>
          Go{" "}
          <Link to="/explore" className="text-cyan-500">
            explore
          </Link>{" "}
          some posts and join the communities you like!
        </p>
      </div>
    );
  } else if (filter === "explore") {
    emptyMessage = (
      <div className="text-center mt-8 text-white/50">
        <p>Here we show posts from the communities you have not joined.</p>
        <p>
          You have joined all the communities. You can go{" "}
          <Link to="/home" className="text-cyan-500">
            home
          </Link>
          .
        </p>
      </div>
    );
  } else if (filter === "all") {
    emptyMessage = (
      <div className="text-center mt-8 text-white/50">
        <p>Website doesn't have any posts yet.</p>
      </div>
    );
  } else if (filter === "community") {
    emptyMessage = (
      <div className="text-center mt-8 text-white/50">
        <p>This community doesn't have any posts yet.</p>
      </div>
    );
  }

  return (
    <Stack gap={0} className="max-w-3xl">
      <div className="mt-2">
        <Line />
      </div>
      {posts.length > 0
        ? posts.map((post: PostProps) => (
            <div key={post.id}>
              <PostCard
                post={post}
                headerVariant={filter === "community" ? filter : "home"}
              />
              <Line />
            </div>
          ))
        : emptyMessage}
    </Stack>
  );
}
