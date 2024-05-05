import { Stack } from "@mantine/core";
import { PostProps } from "../../../interfaces/postProps";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../contexts/AuthContext";
import { FetchError, FetchLoading } from "../../../utils/FetchStatus";
import { usersaved } from "../lang_userprofile";
import { useLanguage } from "../../../contexts/LanguageContext";
import Line from "../../../utils/Line";
import PostCard from "../../post/postcard/PostCard";
import getUserPosts from "../../../services/post/getUserPosts";

export default function UserSavedList({ sortOption }: { sortOption: string }) {
  const user = useAuthContext().user?.user_id;
  const sort = sortOption;
  const { language } = useLanguage();

  const { isPending, error, data } = useQuery({
    queryKey: ["user-saved"],
    queryFn: () =>
      getUserPosts(
        `/api/post/privatelist/?filter=saved&user=${user}&sort=${sort}`
      ),
  });

  if (isPending) return <FetchLoading />;

  if (error) return <FetchError />;

  const posts = data.data;

  return (
    <Stack gap={0}>
      {posts.length > 0 ? (
        posts.map((post: PostProps) => (
          <div key={`usersaved-${post.id}`}>
            <PostCard post={post} headerVariant="home" />
            <Line />
          </div>
        ))
      ) : (
        <p className="text-center mt-8 text-white/50">
          {usersaved.empty_message[language]}
        </p>
      )}
    </Stack>
  );
}
