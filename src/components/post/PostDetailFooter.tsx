import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { useWindowSize } from "../../contexts/WindowSizeContext";
import { useState } from "react";
import { ContentOptions } from "../common/ContentOptions";
import { PostProps } from "../../interfaces/postProps";
import useCredentials from "../../services/useCredentials";

interface Props {
  post: PostProps;
}

export default function PostDetailFooter({ post }: Props) {
  const { screenWidth } = useWindowSize();
  const [upvoted, setUpvoted] = useState(post.upvoted);
  const [downvoted, setDownvoted] = useState(post.downvoted);
  const [upvoteCount, setUpvoteCount] = useState(post.upvotes);
  const [downvoteCount, setDownvoteCount] = useState(post.downvotes);
  const api = useCredentials();

  function handleUpvote() {
    setUpvoteCount((prevUpvoteCount) => prevUpvoteCount + 1);
    setDownvoteCount((prevDownvoteCount) =>
      downvoted ? prevDownvoteCount - 1 : prevDownvoteCount
    );
    setUpvoted(true);
    setDownvoted(false);
    api.post("/api/post/action/", {
      action: "upvote",
      post: post.id,
    });
  }

  function handleDownvote() {
    setDownvoteCount((prevDownvoteCount) => prevDownvoteCount + 1);
    setUpvoteCount((prevUpvoteCount) =>
      upvoted ? prevUpvoteCount - 1 : prevUpvoteCount
    );
    setDownvoted(true);
    setUpvoted(false);
    api.post("/api/post/action/", {
      action: "downvote",
      post: post.id,
    });
  }

  return (
    <div className="flex justify-between items-center mt-2">
      <div className="flex items-center gap-1 xs:gap-4">
        <div className="flex items-center xs:gap-1 bg-dark-900 xs:bg-transparent rounded-full">
          <button
            onClick={handleUpvote}
            className={`p-2 rounded-full cursor-pointer hover:bg-dark-700 text-yellow-400 hover:text-green-400`}
          >
            {upvoted ? (
              <BiSolidLike className={`text-xl xs:text-2xl text-green-400`} />
            ) : (
              <BiLike className={`text-xl xs:text-2xl`} />
            )}
          </button>
          <span className="text-green-400 xs:text-lg font-bold">
            {upvoteCount}
          </span>
          <button
            onClick={handleDownvote}
            className="p-2 ml-2 rounded-full cursor-pointer hover:bg-dark-700 text-yellow-400 hover:text-red-400"
          >
            {downvoted ? (
              <BiSolidDislike className={`text-xl xs:text-2xl text-red-400`} />
            ) : (
              <BiDislike className={`text-xl xs:text-2xl`} />
            )}
          </button>
          <span className="text-red-400 xs:text-lg font-bold mr-3">
            {downvoteCount}
          </span>
        </div>
        <div className="py-[6px] px-3 rounded-full cursor-pointer flex bg-dark-900 xs:bg-transparent items-center hover:bg-dark-700 text-white gap-2">
          <FaComment className="text-lg xs:text-xl" />
          <span className="xs:text-lg text-cyan-400 font-bold">
            {screenWidth < 576
              ? post?.comments.toLocaleString()
              : post?.comments === 1
              ? "1 comment"
              : post?.comments.toLocaleString() + " comments"}
          </span>
        </div>
      </div>
      <ContentOptions post={post} bg="700" />
    </div>
  );
}
