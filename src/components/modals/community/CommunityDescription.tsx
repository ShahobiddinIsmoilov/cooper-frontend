import { Textarea } from "@mantine/core";

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
        placeholder="Description"
        size="lg"
        className="flex-grow border border-[#424242] rounded-[4px] px-4 read-only:"
      />
      <span className={`opacity-75 inline-block w-full text-end`}>
        {description.length}/500
      </span>
    </div>
  );
}
