import { BsDot } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { PostProps } from "../../../interfaces/postProps";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useWindowSize } from "../../../contexts/WindowSizeContext";
import CommunityLinkAvatar from "../../general/CommunityLinkAvatar";
import CommunityLink from "../../general/CommunityLink";
import ContentShare from "../../general/ContentShare";
import TimeDisplay from "../../general/TimeDisplay";
import UserLink from "../../general/UserLink";

export interface PostDetailHeaderProps {
  post: PostProps;
}

export default function PostDetailHeader({ post }: PostDetailHeaderProps) {
  const navigate = useNavigate();
  const screenWidth = useWindowSize().screenWidth;
  const { language } = useLanguage();

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2 overflow-hidden">
        <button
          className="p-2 rounded-full cursor-pointer bg-dark-750 hover:bg-dark-700"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={22} />
        </button>
        <CommunityLinkAvatar
          community_avatar={post.community_avatar}
          community_link={post.community_link}
          size={38}
        />
        <div className="text-nowrap">
          <CommunityLink
            community_name={post.community_name}
            community_link={post.community_link}
          />
          <div
            className={`flex items-center text-sm text-white/50 ${
              screenWidth < 768 && "max-w-[calc(100vw-150px)]"
            }`}
          >
            {post.deleted ? (
              <p>{[deleted.deleted_post[language]]}</p>
            ) : post.user ? (
              <div className="max-w-[65%] sm:max-w-full overflow-hidden">
                <UserLink username={post.username} />
              </div>
            ) : (
              <p>[{deleted.deleted_account[language]}]</p>
            )}
            <div>
              <BsDot className="inline-block" />
              <TimeDisplay time={post.created_at} />
            </div>
          </div>
          {post.edited && (
            <div className="text-sm text-white/50">
              (<i>{language === "en" && "edited "}</i>
              <i>
                <TimeDisplay time={post.edited_at} />
              </i>
              <i>{language === "uz" && " tahrirlangan"}</i>)
            </div>
          )}
        </div>
      </div>
      <ContentShare
        community_link={post.community_link}
        post_permalink={post.permalink}
        bg="700"
      />
    </div>
  );
}

const deleted = {
  deleted_post: {
    uz: "o'chirilgan",
    en: "deleted",
    ru: "deleted",
  },
  deleted_account: {
    uz: "hisob o'chirilgan",
    en: "deleted account",
    ru: "deleted account",
  },
};
