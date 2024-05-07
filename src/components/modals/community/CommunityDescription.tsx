import { Textarea } from "@mantine/core";
import { useLanguage } from "../../../contexts/LanguageContext";
import { community } from "../lang_modals";
import { useMediaQuery } from "@mantine/hooks";

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
  const isMobile = useMediaQuery("(max-width: 50em)");

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
        data-autofocus
        autosize
        placeholder={community.description[language]}
        size={isMobile ? "md" : "lg"}
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
