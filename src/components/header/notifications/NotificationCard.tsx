import { useState } from "react";
import { BsDot } from "react-icons/bs";
import { Avatar } from "@mantine/core";
import { BiCheckDouble } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { NotifProps } from "../../../interfaces/notificationProps";
import { useLanguage } from "../../../contexts/LanguageContext";
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
  const { language } = useLanguage();
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
          <Avatar
            src={
              notif.sender_deleted || notif.comment_deleted
                ? null
                : notif.sender_avatar
            }
          />
          <div
            className={`break-words text-sm font-bold ${
              closeMenu ? "w-[277px]" : "max-w-[calc(100vw-130px)]"
            } `}
          >
            {notif.sender_deleted || notif.comment_deleted ? (
              <span className="font-bold mr-1 text-white/50">
                [{notif_lang.deleted.user[language]}]
              </span>
            ) : (
              <span className="text-orange-400 mr-1">{notif.sender}</span>
            )}
            {notif.type === "post_reply"
              ? notif_lang.notif_type.comment[language]
              : notif_lang.notif_type.reply[language]}{" "}
            <span className="text-blue-400">{notif.community_name}</span>
            <span className="inline-block items-center text-white/50 font-normal">
              <BsDot className="inline-block" />
              <TimeDisplay time={notif.created_at} />
            </span>
            {notif.comment_deleted ? (
              <div className="text-white/50">
                [{notif_lang.deleted.comment[language]}]
              </div>
            ) : (
              <div className="post-detail line-clamp-3 font-normal">
                {ReactHtmlParser(notif.comment)}
              </div>
            )}
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

const notif_lang = {
  notif_type: {
    comment: {
      uz: "postingizga fikr bildirdi",
      en: "commented on your post in",
      ru: "commented on your post in",
    },
    reply: {
      uz: "fikringizga javob qaytardi",
      en: "replied to your comment in",
      ru: "replied to your comment in",
    },
  },
  deleted: {
    user: {
      uz: "o'chirilgan",
      en: "deleted",
      ru: "deleted",
    },
    comment: {
      uz: "fikr o'chirib yuborilgan",
      en: "comment was deleted",
      ru: "comment was deleted",
    },
  },
};
