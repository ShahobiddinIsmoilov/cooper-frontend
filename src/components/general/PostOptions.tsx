import { ReactNode, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PostProps } from "../../interfaces/postProps";
import { useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { FaRegBookmark, FaBookmark, FaRegFlag } from "react-icons/fa6";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useCredentials from "../../services/useCredentials";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "./content-menu.css";

export default function PostOptions({
  post,
  bg,
  postDetailPage,
}: {
  post: PostProps;
  bg: string;
  postDetailPage?: boolean;
}) {
  const api = useCredentials();
  const [saved, setSaved] = useState(post.saved);
  const { user } = useAuthContext();
  const { language } = useLanguage();
  const [opened, { open, close }] = useDisclosure();
  const [modalDisabled, setModalDisabled] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>();
  const [modalTitle, setModalTitle] = useState("");
  const path = window.location.href;
  const queryClient = useQueryClient();
  const username = useAuthContext().user?.username;
  const navigate = useNavigate();

  const notifyNotAuthenticated = () =>
    toast.error(content_options.toast.unauthorized[language], {
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

  const notifySaveSuccess = () =>
    toast.success(content_options.toast.saved[language], {
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

  const notifyUndoSaveSuccess = () =>
    toast.info(content_options.toast.unsaved[language], {
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

  const notifyDeleteSuccess = () =>
    toast.success(content_options.toast.deleted[language], {
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
            .then(() => {
              setSaved(false);
              notifyUndoSaveSuccess();
            })
        : api
            .post("/api/post/action/", { action: "save", post: post.id })
            .then(() => {
              setSaved(true);
              notifySaveSuccess();
            });
    } else {
      notifyNotAuthenticated();
    }
  }

  function handleEdit() {
    navigate(`/c/${post.community_link}/post/${post.permalink}/edit`);
  }

  async function handleDelete() {
    setModalDisabled(true);
    await api.patch(`/api/post/delete/${post.id}/`);
    setModalDisabled(false);
    close();
    notifyDeleteSuccess();
    refreshPosts();
    postDetailPage && navigate(-1);
  }

  function refreshPosts() {
    queryClient.invalidateQueries({ queryKey: ["posts-home"] });
    queryClient.invalidateQueries({ queryKey: ["posts-explore"] });
    queryClient.invalidateQueries({ queryKey: ["posts-all"] });
    queryClient.invalidateQueries({
      queryKey: [`posts-community-${post.community_link}`],
    });
    queryClient.invalidateQueries({ queryKey: [`useractivity-${username}`] });
    queryClient.invalidateQueries({ queryKey: [`userposts-${username}`] });
    queryClient.invalidateQueries({ queryKey: [`usercomments-${username}`] });
    queryClient.invalidateQueries({ queryKey: [`usersaved`] });
    queryClient.invalidateQueries({ queryKey: [`userupvoted`] });
    queryClient.invalidateQueries({ queryKey: [`userdownvoted`] });
  }

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

  async function handleCopyLink() {
    const parsedUrl = new URL(path);
    const baseUrl = parsedUrl.protocol + "//" + parsedUrl.host;
    const link = `${baseUrl}/c/${post.community_link}/post/${post.permalink}`;

    try {
      await navigator.clipboard.writeText(link);
      notifyCopySuccess();
    } catch {
      notifyCopyFail();
    }
  }

  function handleReport() {
    window.open(`https://t.me/diagonaluz`);
  }

  return (
    <>
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
          className="content-menuitem flex gap-2 items-center cursor-pointer rounded-lg text-white mb-2"
        >
          {saved ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
          <span>
            {saved
              ? content_options.menu_items.remove_save[language]
              : content_options.menu_items.save[language]}
          </span>
        </MenuItem>
        {user?.user_id === post.user ? (
          <>
            {post.type === "text" && (
              <MenuItem
                onClick={handleEdit}
                className="my-2 content-menuitem flex gap-2 items-center cursor-pointer rounded-lg text-white"
              >
                <FaEdit size={20} />
                <span>{content_options.menu_items.edit[language]}</span>
              </MenuItem>
            )}
            <MenuItem
              onClick={() => {
                setModalTitle("Report");
                setModalContent(
                  <>
                    <div className="text-lg xs:text-xl mb-4">
                      {content_options.delete_modal.text[language]}
                    </div>
                    <div className="flex justify-center items-center gap-4">
                      <Button
                        size="md"
                        variant="default"
                        radius={12}
                        disabled={modalDisabled}
                        onClick={close}
                      >
                        {content_options.delete_modal.cancel[language]}
                      </Button>
                      <Button
                        size="md"
                        variant="default"
                        radius={12}
                        disabled={modalDisabled}
                        onClick={handleDelete}
                        className="text-red-400"
                      >
                        {content_options.delete_modal.delete[language]}
                      </Button>
                    </div>
                  </>
                );
                open();
              }}
              className="mt-2 content-menuitem flex gap-2 items-center cursor-pointer rounded-lg text-white"
            >
              <FaRegTrashAlt size={20} />
              <span>{content_options.menu_items.delete[language]}</span>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            onClick={() => {
              setModalTitle(content_options.report_modal.title[language]);
              setModalContent(
                <>
                  <div className="xs:text-lg mb-4">
                    {content_options.report_modal.text[language]}
                  </div>
                  <div className="flex justify-center items-center gap-4">
                    <Button
                      size="md"
                      variant="default"
                      radius={12}
                      disabled={modalDisabled}
                      onClick={handleCopyLink}
                    >
                      {content_options.report_modal.copy_link[language]}
                    </Button>
                    <Button
                      size="md"
                      variant="default"
                      radius={12}
                      disabled={modalDisabled}
                      onClick={handleReport}
                    >
                      {content_options.report_modal.report[language]}
                    </Button>
                  </div>
                </>
              );
              open();
            }}
            className="mt-2 content-menuitem flex gap-2 items-center cursor-pointer rounded-lg text-white"
          >
            <FaRegFlag size={20} />
            <span>{content_options.menu_items.report[language]}</span>
          </MenuItem>
        )}
      </Menu>
      <Modal
        size="lg"
        opened={opened}
        onClose={close}
        centered
        radius={16}
        title={modalTitle}
        closeOnClickOutside={!modalDisabled}
        closeOnEscape={!modalDisabled}
      >
        {modalContent}
      </Modal>
    </>
  );
}

const content_options = {
  menu_items: {
    save: {
      uz: "Saqlash",
      en: "Save",
      ru: "(неопределенный)",
    },
    remove_save: {
      uz: "Saqlanganlardan olib tashlash",
      en: "Remove from saved",
      ru: "(неопределенный)",
    },
    edit: {
      uz: "Tahrirlash",
      en: "Edit",
      ru: "Edit",
    },
    delete: {
      uz: "O'chirish",
      en: "Delete",
      ru: "Delete",
    },
    report: {
      uz: "Shikoyat qilish",
      en: "Report",
      ru: "(неопределенный)",
    },
  },
  toast: {
    saved: {
      uz: "Post saqlanganlarga qo'shildi",
      en: "Post has been added to your saved list",
      ru: "Post has been added to your saved list",
    },
    unsaved: {
      uz: "Post saqlanganlardan olib tashlandi",
      en: "Post has been removed from your saved list",
      ru: "Post has been removed from your saved list",
    },
    deleted: {
      uz: "Post o'chirildi",
      en: "Post was deleted",
      ru: "Post was deleted",
    },
    unauthorized: {
      uz: "Postni saqlash uchun hisobingizga kiring",
      en: "You must be logged in to save posts",
      ru: "You must be logged in to save posts",
    },
  },
  delete_modal: {
    text: {
      uz: `Rostdan ham postni o'chirishni xohlaysizmi? Keyin uni qayta
          tiklash iloji bo'lmaydi.`,
      en: `Are you sure you want to delete this post? This action cannot be
          undone.`,
      ru: `Are you sure you want to delete this post? This action cannot be
          undone.`,
    },
    cancel: {
      uz: "Bekor qilish",
      en: "Cancel",
      ru: "Cancel",
    },
    delete: {
      uz: "O'chirish",
      en: "Delete",
      ru: "Delete",
    },
  },
  report_modal: {
    title: {
      uz: "Shikoyat yo'llash",
      en: "Post report",
      ru: "Post report",
    },
    text: {
      uz: `Ushbu post ustidan shikoyat yo'llash uchun "Nusxalash" tugmasi yordamida
          uning havolasini nusxalang. Keyin "Shikoyat" tugmasini bosish orqali,
          Diagonal.uz Telegram akkountiga o'ting. Shu akkountga nusxalangan havolani
          va shikoyat mazmunini yo'llang. Biz yo'llanmagizni iloji boricha tezroq
          ko'rib chiqishga harakat qilamiz.`,
      en: `In order to report the post, you must first copy its link using the
          "Copy link" button below. Then click "Report", which takes you to the
          Diagonal.uz Telegram account. Send the copied link and the reason for
          reporting the post to that account. We will look at it as soon as possible.`,
      ru: `In order to report the post, you must first copy its link using the
          "Copy link" button below. Then click "Report", which takes you to the
          Diagonal.uz Telegram account. Send the copied link and the reason for
          reporting the post to that account. We will look at it as soon as possible.`,
    },
    copy_link: {
      uz: "Nusxalash",
      en: "Copy link",
      ru: "Copy link",
    },
    report: {
      uz: "Shikoyat",
      en: "Report",
      ru: "Report",
    },
  },
};

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
