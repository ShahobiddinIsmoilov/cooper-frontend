import { Link } from "react-router-dom";
import { PostProps } from "../../../interfaces/postProps";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import ReactHtmlParser from "react-html-parser";
import ImageViewer from "../../general/ImageViewer";
import LinkPreview from "../../general/LinkPreview";

export interface PostCardProps {
  post: PostProps;
  headerVariant: "community" | "home";
}

export default function PostCard({ post, headerVariant }: PostCardProps) {
  return (
    <div className="text-white xs:rounded-xl my-[6px] py-[6px] hover:bg-dark-750">
      <div className="mx-4">
        <PostHeader post={post} variant={headerVariant} />
      </div>
      <Link to={`/c/${post.community_link}/post/${post.permalink}`}>
        <p className="text-lg xs:text-xl font-bold pt-2 pb-1 px-4 hover:text-indigo-400 leading-snug xs:leading-normal">
          {post.title}
        </p>
      </Link>
      <div className="mx-4">
        {post.type === "text" ? (
          <div className="post-card line-clamp-5 leading-snug xs:leading-normal">
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
