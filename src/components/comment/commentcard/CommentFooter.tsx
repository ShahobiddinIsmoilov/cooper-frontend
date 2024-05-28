import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { FaReply } from "react-icons/fa6";
import { CommentProps } from "../../../interfaces/commentProps";
import { useWindowSize } from "../../../contexts/WindowSizeContext";
import { useState } from "react";
import { Slide, toast } from "react-toastify";
import { useAuthContext } from "../../../contexts/AuthContext";
import useCredentials from "../../../services/useCredentials";

interface CommentCardProps {
  comment: CommentProps;
  replyCount: number;
  setShowReply: (value: boolean) => void;
}

export default function CommentFooter({
  comment,
  replyCount,
  setShowReply,
}: CommentCardProps) {
  const { screenWidth } = useWindowSize();
  const [upvoted, setUpvoted] = useState(comment.upvoted);
  const [downvoted, setDownvoted] = useState(comment.downvoted);
  const [votes, setVotes] = useState(comment.votes);
  const { user } = useAuthContext();
  const api = useCredentials();

  const notifyNotAuthenticated = () =>
    toast.error("Fikrga reaksiya bildirish uchun hisobingizga kiring", {
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
      api.post("/api/comment/action/", {
        action: "upvote",
        comment: comment.id,
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
      api.post("/api/comment/action/", {
        action: "downvote",
        comment: comment.id,
      });
    } else {
      notifyNotAuthenticated();
    }
  }

  return (
    <div className="flex mt-1 xs:mt-2 ml-2 xs:ml-4">
      <div className="flex items-center gap-1 xs:gap-2">
        <div
          onClick={handleUpvote}
          className="p-1 rounded-full cursor-pointer hover:bg-dark-700 text-yellow-400 hover:text-green-400"
        >
          {upvoted ? (
            <BiSolidLike className={`xs:text-lg text-green-400`} />
          ) : (
            <BiLike className="xs:text-lg" />
          )}
        </div>
        <span className="font-bold">{votes}</span>
        <div
          onClick={handleDownvote}
          className="p-1 rounded-full cursor-pointer hover:bg-dark-700 text-yellow-400 hover:text-red-400"
        >
          {downvoted ? (
            <BiSolidDislike className={`xs:text-lg text-red-400`} />
          ) : (
            <BiDislike className="xs:text-lg" />
          )}
        </div>
        {comment.user && !comment.deleted && (
          <button
            onClick={() => setShowReply(true)}
            className="font-bold xs:ml-4 px-2 py-1 rounded-full text-xs xs:text-sm hover:bg-dark-700 cursor-pointer text-sky-300"
          >
            Reply
          </button>
        )}
        {replyCount > 0 && (
          <div className="text-xs xs:text-sm font-bold opacity-50 flex items-center gap-1 xs:gap-2 xs:px-2">
            <FaReply />
            {replyCount}
            {screenWidth > 576 ? (replyCount > 1 ? " replies" : " reply") : ""}
          </div>
        )}
      </div>
    </div>
  );
}
