import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { PostProps } from "../../../interfaces/postProps";
import { useAuthContext } from "../../../contexts/AuthContext";
import { FetchError, FetchLoading } from "../../../utils/FetchStatus";
import { userupvoted } from "../lang_userprofile";
import { useLanguage } from "../../../contexts/LanguageContext";
import Line from "../../../utils/Line";
import PostCard from "../../post/postcard/PostCard";
import getUserPosts from "../../../services/post/getUserPosts";

export default function UserUpvotedList({
  sortOption,
}: {
  sortOption: string;
}) {
  const user = useAuthContext().user?.user_id;
  const sort = sortOption;
  const { language } = useLanguage();

  const { isPending, error, data } = useQuery({
    queryKey: ["userupvoted"],
    queryFn: () =>
      getUserPosts(
        `/api/post/privatelist/?filter=upvoted&user=${user}&sort=${sort}`
      ),
  });

  if (isPending) return <FetchLoading mt={8} size={20} />;

  if (error) return <FetchError mt={8} />;

  const posts = data.data.filter(
    (element: PostProps) => element.deleted === false
  );

  return (
    <Stack gap={0}>
      {posts.length > 0 ? (
        posts.map((post: PostProps) => (
          <div key={`userupvoted-${post.id}`}>
            <PostCard post={post} headerVariant="home" />
            <Line />
          </div>
        ))
      ) : (
        <p className="text-center mt-8 text-white/50">
          {userupvoted.empty_message[language]}
        </p>
      )}
    </Stack>
  );
}
