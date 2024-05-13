import { useState } from "react";
import { BsDot } from "react-icons/bs";
import { Avatar } from "@mantine/core";
import { BiCheckDouble } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { NotifProps } from "../../../interfaces/notificationProps";
import ReactHtmlParser from "react-html-parser";
import TimeDisplay from "../../general/TimeDisplay";

interface Props {
  notif: NotifProps;
  unreadExists: boolean;
  markAsRead: (read_one: "read_one" | "read_all", notif_id?: number) => void;
  closeMenu?: () => void;
}

export default function NotificationCard({
  notif,
  unreadExists,
  markAsRead,
  closeMenu,
}: Props) {
  const [isRead, setIsRead] = useState(notif.is_read);
  const navigate = useNavigate();

  function handleMarkRead() {
    setIsRead(true);
    markAsRead("read_one", notif.id);
  }

  function goToComment() {
    navigate(`/c/${notif.community_link}/post/${notif.post_permalink}`);
    closeMenu && closeMenu();
  }

  return (
    <>
      <div
        className={`flex justify-between gap-2 px-2 py-3 rounded-xl ${
          !isRead && unreadExists ? "bg-dark-850" : "hover:bg-dark-700"
        }`}
      >
        <button onClick={goToComment} className="flex gap-2 text-start">
          <Avatar src={notif.sender_avatar} />
          <div
            className={`break-words text-sm font-bold ${
              closeMenu && "w-[277px]"
            } `}
          >
            <span className="text-orange-400">{notif.sender}</span> replied to
            your {notif.type === "post_reply" ? "post" : "comment"} in{" "}
            <span className="text-blue-400">{notif.community_name}</span>
            <span className="inline-block items-center text-white/50 font-normal">
              <BsDot className="inline-block" />
              <TimeDisplay time={notif.created_at} />
            </span>
            <div className="post-detail line-clamp-3 font-normal">
              {ReactHtmlParser(notif.comment)}
            </div>
          </div>
        </button>
        <div className="flex items-center">
          {!isRead && unreadExists ? (
            <button
              onClick={handleMarkRead}
              className="hover:bg-dark-700 text-xl text-yellow-400 rounded-full p-1"
            >
              <BiCheckDouble />
            </button>
          ) : (
            <div className="text-xl p-1 text-white/50">
              <BiCheckDouble />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
