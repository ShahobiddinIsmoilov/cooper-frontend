import { useWindowSize } from "../../../contexts/WindowSizeContext";
import { CommentProps } from "../../../interfaces/commentProps";
import UserCommentHeader from "./UserCommentHeader";
import UserCommentFooter from "./UserCommentFooter";
import ReactHtmlParser from "react-html-parser";

interface UserCommentCardProps {
  comment: CommentProps;
}

export default function UserCommentCard({ comment }: UserCommentCardProps) {
  const { screenWidth } = useWindowSize();

  return (
    <div
      className={`overflow-hidden ${
        screenWidth >= 768 ? "max-w-3xl" : "w-screen"
      }`}
    >
      <div className="py-4 px-5">
        <UserCommentHeader comment={comment} />
        <div className="flex">
          <div className="w-[32px] min-w-[32px]" />
          <div className="mt-2 ml-2">
            <div
              className={`post-detail break-words ${
                screenWidth >= 768
                  ? "max-w-[736px]"
                  : `max-w-[${String(screenWidth - 40)}px]`
              }`}
            >
              {ReactHtmlParser(comment.body)}
            </div>
            <UserCommentFooter comment={comment} />
          </div>
        </div>
      </div>
    </div>
  );
}
