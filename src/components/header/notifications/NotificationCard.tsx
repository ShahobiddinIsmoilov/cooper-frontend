import { Avatar } from "@mantine/core";
import { NotifProps } from "../../../interfaces/notificationProps";
import { BiCheckDouble } from "react-icons/bi";
import { useState } from "react";
import ReactHtmlParser from "react-html-parser";

interface Props {
  notif: NotifProps;
  markAsRead: (read_one: "read_one" | "read_all", notif_id?: number) => void;
}

export default function NotificationCard({ notif, markAsRead }: Props) {
  const [isRead, setIsRead] = useState(notif.is_read);

  function handleMarkRead() {
    setIsRead(true);
    markAsRead("read_one", notif.id);
  }

  function goToComment() {}

  return (
    <>
      <div
        className={`flex justify-between gap-2 px-2 py-3 rounded-xl ${
          !isRead && "bg-dark-850"
        }`}
      >
        <button className="flex gap-2 text-start">
          <Avatar src={notif.user_avatar} />
          <div className="text-white w-[277px] break-words text-sm">
            <p className="font-bold">
              <span className="text-orange-400">{notif.username}</span> replied
              to your {notif.parent_comment === 0 ? "post" : "comment"} in{" "}
              <span className="text-blue-400">{notif.community_name}</span>
              <span className="text-white/50 font-normal"> ∙ 8 soat oldin</span>
            </p>
            <div className="post-detail">
              {ReactHtmlParser(notif.comment_body)}
            </div>
          </div>
        </button>
        <div className="flex items-center">
          {!isRead ? (
            <button
              onClick={handleMarkRead}
              className="hover:bg-dark-700 text-xl text-yellow-400 rounded-full p-1"
            >
              <BiCheckDouble />
            </button>
          ) : (
            <div className="h-[28px] w-[28px] min-w-[28px] min-h-[28px] max-w-[28px] max-h-[28px]" />
          )}
        </div>
      </div>
    </>
  );
}
