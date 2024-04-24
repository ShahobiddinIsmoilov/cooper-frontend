import { useNavigate } from "react-router-dom";
import { PostProps } from "../../interfaces/postProps";
import { FaArrowLeft } from "react-icons/fa6";
import UserLink from "../common/UserLink";
import CommunityLinkAvatar from "../common/CommunityLinkAvatar";
import CommunityLink from "../common/CommunityLink";
import readableTime from "../../utils/readableTime";
import exactTime from "../../utils/exactTime";
import ContentShare from "../common/ContentShare";

export interface PostDetailHeaderProps {
  post: PostProps;
}

export default function PostDetailHeader({ post }: PostDetailHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-full cursor-pointer hover:bg-dark-700"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={22} />
        </button>
        <CommunityLinkAvatar
          community_avatar={post.community_avatar}
          community_link={post.community_link}
        />
        <div>
          <CommunityLink
            community_name={post.community_name}
            community_link={post.community_link}
          />
          <div className="flex items-center gap-1 text-sm">
            <UserLink username={post.username} />
            <span
              title={exactTime(post.created_at, "uz")}
              className="text-white/50"
            >
              {" "}
              ∙ {readableTime(post.created_at, "uz")}
            </span>
          </div>
        </div>
      </div>
      <ContentShare content="post" bg="700" />
    </div>
  );
}
