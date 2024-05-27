import { Button } from "@mantine/core";
import { ImSpinner4 } from "react-icons/im";
import { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PostProps } from "../../../interfaces/postProps";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FancyTextEditor from "../../modals/post/FancyTextEditor";
import useCredentials from "../../../services/useCredentials";
import PostDetailFooter from "./PostDetailFooter";
import PostDetailHeader from "./PostDetailHeader";
import Line from "../../../utils/Line";

interface PostDetailProps {
  post: PostProps;
}

export default function PostEdit({ post }: PostDetailProps) {
  const user = useAuthContext().user?.user_id;
  const navigate = useNavigate();

  useEffect(() => {
    user !== post.user &&
      navigate(`/c/${post.community}/post/${post.permalink}`);
  }, []);

  const api = useCredentials();
  const queryClient = useQueryClient();
  const [editedBody, setEditedBody] = useState(post.body_text);
  const [editedHTMLbody, setEditedHTMLbody] = useState(post.body);
  const [formDisabled, setFormDisabled] = useState(false);
  const { language } = useLanguage();

  function handleCancel() {
    navigate(-1);
  }

  const notifyUpdateSuccess = () =>
    toast.success(post_update.toast.success[language], {
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

  const notifyUpdateFail = () =>
    toast.error(post_update.toast.fail[language], {
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

  const notifyNoChange = () =>
    toast.info(post_update.toast.no_change[language], {
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

  const mutation = useMutation({
    mutationFn: (editedPost: {}) =>
      api.patch(`/api/post/update/${post.id}/`, editedPost),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`post-detail-${post.permalink}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`post-detail-${post.permalink}`],
      });
      setFormDisabled(false);
      notifyUpdateSuccess();
      refresh();
      navigate(-1);
    },
    onError: () => {
      setFormDisabled(false);
      notifyUpdateFail();
    },
  });

  async function refresh() {
    queryClient.invalidateQueries({ queryKey: ["posts-home"] });
    queryClient.invalidateQueries({ queryKey: ["posts-explore"] });
    queryClient.invalidateQueries({ queryKey: ["posts-all"] });
    queryClient.invalidateQueries({
      queryKey: [`posts-community-${post.community_link}`],
    });
  }

  async function handleSave() {
    if (editedHTMLbody === post.body) {
      notifyNoChange();
      navigate(-1);
    } else {
      const editedPost = {
        body: editedHTMLbody,
        body_text: editedBody,
        edited: true,
      };
      setFormDisabled(true);
      mutation.mutate(editedPost);
    }
  }

  return (
    <div className="my-2 mx-4 max-w-3xl">
      <PostDetailHeader post={post} />
      <div className="text-lg xs:text-xl font-bold text-white mt-3 mb-4 leading-snug xs:leading-normal break-words">
        {post.title}
      </div>
      <FancyTextEditor
        content={editedHTMLbody}
        setBody={setEditedBody}
        setHTMLbody={setEditedHTMLbody}
        formDisabled={formDisabled}
      />
      <div className="flex justify-end gap-2 py-2">
        <Button
          onClick={handleCancel}
          variant="default"
          radius={12}
          disabled={formDisabled}
        >
          {post_update.buttons.cancel[language]}
        </Button>
        <Button
          onClick={handleSave}
          radius={12}
          disabled={formDisabled}
          className={
            formDisabled ? "button-primary-disabled" : "button-primary"
          }
        >
          {post_update.buttons.save[language]}
          {formDisabled && <ImSpinner4 className="ml-2 animate-spin" />}
        </Button>
      </div>
      <div className="mt-2">
        <Line />
      </div>
      <PostDetailFooter post={post} />
    </div>
  );
}

const post_update = {
  buttons: {
    cancel: {
      uz: "Bekor qilish",
      en: "Cancel",
      ru: "Cancel",
    },
    save: {
      uz: "Saqlash",
      en: "Save",
      ru: "Save",
    },
  },
  toast: {
    success: {
      uz: "O'zgartirishlar saqlandi",
      en: "Changes were saved",
      ru: "Changes were saved",
    },
    fail: {
      uz: "O'zgartirishlarni saqlashda nimadir xato ketdi",
      en: "Changes could not be saved",
      ru: "Changes could not be saved",
    },
    no_change: {
      uz: "Post o'zgartirilmadi",
      en: "Post was not changed",
      ru: "Post was not changed",
    },
  },
};
