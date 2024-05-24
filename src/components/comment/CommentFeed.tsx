import { useComments } from "../../contexts/CommentContext";
import { useLanguage } from "../../contexts/LanguageContext";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function CommentFeed() {
  const { language } = useLanguage();
  const { getReplies, post } = useComments();
  const rootComments = getReplies(0);

  return (
    <div id="comment-feed" className="mb-12 max-w-3xl overflow-x-scroll">
      <CommentForm
        post={post}
        parent={0}
        placeholder={lang.placeholder[language]}
      />
      {rootComments != null && rootComments.length > 0 ? (
        <CommentList comments={rootComments} />
      ) : (
        <p className="text-white opacity-25 text-center text-lg">
          {lang.no_comment[language]}
        </p>
      )}
    </div>
  );
}

const lang = {
  no_comment: {
    uz: "Hali fikr bildirilmagan",
    en: "Nobody commented yet",
    ru: "Nobody commented yet",
  },
  placeholder: {
    uz: "Fikr bildiring",
    en: "Add a comment",
    ru: "Add a comment",
  },
};
