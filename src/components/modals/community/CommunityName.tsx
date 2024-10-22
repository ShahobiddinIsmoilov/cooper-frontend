import { Textarea } from "@mantine/core";
import { useLanguage } from "../../../contexts/LanguageContext";
import { community } from "../lang_modals";
import { useWindowSize } from "../../../contexts/WindowSizeContext";

interface PostTitleProps {
  name: string;
  setName: (title: string) => void;
  formDisabled: boolean;
}

export default function CommunityName({
  name,
  setName,
  formDisabled,
}: PostTitleProps) {
  const { language } = useLanguage();
  const isSmall = useWindowSize().screenWidth < 768;

  function handleSpaces(s: string) {
    s = s.replace(/\s\s+/g, " ");
    return s;
  }

  return (
    <div>
      <Textarea
        onKeyDown={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
        onChange={(e) => setName(handleSpaces(e.target.value))}
        readOnly={formDisabled}
        variant="unstyled"
        maxLength={32}
        bg={"dark"}
        value={name}
        autosize
        placeholder={community.name[language]}
        size={isSmall ? "md" : "lg"}
        className="flex-grow border border-line rounded-[4px] px-3 sm:px-4"
      />
      <span
        className={`opacity-75 inline-block w-full text-end text-sm sm:text-base`}
      >
        {name.length}/32
      </span>
    </div>
  );
}
