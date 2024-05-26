import { BsThreeDots } from "react-icons/bs";
import { FaRegBookmark, FaBookmark, FaRegFlag } from "react-icons/fa6";
import { useState } from "react";
import { PostProps } from "../../interfaces/postProps";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useLanguage } from "../../contexts/LanguageContext";
import { content_options } from "./lang_general";
import { useAuthContext } from "../../contexts/AuthContext";
import { Slide, toast } from "react-toastify";
import useCredentials from "../../services/useCredentials";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "./content-menu.css";

export function ContentOptions({ post, bg }: { post: PostProps; bg: string }) {
  const api = useCredentials();
  const [saved, setSaved] = useState(post.saved);
  const { user } = useAuthContext();
  const { language } = useLanguage();

  const notifyNotAuthenticated = () =>
    toast.error("Postni saqlash uchun hisobingizga kiring", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

  function handleSave() {
    if (user) {
      saved
        ? api
            .post("/api/post/action/", { action: "undo_save", post: post.id })
            .then(() => setSaved(false))
        : api
            .post("/api/post/action/", { action: "save", post: post.id })
            .then(() => setSaved(true));
    } else {
      notifyNotAuthenticated();
    }
  }

  return (
    <Menu
      menuButton={
        <MenuButton
          className={`hover:bg-dark-${bg} rounded-full text-white/50 hover:text-white flex p-[10px] cursor-pointer items-center`}
        >
          <BsThreeDots />
        </MenuButton>
      }
      align="end"
      menuStyle={{
        backgroundColor: "#191919",
        borderRadius: "12px",
        zIndex: 2,
      }}
    >
      <MenuItem
        onClick={handleSave}
        className="content-menuitem flex gap-2 items-center cursor-pointer rounded-lg text-white"
      >
        {saved ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
        <span>
          {saved
            ? content_options.remove_save[language]
            : content_options.save[language]}
        </span>
      </MenuItem>
      <MenuItem className="content-menuitem flex gap-2 items-center cursor-pointer rounded-lg text-white">
        <FaRegFlag size={20} />
        <span>{content_options.report[language]}</span>
      </MenuItem>
    </Menu>
  );
}
