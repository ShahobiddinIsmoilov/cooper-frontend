import { CommentProps } from "../../../interfaces/commentProps";
import UserCommentHeader from "./UserCommentHeader";
import UserCommentFooter from "./UserCommentFooter";
import ReactHtmlParser from "react-html-parser";
import { Flex } from "@mantine/core";

interface UserCommentCardProps {
  comment: CommentProps;
}

export default function UserCommentCard({ comment }: UserCommentCardProps) {
  return (
    <div className="py-4 px-5">
      <UserCommentHeader comment={comment} />
      <Flex gap={0}>
        <div className="w-[32px] min-w-[32px]" />
        <div className="mt-2 ml-2">
          <div className="post-detail max-w-[674px] overflow-hidden break-words">
            {ReactHtmlParser(comment.body)}
          </div>
          <UserCommentFooter comment={comment} />
        </div>
      </Flex>
    </div>
  );
}
