import { Menu } from "@mantine/core";
import { FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useWindowSize } from "../../../contexts/WindowSizeContext";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import NotificationList from "./NotificationList";
import useCredentials from "../../../services/useCredentials";

export default function Notifications({ count }: { count: number }) {
  const { unreadCount, setUnreadCount } = useWindowSize();
  const [unreadExists, setUnreadExists] = useState(count > 0);
  const [opened, { open, close }] = useDisclosure();
  const isExtraSmall = useWindowSize().screenWidth < 576;

  useEffect(() => {
    setUnreadCount(count);
  }, []);

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

  function handleMenuOpen() {
    setUnreadExists(true);
  }

  const query = useQueryClient();
  function handleMenuClose() {
    close();
    query.invalidateQueries({ queryKey: ["notifications"] });
  }

  const navigate = useNavigate();
  const screenHeight = useWindowSize().screenHeight;
  const bellsize = screenHeight > 700 ? 20 : 16;

  return isExtraSmall ? (
    <button
      onClick={() => navigate("/notifications")}
      className="relative hover:bg-dark-700 border-white border-opacity-25 rounded-full p-3"
    >
      <FaBell size={bellsize} />
      {unreadCount > 0 && (
        <div className="w-5 h-5 top-1 right-1 absolute bg-red-600 text-white text-xs flex justify-center items-center rounded-full">
          {unreadCount}
        </div>
      )}
    </button>
  ) : (
    <Menu
      opened={opened}
      width={400}
      position="bottom-end"
      offset={4}
      radius={12}
      onOpen={handleMenuOpen}
      onClose={handleMenuClose}
      closeOnItemClick
    >
      <Menu.Target>
        <button
          onClick={open}
          className="relative hover:bg-dark-700 border-white border-opacity-25 rounded-full p-3"
        >
          <FaBell size={bellsize} />
          {unreadCount > 0 && (
            <div className="w-5 h-5 top-1 right-1 absolute bg-red-600 text-white text-xs flex justify-center items-center rounded-full">
              {unreadCount}
            </div>
          )}
        </button>
      </Menu.Target>
      <Menu.Dropdown>
        <NotificationList
          unreadExists={unreadExists}
          markAsRead={markAsRead}
          closeMenu={close}
        />
      </Menu.Dropdown>
    </Menu>
  );
}
