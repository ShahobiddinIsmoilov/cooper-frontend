import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { CommentProps } from "../../../interfaces/commentProps";
import { BsDot } from "react-icons/bs";
import { useLanguage } from "../../../contexts/LanguageContext";
import UserLink from "../../general/UserLink";
import UserLinkAvatar from "../../general/UserLinkAvatar";
import TimeDisplay from "../../general/TimeDisplay";

interface CommentCardProps {
  comment: CommentProps;
  hidden: boolean;
  setHidden: (bool: boolean) => void;
}

function CommentHeader({ comment, hidden, setHidden }: CommentCardProps) {
  const { language } = useLanguage();

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
      {!comment.user ? (
        <span className="text-white/50 text-sm xs:text-base">
          {deleted.account[language]}
        </span>
      ) : comment.deleted ? (
        <span className="text-white/50 text-sm xs:text-base">
          {deleted.comment[language]}
        </span>
      ) : (
        <div
          className="text-sm xs:text-base flex items-center gap-1"
          id="fucker"
        >
          <UserLinkAvatar username={comment.username} avatar={comment.avatar} />
          <UserLink username={comment.username} />
          <span className="text-sm xs:text-base text-white/50 -ml-1 text-nowrap">
            <BsDot className="inline-block" />
            <TimeDisplay time={comment.created_at} />
          </span>
        </div>
      )}
    </div>
  );
}

export default CommentHeader;

const deleted = {
  account: {
    uz: "[hisob o'chirilgan]",
    en: "[deleted account]",
    ru: "[deleted account]",
  },
  comment: {
    uz: "[fikr o'chirilgan]",
    en: "[deleted comment]",
    ru: "[deleted comment]",
  },
};
