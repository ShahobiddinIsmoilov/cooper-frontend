import CommentCard from "./commentcard/CommentCard";
import { CommentProps } from "../../interfaces/commentProps";
import { Stack } from "@mantine/core";

interface CommentListProps {
  comments: CommentProps[];
}

function CommentList({ comments }: CommentListProps) {
  const len = comments.length;
  let count = 0;

  return (
    <Stack gap={0} w={"100%"}>
      {comments?.length > 0 &&
        comments.map((comment: CommentProps) => {
          count = count + 1;
          return (
            <CommentCard
              key={comment.id}
              comment={comment}
              last={count === len ? true : false}
            />
          );
        })}
    </Stack>
  );
}

export default CommentList;
