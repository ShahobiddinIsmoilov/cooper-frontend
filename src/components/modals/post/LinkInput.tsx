import { Textarea } from "@mantine/core";
import { useState } from "react";
import validator from "validator";
import LinkPreview from "../../post/LinkPreview";

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

  function validateUrl(url: string) {
    if (validator.isURL(url)) {
      setIsUrl(true);
      if (!url.startsWith("www") && !url.startsWith("http")) url = "www." + url;
      if (!url.startsWith("http")) url = "https://" + url;
      setLink(url);
    } else setIsUrl(false);
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
        placeholder="Link"
        size="lg"
        className="flex-grow border border-[#424242] rounded-[4px] px-4 read-only:"
      />
      {isUrl ? (
        <LinkPreview
          link={link}
          title={title}
          setTitle={setTitle}
          titleChanged={titleChanged}
        />
      ) : (
        <span className="text-red-400">Incorrect URL address</span>
      )}
    </>
  );
}
