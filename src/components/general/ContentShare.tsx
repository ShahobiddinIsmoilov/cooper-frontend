import { FiLink } from "react-icons/fi";
import { IoCopySharp } from "react-icons/io5";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useLocation } from "react-router-dom";
import "./content-menu.css";

interface Props {
  content: "post" | "comment";
  bg: string;
}

export default function ContentShare({ bg }: Props) {
  function handleCopy() {
    const path = useLocation();
    navigator.clipboard.writeText(String(path));
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
