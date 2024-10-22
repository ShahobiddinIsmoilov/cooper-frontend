import { Flex } from "@mantine/core";
import { CommentProps } from "../../../interfaces/commentProps";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import UserLink from "../../general/UserLink";
import CommunityLink from "../../general/CommunityLink";
import TimeDisplay from "../../general/TimeDisplay";
import CommunityLinkAvatar from "../../general/CommunityLinkAvatar";

interface CommentCardProps {
  comment: CommentProps;
}

export default function CommentHeader({ comment }: CommentCardProps) {
  const { language } = useLanguage();

  let userAction;
  if (language === "uz") {
    if (comment.parent === 0) {
      userAction = (
        <span className="flex gap-1 text-white/50">
          <TimeDisplay time={comment.created_at} />
          fikr bildirdi
        </span>
      );
    } else {
      userAction = (
        <Flex className="gap-1">
          <span className="text-white/50">
            <TimeDisplay time={comment.created_at} />{" "}
          </span>
          {comment.parent_deleted || comment.parent_user_deleted ? (
            <span className="text-white/50 font-bold">
              [{deleted.user[language]}]
            </span>
          ) : (
            <UserLink username={comment.parent_username} />
          )}
          <span className="text-white/50">ga javob yozdi</span>
        </Flex>
      );
    }
  } else {
    if (comment.parent === 0) {
      userAction = (
        <span className="flex gap-1 text-white/50">
          commented
          <TimeDisplay time={comment.created_at} />
        </span>
      );
    } else {
      userAction = (
        <Flex className="gap-1">
          <span className="text-white/50">replied to</span>
          <UserLink username={comment.parent_username} />
          <span className="text-white/50">
            <TimeDisplay time={comment.created_at} />{" "}
          </span>
        </Flex>
      );
    }
  }

  return (
    <Flex gap={0} className="text-sm xs:text-base">
      <CommunityLinkAvatar
        community_link={comment.community_link}
        community_avatar={comment.community_avatar}
        size={32}
      />
      <div className="ml-2 max-w-[calc(100vw-100px)]">
        <div className="inline-block break-words">
          <CommunityLink
            community_name={comment.community_name}
            community_link={comment.community_link}
          />
        </div>
        <BsDot className="inline-block" />
        {comment.post_deleted ? (
          <span className="text-white/50">[{deleted.post[language]}]</span>
        ) : (
          <Link
            to={`/c/${comment.community_link}/post/${comment.post_permalink}`}
            className="hover:underline w-full break-words"
          >
            <span className="font-bold text-white">{comment.post_title}</span>
          </Link>
        )}
        <div className="w-[38px]" />
        <div className="inline-block mr-1 break-words">
          <UserLink username={comment.username} />
        </div>
        <div className="inline-block">{userAction}</div>
      </div>
    </Flex>
  );
}

const deleted = {
  post: {
    uz: "post o'chirib yuborilgan",
    en: "deleted post",
    ru: "deleted post",
  },
  user: {
    uz: "o'chirilgan",
    en: "deleted",
    ru: "deleted",
  },
};
