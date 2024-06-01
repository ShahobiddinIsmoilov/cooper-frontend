import { Textarea } from "@mantine/core";
import { post } from "../lang_modals";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useWindowSize } from "../../../contexts/WindowSizeContext";

interface PostTitleProps {
  title: string;
  setTitle: (title: string) => void;
  setTitleChanged: (value: boolean) => void;
  formDisabled: boolean;
}

export default function PostTitle({
  title,
  setTitle,
  formDisabled,
  setTitleChanged,
}: PostTitleProps) {
  const { language } = useLanguage();
  const isSmall = useWindowSize().screenWidth < 768;

  return (
    <div>
      <Textarea
        onKeyDown={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
        onChange={(e) => {
          setTitleChanged(true);
          setTitle(e.target.value);
        }}
        value={title}
        readOnly={formDisabled}
        variant="unstyled"
        maxLength={200}
        bg={"dark"}
        autosize
        placeholder={post.title[language]}
        size={isSmall ? "md" : "lg"}
        className={`border border-line rounded-[4px] px-3 sm:px-4`}
      />
      <span
        className={`text-white/50 inline-block w-full text-end text-sm sm:text-base`}
      >
        {title.length}/200
      </span>
    </div>
  );
}
