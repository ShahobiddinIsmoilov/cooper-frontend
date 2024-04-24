import { Menu } from "@mantine/core";
import { FaBell } from "react-icons/fa";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import NotificationList from "./NotificationList";
import useCredentials from "../../../services/useCredentials";
import { useWindowSize } from "../../../contexts/WindowSizeContext";

export default function Notifications({ count }: { count: number }) {
  const [notifCount, setNotifCount] = useState(count);

  const api = useCredentials();
  function markAsRead(variant: "read_one" | "read_all", notif_id?: number) {
    let data = {};
    if (variant === "read_one") {
      data = {
        action: "read_one",
        id: notif_id,
      };
      setNotifCount((notifCount) => notifCount - 1);
    } else {
      data = {
        action: "read_all",
      };
      setNotifCount(0);
    }
    api.post("/api/inbox/action/", data);
  }

  const query = useQueryClient();
  function handleMenuClose() {
    query.invalidateQueries({ queryKey: ["notifications"] });
  }

  const screenHeight = useWindowSize().screenHeight;
  const bellsize = screenHeight > 700 ? 20 : 16;

  return (
    <Menu
      width={400}
      position="bottom-end"
      offset={4}
      radius={12}
      onClose={handleMenuClose}
    >
      <Menu.Target>
        <button className="relative hover:bg-dark-700 border-white border-opacity-25 rounded-full p-3">
          <FaBell size={bellsize} />
          {notifCount > 0 && (
            <div className="w-5 h-5 top-1 right-1 absolute bg-red-600 text-white text-xs flex justify-center items-center rounded-full">
              {notifCount}
            </div>
          )}
        </button>
      </Menu.Target>
      <Menu.Dropdown>
        <NotificationList
          markAsRead={markAsRead}
          unreadExists={notifCount > 0}
        />
      </Menu.Dropdown>
    </Menu>
  );
}
