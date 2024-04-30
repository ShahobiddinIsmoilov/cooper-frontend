import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { CommentProps } from "../../../interfaces/commentProps";
import UserLink from "../../general/UserLink";
import UserLinkAvatar from "../../general/UserLinkAvatar";

interface CommentCardProps {
  comment: CommentProps;
  hidden: boolean;
  setHidden: (bool: boolean) => void;
}

function CommentHeader({ comment, hidden, setHidden }: CommentCardProps) {
  return (
    <div className="flex items-center">
      <button className="cursor-pointer mr-2">
        {hidden ? (
          <CiSquarePlus
            className="text-xl xs:text-2xl"
            onClick={() => {
              setHidden(false);
            }}
          />
        ) : (
          <CiSquareMinus
            className="text-xl xs:text-2xl"
            onClick={() => {
              setHidden(true);
            }}
          />
        )}
      </button>
      <div className="text-xs xs:text-base flex items-center gap-1" id="fucker">
        <UserLinkAvatar username={comment.username} avatar={comment.avatar} />
        <UserLink username={comment.username} />
        <span className="opacity-50 text-sm"> ∙ 15 daqiqa oldin </span>
      </div>
    </div>
  );
}

export default CommentHeader;
