import { PostProps } from "../../interfaces/postProps";
import PostDetailHeader from "./PostDetailHeader";
import Line from "../../utils/Line";
import CommentFeed from "../comment/CommentFeed";
import ReactHtmlParser from "react-html-parser";
import CommentProvider from "../../contexts/CommentContext";
import ImageViewer from "./ImageViewer";
import LinkPreview from "./LinkPreview";
import PostDetailFooter from "./PostDetailFooter";

interface PostDetailProps {
  post: PostProps;
  community: number;
}

export default function PostDetail({ post, community }: PostDetailProps) {
  return (
    <>
      <PostDetailHeader post={post} />
      <div className="xs:text-xl font-bold text-white mt-3 mb-2">
        {post.title}
      </div>
      {post.type === "text" ? (
        <div className="post-detail overflow-hidden break-words text-sm xs:text-base">
          {ReactHtmlParser(post.body)}
        </div>
      ) : post.type === "image" ? (
        <ImageViewer imageUrl={post.image} />
      ) : (
        <LinkPreview link={post.link} />
      )}
      <PostDetailFooter post={post} />
      <div className="mt-2">
        <Line />
      </div>
      <CommentProvider post={post.id} community={community}>
        <CommentFeed />
      </CommentProvider>
    </>
  );
}
