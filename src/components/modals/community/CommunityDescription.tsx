import { Textarea } from "@mantine/core";
import { useLanguage } from "../../../contexts/LanguageContext";
import { community } from "../lang_modals";
import { useWindowSize } from "../../../contexts/WindowSizeContext";

interface PostTitleProps {
  description: string;
  setDescription: (title: string) => void;
  formDisabled: boolean;
}

export default function CommunityDescription({
  description,
  setDescription,
  formDisabled,
}: PostTitleProps) {
  const { language } = useLanguage();
  const isSmall = useWindowSize().screenWidth < 768;

  return (
    <div>
      <Textarea
        onKeyDown={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
        onChange={(e) => setDescription(e.target.value)}
        readOnly={formDisabled}
        variant="unstyled"
        maxLength={500}
        bg={"dark"}
        autosize
        placeholder={community.description[language]}
        size={isSmall ? "md" : "lg"}
        className="flex-grow border border-[#424242] rounded-[4px] px-3 sm:px-4"
      />
      <span
        className={`opacity-75 inline-block w-full text-end text-sm sm:text-base`}
      >
        {description.length}/500
      </span>
    </div>
  );
}
