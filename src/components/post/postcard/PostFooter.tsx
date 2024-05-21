import { Link } from "react-router-dom";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { useWindowSize } from "../../../contexts/WindowSizeContext";
import { useState } from "react";
import { ContentOptions } from "../../general/ContentOptions";
import { PostProps } from "../../../interfaces/postProps";
import { postcard } from "../lang_post";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Slide, toast } from "react-toastify";
import useCredentials from "../../../services/useCredentials";

export interface Props {
  post: PostProps;
}

export default function PostFooter({ post }: Props) {
  const { screenWidth } = useWindowSize();
  const { language } = useLanguage();
  const { user } = useAuthContext();
  const [upvoted, setUpvoted] = useState(post.upvoted);
  const [downvoted, setDownvoted] = useState(post.downvoted);
  const [votes, setVotes] = useState(post.votes);
  const api = useCredentials();

  const notifyNotAuthenticated = () =>
    toast.error("Postga reaksiya bildirish uchun hisobingizga kiring", {
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

  function handleUpvote() {
    if (user) {
      setVotes((votes) => (downvoted ? votes + 2 : votes + 1));
      setUpvoted(true);
      setDownvoted(false);
      api.post("/api/post/action/", {
        action: "upvote",
        post: post.id,
      });
    } else {
      notifyNotAuthenticated();
    }
  }

  function handleDownvote() {
    if (user) {
      setVotes((votes) => (upvoted ? votes - 2 : votes - 1));
      setDownvoted(true);
      setUpvoted(false);
      api.post("/api/post/action/", {
        action: "downvote",
        post: post.id,
      });
    } else {
      notifyNotAuthenticated();
    }
  }

  return (
    <div className="flex justify-between items-center mt-2">
      <div className="flex items-center justify-space gap-1 xs:gap-4">
        <div className="flex items-center xs:gap-1 bg-dark-900 xs:bg-transparent rounded-full">
          <button
            onClick={handleUpvote}
            className={`p-2 rounded-full cursor-pointer hover:bg-dark-600 text-yellow-400 hover:text-green-400`}
          >
            {upvoted ? (
              <BiSolidLike className={`text-lg xs:text-2xl text-green-400`} />
            ) : (
              <BiLike className={`text-lg xs:text-2xl`} />
            )}
          </button>
          <span
            className={
              votes > 0
                ? "text-green-400 text-sm xs:text-lg font-bold"
                : votes === 0
                ? "xs:text-lg font-bold"
                : "text-red-400 text-sm xs:text-lg font-bold"
            }
          >
            {votes > 0 ? "+" + votes.toLocaleString() : votes}
          </span>
          <button
            onClick={handleDownvote}
            className="p-2 rounded-full cursor-pointer hover:bg-dark-600 text-yellow-400 hover:text-red-400"
          >
            {downvoted ? (
              <BiSolidDislike className={`text-lg xs:text-2xl text-red-400`} />
            ) : (
              <BiDislike className={`text-lg xs:text-2xl`} />
            )}
          </button>
        </div>
        <Link
          to={`/c/${post.community_link}/post/${post.permalink}`}
          className="py-[7px] px-3 rounded-full cursor-pointer flex justify-center bg-dark-900 xs:bg-transparent items-center hover:bg-dark-600 text-white gap-2"
        >
          <FaComment className="text-lg xs:text-xl" />
          <span className="text-sm xs:text-lg text-cyan-400 font-bold">
            {screenWidth < 576
              ? post?.comments.toLocaleString()
              : post?.comments === 1
              ? postcard.post_footer.comments_one[language]
              : post?.comments.toLocaleString() +
                postcard.post_footer.comments[language]}
          </span>
        </Link>
      </div>
      <ContentOptions post={post} bg="600" />
    </div>
  );
}
