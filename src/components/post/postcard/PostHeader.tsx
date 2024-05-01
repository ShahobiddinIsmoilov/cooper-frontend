import { BsDot } from "react-icons/bs";
import { PostProps } from "../../../interfaces/postProps";
import CommunityLink from "../../general/CommunityLink";
import CommunityLinkAvatar from "../../general/CommunityLinkAvatar";
import UserLink from "../../general/UserLink";
import UserLinkAvatar from "../../general/UserLinkAvatar";
import ContentShare from "../../general/ContentShare";
import TimeDisplay from "../../general/TimeDisplay";

export interface Props {
  post: PostProps;
  variant: "community" | "home";
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
          <CommunityLink
            community_name={post.community_name}
            community_link={post.community_link}
          />
        )}
        <div className="-ml-2 text-white/50">
          <BsDot className="inline-block" />
          <TimeDisplay time={post.created_at} />
        </div>
      </div>
      <ContentShare
        community_link={post.community_link}
        post_permalink={post.permalink}
        bg="600"
      />
    </div>
  );
}
