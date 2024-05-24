import { PostProps } from "../../../interfaces/postProps";
import PostDetailHeader from "./PostDetailHeader";
import Line from "../../../utils/Line";
import CommentFeed from "../../comment/CommentFeed";
import ReactHtmlParser from "react-html-parser";
import CommentProvider from "../../../contexts/CommentContext";
import ImageViewer from "../../general/ImageViewer";
import LinkPreview from "../../general/LinkPreview";
import PostDetailFooter from "./PostDetailFooter";

interface PostDetailProps {
  post: PostProps;
  community: number;
}

export default function PostDetail({ post, community }: PostDetailProps) {
  return (
    <div className="my-2 mx-4">
      <PostDetailHeader post={post} />
      <div className="text-lg xs:text-xl font-bold text-white mt-3 mb-2 leading-snug xs:leading-normal">
        {post.title}
      </div>
      {post.type === "text" ? (
        <div className="post-detail overflow-hidden break-words leading-snug xs:leading-normal">
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
    </div>
  );
}
