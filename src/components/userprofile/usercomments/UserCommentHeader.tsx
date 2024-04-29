import { Flex } from "@mantine/core";
import { CommentProps } from "../../../interfaces/commentProps";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";
import UserLink from "../../general/UserLink";
import CommunityLink from "../../general/CommunityLink";
import TimeDisplay from "../../general/TimeDisplay";
import CommunityLinkAvatar from "../../general/CommunityLinkAvatar";

interface CommentCardProps {
  comment: CommentProps;
}

export default function CommentHeader({ comment }: CommentCardProps) {
  return (
    <Flex gap={0} className="text-xs xs:text-base">
      <CommunityLinkAvatar community_link={comment.community_link} />
      <div className="mt-[6px] ml-2">
        <div className="inline-block">
          <CommunityLink
            community_name={comment.community_name}
            community_link={comment.community_link}
          />
        </div>
        <BsDot className="inline-block" />
        <Link
          to={`/c/${comment.community_link}/post/${comment.post_permalink}`}
          className="hover:underline"
        >
          <span className="font-bold text-white">{comment.post_title}</span>
        </Link>
        <div className="w-[38px]" />
        <div className="inline-block mr-1">
          <UserLink username={comment.username} />
        </div>
        <div className="inline-block">
          {comment.parent === 0 ? (
            <span className="flex gap-1 text-white/50">
              commented
              <TimeDisplay time={comment.created_at} />
            </span>
          ) : (
            <Flex className="gap-1">
              <span className="text-white/50">replied to</span>
              <UserLink username={comment.parent_username} />
              <span className="text-white/50">
                <TimeDisplay time={comment.created_at} />{" "}
              </span>
            </Flex>
          )}
        </div>
      </div>
    </Flex>
  );
}
