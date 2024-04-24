import { Link } from "react-router-dom";
import { PostProps } from "../../../interfaces/postProps";
import PostHeaderHome from "./PostHeader";
import PostFooter from "./PostFooter";
import ReactHtmlParser from "react-html-parser";
import ImageViewer from "../ImageViewer";
import LinkPreview from "../LinkPreview";

export interface PostCardProps {
  post: PostProps;
  headerVariant: string;
}

export default function PostCard({ post, headerVariant }: PostCardProps) {
  return (
    <div className="text-white xs:rounded-xl my-[6px] py-[6px] hover:bg-dark-750">
      <div className="mx-4">
        <PostHeaderHome post={post} variant={headerVariant} />
      </div>
      <Link to={`/c/${post.community_link}/post/${post.permalink}`}>
        <p className="xs:text-lg font-bold pt-2 pb-1 px-4 hover:text-indigo-400">
          {post.title}
        </p>
      </Link>
      <div className="mx-4">
        {post.type === "text" ? (
          <div className="post-card line-clamp-3 text-sm xs:text-base">
            {ReactHtmlParser(post.body)}
          </div>
        ) : post.type === "image" ? (
          <ImageViewer imageUrl={post.image} />
        ) : (
          <LinkPreview link={post.link} />
        )}
      </div>
      <div className="mx-4">
        <PostFooter post={post} />
      </div>
    </div>
  );
}
