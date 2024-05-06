import { Textarea } from "@mantine/core";
import { useLanguage } from "../../../contexts/LanguageContext";
import { community } from "../lang_modals";

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

  return (
    <div>
      <Textarea
        onKeyDown={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
        onChange={(e) => setName(e.target.value)}
        readOnly={formDisabled}
        variant="unstyled"
        maxLength={32}
        bg={"dark"}
        data-autofocus
        autosize
        placeholder={community.name[language]}
        size="lg"
        className="flex-grow border border-line rounded-[4px] px-4"
      />
      <span className={`opacity-75 inline-block w-full text-end`}>
        {name.length}/32
      </span>
    </div>
  );
}
