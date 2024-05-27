import { Route, Routes, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PostProps } from "../interfaces/postProps";
import { makeRequest } from "../services/makeRequest";
import { useAuthContext } from "../contexts/AuthContext";
import { useWindowSize } from "../contexts/WindowSizeContext";
import { FetchError, FetchLoading } from "../utils/FetchStatus";
import { CommunityDetailProps } from "../interfaces/communityDetailProps";
import PostDetail from "../components/post/postdetail/PostDetail";
import Infobar from "../components/Infobar";
import PostEdit from "../components/post/postdetail/PostEdit";

export default function PostDetailPage() {
  const { screenWidth } = useWindowSize();
  const { post_permalink } = useParams();
  const { community_link } = useParams();
  const user = useAuthContext().user?.user_id;

  const { isPending, error, data } = useQuery({
    queryKey: [`post-detail-${post_permalink}`],
    queryFn: () =>
      makeRequest(`api/post/detail/${post_permalink}/?user=${user}`),
    retry: 2,
  });

  if (isPending) return <FetchLoading size={24} mt={8} />;

  if (error) return <FetchError mt={8} />;

  const post: PostProps = data.data.post_detail;
  const community: CommunityDetailProps = data.data.community_detail;

  if (community_link !== community.link)
    history.replaceState(
      null,
      "",
      `/c/${community.link}/post/${post.permalink}`
    );

  return (
    <div className="flex">
      <div
        className={`flex-grow ${
          screenWidth >= 920 ? "max-w-[calc(100%-288px)]" : "w-screen"
        }`}
      >
        <Routes>
          <Route
            path=""
            element={<PostDetail post={post} community={community.id} />}
          />
          <Route path="/edit" element={<PostEdit post={post} />} />
        </Routes>
      </div>
      <div className="mt-2">
        {screenWidth >= 920 && (
          <Infobar community={data.data.community_detail} />
        )}
      </div>
    </div>
  );
}
