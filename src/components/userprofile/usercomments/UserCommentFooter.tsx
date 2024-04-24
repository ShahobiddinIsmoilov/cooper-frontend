import { BiDislike, BiLike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { CommentProps } from "../../../interfaces/commentProps";
import { useState } from "react";
import useCredentials from "../../../services/useCredentials";

interface CommentCardProps {
  comment: CommentProps;
}

export default function CommentFooter({ comment }: CommentCardProps) {
  const [upvoted, setUpvoted] = useState(comment.upvoted);
  const [downvoted, setDownvoted] = useState(comment.downvoted);
  const [votes, setVotes] = useState(comment.votes);
  const api = useCredentials();

  function handleUpvote() {
    setVotes((votes) => (downvoted ? votes + 2 : votes + 1));
    setUpvoted(true);
    setDownvoted(false);
    api.post("/api/comment/action/", {
      action: "upvote",
      comment: comment.id,
    });
  }

  function handleDownvote() {
    setVotes((votes) => (upvoted ? votes - 2 : votes - 1));
    setDownvoted(true);
    setUpvoted(false);
    api.post("/api/comment/action/", {
      action: "downvote",
      comment: comment.id,
    });
  }

  return (
    <div className="flex items-center gap-1 xs:gap-2 mt-1 xs:mt-2">
      <div
        onClick={handleUpvote}
        className="p-1 rounded-full cursor-pointer hover:bg-dark-700 text-yellow-400 hover:text-green-400"
      >
        {upvoted ? (
          <BiSolidLike className="text-green-400" />
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
          <BiSolidDislike className="text-red-400" />
        ) : (
          <BiDislike className="xs:text-lg" />
        )}
      </div>
    </div>
  );
}
