import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mantine/core";
import { useAuthContext } from "../../contexts/AuthContext";
import { Preview } from "./UserLink";

interface UserLinkProps {
  username: string;
  avatar?: string;
}

export default function UserLinkAvatar({ username, avatar }: UserLinkProps) {
  const [showPreview, setShowPreview] = useState(false);
  const user = useAuthContext().user;

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
    <div className="flex items-center gap-1">
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Link
          to={username === user?.username ? `/profile/` : `/user/${username}`}
          className="font-bold hover:underline text-orange-400"
        >
          {<Avatar size={32} src={avatar} />}
        </Link>
        {showPreview && <Preview username={username} />}
      </div>
    </div>
  );
}
