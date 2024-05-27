import { ReactNode } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { BiSolidLike } from "react-icons/bi";
import { useAuthContext } from "../../contexts/AuthContext";
import { Avatar, Button, Group, Menu, Modal, Stack } from "@mantine/core";
import { IoLanguage } from "react-icons/io5";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { UserDetailProps } from "../../interfaces/userDetailProps";
import { useWindowSize } from "../../contexts/WindowSizeContext";
import { useLanguage } from "../../contexts/LanguageContext";

export default function ProfileMenu({ user }: { user: UserDetailProps }) {
  const [opened, { open, close }] = useDisclosure();
  const logout = useAuthContext().logoutUser;

  const screenHeight = useWindowSize().screenHeight;
  const avatarsize = screenHeight > 700 ? 36 : 32;
  const { language, changeLanguage } = useLanguage();

  return (
    <div>
      <Menu width={250} position="bottom-end" offset={4} radius={12}>
        <Menu.Target>
          <button className="hover:bg-dark-700 rounded-full p-1">
            <Avatar
              size={avatarsize}
              src={user.avatar}
              className="hover:border-opacity-50 cursor-pointer"
            />
          </button>
        </Menu.Target>
        <Menu.Dropdown>
          <ProfileInfoMenu user={user} />
          <Menu.Item p={0}>
            <Link to="/profile">
              <MenuItem icon={<FaUserCircle size={30} />} text="View Profile" />
            </Link>
          </Menu.Item>
          <Menu.Item p={0}>
            <Link to="/profile/settings">
              <MenuItem icon={<IoMdSettings size={30} />} text="Settings" />
            </Link>
          </Menu.Item>
          <Menu.Item p={0}>
            <MenuItem
              onClick={() => changeLanguage(language === "uz" ? "en" : "uz")}
              icon={<IoLanguage size={30} />}
              text={language === "uz" ? "English" : "Uzbek"}
            />
          </Menu.Item>
          <Menu.Item p={0}>
            <MenuItem
              onClick={open}
              icon={<MdLogout size={30} />}
              text="Log out"
            />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Modal
        size="fit"
        opened={opened}
        onClose={close}
        centered
        radius={12}
        shadow="xs"
        withCloseButton={false}
      >
        <Stack className="items-center px-4">
          <span className="text-xl">
            {profile_menu.log_out_modal.text[language]}
          </span>
          <Group pt={12}>
            <Button variant="default" radius={12} onClick={close}>
              {profile_menu.log_out_modal.cancel[language]}
            </Button>
            <Button variant="default" radius={12} onClick={logout}>
              {profile_menu.log_out_modal.log_out[language]}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
}

interface MenuItemProps {
  icon: ReactNode;
  text: string;
  onClick?: () => void;
}

function MenuItem({ icon, text, onClick }: MenuItemProps) {
  return (
    <div
      onClick={onClick}
      className="w-full flex gap-2 text-lg hover:bg-dark-700 p-4 cursor-pointer items-center rounded-lg"
    >
      {icon}
      {text}
    </div>
  );
}

function ProfileInfoMenu({ user }: { user: UserDetailProps }) {
  const { language } = useLanguage();

  return (
    <div className="gap-2 px-4 py-2 flex items-center">
      <Avatar
        radius={12}
        src={user.avatar}
        className="rounded-lg w-14 h-14 min-w-14"
      />
      <div className="overflow-hidden">
        <p className="text-orange-400 text-lg truncate">{user.username}</p>
        <p className="flex items-center gap-1">
          <BiSolidLike className="text-yellow-400" />
          <span className="opacity-75">
            {user.votes.toLocaleString() +
              profile_menu.menu_items.likes[language]}
          </span>
        </p>
      </div>
    </div>
  );
}

const profile_menu = {
  menu_items: {
    likes: {
      uz: " yoqtirishlar",
      en: " likes",
      ru: " likes",
    },
    view_profile: {
      uz: "Profilga o'tish",
      en: "View Profile",
      ru: "View profile",
    },
    settings: {
      uz: "Sozlamalar",
      en: "Settings",
      ru: "Settings",
    },
    log_out: {
      uz: "Hisobdan chiqish",
      en: "Log out",
      ru: "Log out",
    },
  },
  log_out_modal: {
    text: {
      uz: "Rostdan ham hisobdan chiqishni xohlaysizmi?",
      en: "Are you sure you want to log out?",
      ru: "Are you sure you want to log out?",
    },
    cancel: {
      uz: "Bekor qilish",
      en: "Cancel",
      ru: "Cancel",
    },
    log_out: {
      uz: "Chiqish",
      en: "Log out",
      ru: "Log out",
    },
  },
};
