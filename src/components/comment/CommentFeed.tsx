import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useComments } from "../../contexts/CommentContext";

export default function CommentFeed() {
  const { getReplies, post } = useComments();
  const rootComments = getReplies(0);

  return (
    <div id="comment-feed" className="mb-12 max-w-3xl">
      <CommentForm post={post} parent={0} placeholder="Add a comment" />
      {rootComments != null && rootComments.length > 0 ? (
        <CommentList comments={rootComments} />
      ) : (
        <p className="text-white opacity-25 text-center text-lg">
          Nobody commented yet
        </p>
      )}
    </div>
  );
}
