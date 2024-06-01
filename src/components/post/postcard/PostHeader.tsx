import { BsDot } from "react-icons/bs";
import { Avatar } from "@mantine/core";
import { PostProps } from "../../../interfaces/postProps";
import { useLanguage } from "../../../contexts/LanguageContext";
import CommunityLinkAvatar from "../../general/CommunityLinkAvatar";
import UserLinkAvatar from "../../general/UserLinkAvatar";
import CommunityLink from "../../general/CommunityLink";
import ContentShare from "../../general/ContentShare";
import TimeDisplay from "../../general/TimeDisplay";
import UserLink from "../../general/UserLink";

export interface Props {
  post: PostProps;
  variant: "community" | "home";
}

export default function PostHeader({ post, variant }: Props) {
  const { language } = useLanguage();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 max-w-[calc(100vw-72px)] xs:max-w-[calc(100vw-128px)] overflow-hidden">
        {variant === "community" ? (
          post.user ? (
            <UserLinkAvatar
              username={post.username}
              avatar={post.user_avatar}
            />
          ) : (
            <Avatar size={32}></Avatar>
          )
        ) : (
          <CommunityLinkAvatar
            community_link={post.community_link}
            community_avatar={post.community_avatar}
            size={32}
          />
        )}
        <div className="text-nowrap w-full">
          <div className="flex items-center gap-2 w-full">
            {variant === "community" ? (
              <div className="max-w-[calc(65%)] xs:max-w-[calc(85%)] overflow-hidden text-nowrap">
                {post.user ? (
                  <UserLink username={post.username} />
                ) : (
                  <p className="text-white/50">[{deleted_account[language]}]</p>
                )}
              </div>
            ) : (
              <div className="max-w-[calc(65%)] xs:max-w-[calc(85%)] overflow-hidden text-nowrap">
                <CommunityLink
                  community_name={post.community_name}
                  community_link={post.community_link}
                />
              </div>
            )}
            <div className="-ml-2 text-white/50 overflow-hidden text-nowrap">
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
        bg="600"
      />
    </div>
  );
}

const deleted_account = {
  uz: "hisob o'chirilgan",
  en: "deleted account",
  ru: "deleted account",
};
