import { FiLink } from "react-icons/fi";
import { IoCopySharp } from "react-icons/io5";
import { Slide, toast } from "react-toastify";
import { content_share } from "./lang_general";
import { useLanguage } from "../../contexts/LanguageContext";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "./content-menu.css";

interface Props {
  community_link: string;
  post_permalink: string;
  comment_permalink?: string;
  bg: string;
}

export default function ContentShare({
  community_link,
  post_permalink,
  comment_permalink,
  bg,
}: Props) {
  const path = window.location.href;
  const { language } = useLanguage();

  const notifyCopySuccess = () =>
    toast.success(link_copy.success[language], {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

  const notifyCopyFail = () =>
    toast.error(link_copy.fail[language], {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

  async function handleCopy() {
    const parsedUrl = new URL(path);
    const baseUrl = parsedUrl.protocol + "//" + parsedUrl.host;

    const link = comment_permalink
      ? `${baseUrl}/c/${community_link}/post/${post_permalink}/${comment_permalink}`
      : `${baseUrl}/c/${community_link}/post/${post_permalink}`;

    try {
      await navigator.clipboard.writeText(link);
      notifyCopySuccess();
    } catch {
      notifyCopyFail();
    }
  }

  return (
    <Menu
      menuButton={
        <MenuButton
          className={`text-sm xs:text-base rounded-full p-[11px] cursor-pointer text-white/50 hover:text-white h-fit hover:bg-dark-${bg}`}
        >
          <FiLink />
        </MenuButton>
      }
      align="end"
      menuStyle={{
        backgroundColor: "#191919",
        borderRadius: "12px",
        zIndex: 1,
      }}
    >
      <MenuItem
        onClick={handleCopy}
        className="content-menuitem flex gap-2 items-center cursor-pointer rounded-lg text-white"
      >
        <IoCopySharp size={20} />
        {content_share.copy_link[language]}
      </MenuItem>
    </Menu>
  );
}

const link_copy = {
  success: {
    uz: "Havola nusxalandi",
    en: "Link copied successfully",
    ru: "Link copied successfully",
  },
  fail: {
    uz: "Havolani nusxalab bo'lmadi",
    en: "Couldn't copy link",
    ru: "Couldn't copy link",
  },
};
