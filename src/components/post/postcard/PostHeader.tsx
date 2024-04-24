import { PostProps } from "../../../interfaces/postProps";
import exactTime from "../../../utils/exactTime";
import readableTime from "../../../utils/readableTime";
import CommunityLink from "../../common/CommunityLink";
import CommunityLinkAvatar from "../../common/CommunityLinkAvatar";
import UserLink from "../../common/UserLink";
import UserLinkAvatar from "../../common/UserLinkAvatar";
import ContentShare from "../../common/ContentShare";

export interface Props {
  post: PostProps;
  variant: string;
}

export default function PostHeader({ post, variant }: Props) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {variant === "community" ? (
          <UserLinkAvatar username={post.username} avatar={post.user_avatar} />
        ) : (
          <CommunityLinkAvatar
            community_link={post.community_link}
            community_avatar={post.community_avatar}
          />
        )}
        {variant === "community" ? (
          <UserLink username={post.username} />
        ) : (
          <div className="text-lg">
            <CommunityLink
              community_name={post.community_name}
              community_link={post.community_link}
            />
          </div>
        )}
        <span
          title={exactTime(post.created_at, "uz")}
          className="text-white/50"
        >
          {" "}
          ∙ {readableTime(post.created_at, "uz")}
        </span>
      </div>
      <ContentShare content="post" bg="600" />
    </div>
  );
}
