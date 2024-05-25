import { Stack } from "@mantine/core";
import { PostProps } from "../../../interfaces/postProps";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../contexts/AuthContext";
import { FetchError, FetchLoading } from "../../../utils/FetchStatus";
import { userdownvoted } from "../lang_userprofile";
import { useLanguage } from "../../../contexts/LanguageContext";
import Line from "../../../utils/Line";
import PostCard from "../../post/postcard/PostCard";
import getUserPosts from "../../../services/post/getUserPosts";

export default function UserDownvotedList({
  sortOption,
}: {
  sortOption: string;
}) {
  const user = useAuthContext().user?.user_id;
  const sort = sortOption;
  const { language } = useLanguage();

  const { isPending, error, data } = useQuery({
    queryKey: ["user-downvoted"],
    queryFn: () =>
      getUserPosts(
        `/api/post/privatelist/?filter=downvoted&user=${user}&sort=${sort}`
      ),
  });

  if (isPending) return <FetchLoading mt={8} size={20} />;

  if (error) return <FetchError mt={8} />;

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
        <p className="text-center mt-8 text-white/50">
          {userdownvoted.empty_message[language]}
        </p>
      )}
    </Stack>
  );
}
