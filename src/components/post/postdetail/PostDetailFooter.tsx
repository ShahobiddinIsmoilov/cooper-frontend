import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { useWindowSize } from "../../../contexts/WindowSizeContext";
import { useState } from "react";
import { PostProps } from "../../../interfaces/postProps";
import { Slide, toast } from "react-toastify";
import { useAuthContext } from "../../../contexts/AuthContext";
import { postcard } from "../lang_post";
import { useLanguage } from "../../../contexts/LanguageContext";
import useCredentials from "../../../services/useCredentials";
import PostOptions from "../../general/PostOptions";

interface Props {
  post: PostProps;
}

export default function PostDetailFooter({ post }: Props) {
  const { screenWidth } = useWindowSize();
  const [upvoted, setUpvoted] = useState(post.upvoted);
  const [downvoted, setDownvoted] = useState(post.downvoted);
  const [upvoteCount, setUpvoteCount] = useState(post.upvotes);
  const [downvoteCount, setDownvoteCount] = useState(post.downvotes);
  const [disabled, setDisabled] = useState(false);
  const { language } = useLanguage();
  const { user } = useAuthContext();
  const api = useCredentials();

  const notifyNotAuthenticated = () =>
    toast.error(toast_unauthorized[language], {
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

  async function handleUpvote() {
    if (user) {
      setDisabled(true);
      let newUpvoteCount = upvoteCount;
      if (upvoted) {
        newUpvoteCount -= 1;
      } else if (downvoted) {
        newUpvoteCount += 1;
        setDownvoteCount(downvoteCount - 1);
      } else {
        newUpvoteCount += 1;
      }
      setUpvoteCount(newUpvoteCount);
      setUpvoted(!upvoted);
      setDownvoted(false);
      await api.post("/api/post/action/", {
        action: upvoted ? "undo_upvote" : "upvote",
        post: post.id,
      });
      setDisabled(false);
    } else {
      notifyNotAuthenticated();
    }
  }

  async function handleDownvote() {
    if (user) {
      setDisabled(true);
      let newDownvotes = downvoteCount;
      if (downvoted) {
        newDownvotes -= 1;
      } else if (upvoted) {
        newDownvotes += 1;
        setUpvoteCount(upvoteCount - 1);
      } else {
        newDownvotes += 1;
      }
      setDownvoteCount(newDownvotes);
      setDownvoted(!downvoted);
      setUpvoted(false);
      await api.post("/api/post/action/", {
        action: downvoted ? "undo_downvote" : "downvote",
        post: post.id,
      });
      setDisabled(false);
    } else {
      notifyNotAuthenticated();
    }
  }

  return (
    <div className="flex justify-between items-center mt-2">
      <div className="flex items-center gap-1 xs:gap-4">
        <div className="flex items-center xs:gap-1 bg-dark-900 xs:bg-transparent rounded-full">
          <button
            disabled={disabled}
            onClick={handleUpvote}
            className={`p-2 rounded-full cursor-pointer hover:bg-dark-700 text-yellow-400 hover:text-green-400`}
          >
            {upvoted ? (
              <BiSolidLike className={`text-lg xs:text-2xl text-green-400`} />
            ) : (
              <BiLike className={`text-lg xs:text-2xl`} />
            )}
          </button>
          <span className="text-green-400 text-sm xs:text-lg font-bold">
            {upvoteCount}
          </span>
          <button
            disabled={disabled}
            onClick={handleDownvote}
            className="p-2 ml-2 rounded-full cursor-pointer hover:bg-dark-700 text-yellow-400 hover:text-red-400"
          >
            {downvoted ? (
              <BiSolidDislike className={`text-lg xs:text-2xl text-red-400`} />
            ) : (
              <BiDislike className={`text-lg xs:text-2xl`} />
            )}
          </button>
          <span className="text-red-400 text-sm xs:text-lg font-bold mr-3">
            {downvoteCount}
          </span>
        </div>
        <div className="py-[7px] px-3 rounded-full cursor-pointer flex bg-dark-900 xs:bg-transparent items-center hover:bg-dark-700 text-white gap-2">
          <FaComment className="xs:text-xl" />
          <span className="text-sm xs:text-lg text-cyan-400 font-bold">
            {screenWidth < 576
              ? post?.comments.toLocaleString()
              : post?.comments === 1
              ? postcard.post_footer.comments_one[language]
              : post?.comments.toLocaleString() +
                postcard.post_footer.comments[language]}
          </span>
        </div>
      </div>
      <PostOptions post={post} bg="700" postDetailPage={true} />
    </div>
  );
}

const toast_unauthorized = {
  uz: "Postga reaksiya bildirish uchun hisobingizga kiring",
  en: "You must be logged in to react to a post",
  ru: "You must be logged in to react to a post",
};
