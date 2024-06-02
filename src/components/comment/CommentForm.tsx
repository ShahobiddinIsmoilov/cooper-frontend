import { useState } from "react";
import { Button, Stack } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useComments } from "../../contexts/CommentContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { Slide, toast } from "react-toastify";
import { useLanguage } from "../../contexts/LanguageContext";
import FancyCommentEditor from "./FancyCommentEditor";
import useCredentials from "../../services/useCredentials";

interface CommentFormProps {
  post: number;
  parent: number;
  placeholder?: string;
  autofocus?: boolean;
  setShowReply?: (value: boolean) => void;
}

export default function CommentForm({
  parent,
  placeholder,
  autofocus,
  setShowReply,
}: CommentFormProps) {
  const { community, post } = useComments();
  const [HTMLComment, setHTMLComment] = useState("");
  const [controlsVisible, setControlsVisible] = useState(false);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const [clearForm, setClearForm] = useState(false);
  const { user } = useAuthContext();
  const { language } = useLanguage();
  const api = useCredentials();

  const mutatation = useMutation({
    mutationFn: (newComment: {}) =>
      api.post("/api/comment/create/", newComment),
    onSuccess: () => {
      handleCancel();
    },
  });

  const notifyNotAuthenticated = () =>
    toast.error(comment.toast[language], {
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

  function handleCancel() {
    setControlsVisible(false);
    setToolbarVisible(false);
    setHTMLComment("");
    setClearForm(true);
    setShowReply && setShowReply(false);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    if (user) {
      setFormDisabled(true);
      const newComment = {
        post: post,
        community: community,
        parent: parent === 0 ? null : parent,
        body: HTMLComment,
      };
      mutatation.mutate(newComment);
    } else {
      notifyNotAuthenticated();
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Stack gap={0} className="bg-dark-850 rounded-xl my-4 border border-line">
        <FancyCommentEditor
          setHTMLComment={setHTMLComment}
          formDisabled={formDisabled}
          setControlsVisible={setControlsVisible}
          toolbarVisible={toolbarVisible}
          clearForm={clearForm}
          placeholder={placeholder}
          autofocus={autofocus}
          setClearForm={setClearForm}
        />
        {controlsVisible && (
          <div className="flex justify-between m-1">
            <Button
              onClick={() => setToolbarVisible(!toolbarVisible)}
              className="text-blue-400/75 hover:text-blue-300/75 bg-transparent hover:bg-transparent h-8 rounded-full px-2"
            >
              {comment.toolbar[language]}
            </Button>
            <span>
              <Button
                onClick={handleCancel}
                className="bg-transparent hover:bg-dark-700 rounded-full mr-2 px-2 opacity-50 hover:opacity-100"
              >
                {comment.cancel[language]}
              </Button>
              <Button
                type="submit"
                className="bg-cyan-700 hover:bg-cyan-600 rounded-full px-2"
              >
                {comment.post[language]}
              </Button>
            </span>
          </div>
        )}
      </Stack>
    </form>
  );
}

const comment = {
  toolbar: {
    uz: "Formatlash",
    en: "Formatting",
    ru: "Formatting",
  },
  cancel: {
    uz: "Bekor qilish",
    en: "Cancel",
    ru: "Add a comment",
  },
  post: {
    uz: "Joylash",
    en: "Comment",
    ru: "Comment",
  },
  toast: {
    uz: "Firk bildirish uchun hisobingizga kiring",
    en: "You must be logged in to comment",
    ru: "You must be logged in to comment",
  },
};
