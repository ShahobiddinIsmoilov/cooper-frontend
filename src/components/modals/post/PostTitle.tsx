import { Textarea } from "@mantine/core";

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
        data-autofocus
        autosize
        placeholder="Title"
        size="lg"
        className="flex-grow border border-[#424242] rounded-[4px] px-4 read-only:"
      />
      <span className={`opacity-75 inline-block w-full text-end`}>
        {title.length}/200
      </span>
    </div>
  );
}
