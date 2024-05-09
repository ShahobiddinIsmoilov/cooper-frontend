import { Textarea } from "@mantine/core";
import { useState } from "react";
import { post } from "../lang_modals";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useWindowSize } from "../../../contexts/WindowSizeContext";
import validator from "validator";
import LinkPreview from "../../general/LinkPreview";

interface Props {
  link: string;
  title: string;
  formDisabled: boolean;
  setLink: (link: string) => void;
  setTitle: (title: string) => void;
  titleChanged: boolean;
}

export default function LinkInput({
  link,
  setLink,
  title,
  setTitle,
  titleChanged,
  formDisabled,
}: Props) {
  const [isUrl, setIsUrl] = useState(false);
  const [showIncorrectUrlError, setShowIncorrectUrlError] = useState(false);
  const { language } = useLanguage();
  const isSmall = useWindowSize().screenWidth < 768;

  function validateUrl(url: string) {
    if (validator.isURL(url)) {
      setIsUrl(true);
      if (!url.startsWith("www") && !url.startsWith("http")) url = "www." + url;
      if (!url.startsWith("http")) url = "https://" + url;
      setLink(url);
    } else {
      setIsUrl(false);
      if (url !== "") {
        setShowIncorrectUrlError(true);
      } else {
        setShowIncorrectUrlError(false);
      }
    }
  }

  return (
    <>
      <Textarea
        onKeyDown={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
        onChange={(e) => validateUrl(e.target.value)}
        readOnly={formDisabled}
        variant="unstyled"
        maxLength={200}
        bg={"dark"}
        data-autofocus
        autosize
        placeholder={post.linkpost_placeholder[language]}
        size={isSmall ? "md" : "lg"}
        className="border border-[#424242] rounded-[4px] px-4 read-only:"
      />
      {isUrl ? (
        <LinkPreview
          link={link}
          title={title}
          setTitle={setTitle}
          titleChanged={titleChanged}
        />
      ) : (
        showIncorrectUrlError && (
          <span className="text-red-400 text-sm sm:text-base">
            {post.linkpost_incorrect_url[language]}
          </span>
        )
      )}
    </>
  );
}
