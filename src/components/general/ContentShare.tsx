import { FiLink } from "react-icons/fi";
import { IoCopySharp } from "react-icons/io5";
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

  async function handleCopy() {
    const parsedUrl = new URL(path);
    const baseUrl = parsedUrl.protocol + "//" + parsedUrl.host;

    const link = comment_permalink
      ? `${baseUrl}/c/${community_link}/post/${post_permalink}/${comment_permalink}`
      : `${baseUrl}/c/${community_link}/post/${post_permalink}`;

    await navigator.clipboard.writeText(link);
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
        Copy link
      </MenuItem>
    </Menu>
  );
}
