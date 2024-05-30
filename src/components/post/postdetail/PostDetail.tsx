import { PostProps } from "../../../interfaces/postProps";
import { useLanguage } from "../../../contexts/LanguageContext";
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
  const { language } = useLanguage();

  return (
    <div className="my-2 mx-4 max-w-3xl">
      <PostDetailHeader post={post} />
      <div className="text-lg xs:text-xl font-bold text-white mt-3 mb-2 leading-snug xs:leading-normal break-words">
        {post.title}
      </div>
      {post.deleted ? (
        <p className="text-white/50">[{deleted[language]}]</p>
      ) : post.type === "text" ? (
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

const deleted = {
  uz: "post o'chirib yuborilgan",
  en: "post was deleted",
  ru: "post was deleted",
};
