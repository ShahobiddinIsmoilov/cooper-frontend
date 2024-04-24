import { useState } from "react";
import { CommentProps } from "../../../interfaces/commentProps";
import { useComments } from "../../../contexts/CommentContext";
import CommentHeader from "./CommentHeader";
import CommentFooter from "./CommentFooter";
import CommentList from "../CommentList";
import ReactHtmlParser from "react-html-parser";
import CommentForm from "../CommentForm";

interface CommentCardProps {
  comment: CommentProps;
  last: boolean;
}

export default function CommentCard({ comment, last }: CommentCardProps) {
  const { getReplies } = useComments();
  const replies = getReplies(comment.id);
  const [hidden, setHidden] = useState(false);
  const { post_id } = useComments();
  const [showReply, setShowReply] = useState(false);

  // WARNING: UNINTELLIGIBLE CODE AHEAD!
  return (
    <div className="flex text-white">
      <div
        className={`w-[1px] ${last && "h-8"} bg-white ${
          comment.parent > 0 ? "ml-8 opacity-25" : "opacity-0"
        }`}
      />
      <div className="w-full">
        <div className="flex">
          {comment.parent > 0 && <hr className="w-4 min-w-4 mt-8 opacity-25" />}
          <div className="w-full border border-solid border-white border-opacity-25 p-2 mt-2 bg-dark-850 rounded-xl">
            <CommentHeader
              comment={comment}
              hidden={hidden}
              setHidden={setHidden}
            />
            <div className="flex">
              <div className="overflow-hidden">
                {!hidden && (
                  <div className="post-detail mx-2 xs:mx-4 mt-2">
                    {ReactHtmlParser(comment.body)}
                  </div>
                )}
                {!hidden && (
                  <CommentFooter
                    comment={comment}
                    replyCount={replies && replies.length}
                    setShowReply={setShowReply}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="ml-10">
          {showReply && (
            <CommentForm
              post={post_id}
              parent={comment.id}
              parent_user={comment.user}
              parent_username={comment.username}
              setShowReply={setShowReply}
              autofocus={true}
            />
          )}
        </div>
        {replies && replies.length > 0 && (
          <div className={`flex ${hidden ? "hidden" : ""}`}>
            <CommentList comments={replies} />
          </div>
        )}
      </div>
    </div>
  );
}
