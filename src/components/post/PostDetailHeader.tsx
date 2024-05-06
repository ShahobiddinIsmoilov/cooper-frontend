import { useNavigate } from "react-router-dom";
import { PostProps } from "../../interfaces/postProps";
import { FaArrowLeft } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";
import UserLink from "../general/UserLink";
import CommunityLinkAvatar from "../general/CommunityLinkAvatar";
import CommunityLink from "../general/CommunityLink";
import ContentShare from "../general/ContentShare";
import TimeDisplay from "../general/TimeDisplay";

export interface PostDetailHeaderProps {
  post: PostProps;
}

export default function PostDetailHeader({ post }: PostDetailHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
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
        <div>
          <CommunityLink
            community_name={post.community_name}
            community_link={post.community_link}
          />
          <div className="flex items-center text-sm text-white/50">
            <UserLink username={post.username} />
            <BsDot className="inline-block mt-1" />
            <TimeDisplay time={post.created_at} />
          </div>
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
