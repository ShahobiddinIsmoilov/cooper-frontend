import { Stack } from "@mantine/core";
import { PostProps } from "../../../interfaces/postProps";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { FetchError, FetchLoading } from "../../../utils/FetchStatus";
import { userposts } from "../lang_userprofile";
import { useLanguage } from "../../../contexts/LanguageContext";
import Line from "../../../utils/Line";
import PostCard from "../../post/postcard/PostCard";
import getUserPosts from "../../../services/post/getUserPosts";

export default function UserPostList({ sortOption }: { sortOption: string }) {
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
    queryKey: [`userposts-${username}`],
    queryFn: () =>
      getUserPosts(
        `/api/post/list/?filter=user&username=${username}&user=${user}&sort=${sort}`
      ),
  });

  if (isPending) return <FetchLoading mt={8} size={20} />;

  if (error) return <FetchError mt={8} />;

  const posts = data.data;

  return (
    <Stack gap={0}>
      {posts.length > 0 ? (
        posts.map((post: PostProps) => (
          <div key={`userpost-${post.id}`}>
            <PostCard post={post} headerVariant="home" />
            <Line />
          </div>
        ))
      ) : (
        <p className="text-center mt-8 text-white/50">
          {isProfilePage
            ? userposts.empty_message_self[language]
            : userposts.empty_message[language]}
        </p>
      )}
    </Stack>
  );
}
