import { useState } from "react";
import { useWindowSize } from "../contexts/WindowSizeContext";
import BackButtonHeader from "../components/general/BackButtonHeader";
import NotificationList from "../components/header/notifications/NotificationList";
import useCredentials from "../services/useCredentials";

export default function NotificationPage() {
  const { unreadCount, setUnreadCount } = useWindowSize();
  const [unreadExists, setUnreadExists] = useState(unreadCount > 0);

  const api = useCredentials();
  function markAsRead(variant: "read_one" | "read_all", notif_id?: number) {
    let data = {};
    if (variant === "read_one") {
      data = {
        action: "read_one",
        id: notif_id,
      };
      setUnreadCount((prevCount: number) => prevCount - 1);
    } else {
      data = {
        action: "read_all",
      };
      setUnreadCount(0);
      setUnreadExists(false);
    }
    api.post("/api/inbox/action/", data);
  }

  return (
    <div className="max-w-3xl mx-4 mt-2">
      <BackButtonHeader header="Notifications" />
      <NotificationList unreadExists={unreadExists} markAsRead={markAsRead} />
    </div>
  );
}
