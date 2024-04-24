import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../services/makeRequest";
import { useAuthContext } from "../../../contexts/AuthContext";
import { NotifProps } from "../../../interfaces/notificationProps";
import { BiCheckDouble } from "react-icons/bi";
import NotificationCard from "./NotificationCard";

interface Props {
  markAsRead: (read_one: "read_one" | "read_all", notif_id?: number) => void;
  unreadExists: boolean;
}

export default function NotificationList({ markAsRead, unreadExists }: Props) {
  function handleMarkReadAll() {
    markAsRead("read_all");
  }

  const user = useAuthContext().user?.user_id;

  const { isPending, error, data } = useQuery({
    queryKey: ["notifications"],
    queryFn: () =>
      makeRequest(`/api/inbox/list/?filter=user&parent_user=${user}`),
  });

  if (isPending)
    return (
      <div className="flex justify-center items-center h-48">Loading...</div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-48">
        Couldn't load data
      </div>
    );

  const notifs = data.data;

  return (
    <Stack
      gap={0}
      className="my-1 max-h-96 rounded-xl overflow-hidden hover:overflow-y-scroll notif-scrollbar"
    >
      <div className="flex justify-end">
        <button
          onClick={handleMarkReadAll}
          disabled={!unreadExists}
          className={`font-bold text-sm rounded-full px-3 py-1 flex items-center gap-1 ${
            unreadExists ? "text-yellow-400 hover:bg-dark-700" : "text-white/50"
          }`}
        >
          <BiCheckDouble size={22} />
          Mark all as read
        </button>
      </div>
      {notifs.map((item: NotifProps) => (
        <div key={item.id}>
          <NotificationCard notif={item} markAsRead={markAsRead} />
        </div>
      ))}
    </Stack>
  );
}
