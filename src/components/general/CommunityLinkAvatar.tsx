import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mantine/core";
import { Preview } from "./CommunityLink";

interface CommunityLinkProps {
  community_link: string;
  community_avatar: string;
}

export default function CommunityLinkAvatar({
  community_avatar,
  community_link,
}: CommunityLinkProps) {
  const [showPreview, setShowPreview] = useState(false);

  let showPreviewTimer: NodeJS.Timeout;
  let hidePreviewTimer: NodeJS.Timeout;

  function handleMouseEnter() {
    clearTimeout(hidePreviewTimer);
    showPreviewTimer = setTimeout(() => {
      setShowPreview(true);
    }, 750);
  }

  function handleMouseLeave() {
    clearTimeout(showPreviewTimer);
    hidePreviewTimer = setTimeout(() => {
      setShowPreview(false);
    }, 250);
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link
        to={`/c/${community_link}`}
        className="font-bold hover:underline text-blue-400"
      >
        <Avatar src={community_avatar} />
      </Link>
      {showPreview && <Preview community_link={community_link} />}
    </div>
  );
}
