import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../services/makeRequest";
import { useAuthContext } from "../../../contexts/AuthContext";
import { NotifProps } from "../../../interfaces/notificationProps";
import { BiCheckDouble } from "react-icons/bi";
import { FetchError, FetchLoading } from "../../../utils/FetchStatus";
import { useLanguage } from "../../../contexts/LanguageContext";
import NotificationCard from "./NotificationCard";

interface Props {
  unreadExists: boolean;
  markAsRead: (read_one: "read_one" | "read_all", notif_id?: number) => void;
  closeMenu?: () => void;
}

export default function NotificationList({
  unreadExists,
  markAsRead,
  closeMenu,
}: Props) {
  function handleMarkReadAll() {
    markAsRead("read_all");
  }

  const { language } = useLanguage();
  const user = useAuthContext().user?.user_id;

  const { isPending, error, data } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => makeRequest(`/api/inbox/list/?filter=user&receiver=${user}`),
  });

  if (isPending)
    return (
      <div className="h-24 flex justify-center items-center">
        <FetchLoading size={20} />
      </div>
    );

  if (error)
    return (
      <div className="h-24 flex justify-center items-center">
        <FetchError />
      </div>
    );

  const notifs = data.data;

  let newUnreadCount = 0;
  notifs.forEach((item: NotifProps) => {
    item["is_read"] === false && newUnreadCount++;
  });

  const readAllButtonEnabled = unreadExists && newUnreadCount > 0;

  return (
    <Stack
      gap={0}
      className={`my-1 rounded-xl overflow-hidden hover:overflow-y-scroll notif-scrollbar ${
        closeMenu && "max-h-96"
      }`}
    >
      <div className="flex justify-end">
        <button
          onClick={handleMarkReadAll}
          disabled={!readAllButtonEnabled}
          className={`font-bold text-sm rounded-full px-3 py-1 flex items-center gap-1 ${
            readAllButtonEnabled
              ? "text-yellow-400 hover:bg-dark-700"
              : "text-white/50"
          }`}
        >
          <BiCheckDouble size={22} />
          {read_all[language]}
        </button>
      </div>
      {notifs.map((item: NotifProps) => (
        <div key={item.id}>
          <NotificationCard
            notif={item}
            unreadExists={unreadExists}
            markAsRead={markAsRead}
            closeMenu={closeMenu}
          />
        </div>
      ))}
    </Stack>
  );
}

const read_all = {
  uz: "Hammasini o'qilgan deb belgilash",
  en: "Mark all as read",
  ru: "Mark all as read",
};
