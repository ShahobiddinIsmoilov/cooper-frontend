import { Stack } from "@mantine/core";
import { CommunityDetailProps } from "../interfaces/communityDetailProps";
import { FaInfoCircle } from "react-icons/fa";

interface InfobarProps {
  community: CommunityDetailProps;
}

export default function Infobar({ community }: InfobarProps) {
  return (
    <div className="w-[280px] min-w-[280px] max-w-[280px] text-white overflow-hidden h-fit bg-dark-850 rounded-xl p-6 mr-4">
      {" "}
      <Stack gap={8}>
        <p className="flex justify-center items-center gap-2 opacity-50">
          <FaInfoCircle className="inline-block" />
          About this community
        </p>
        <p className="py-2">{community.description}</p>
        <p className="flex justify-between">
          <span className="opacity-50">Number of members:</span>
          <span>{community.members}</span>
        </p>
        <p className="flex justify-between">
          <span className="opacity-50">Number of posts:</span>
          <span>{community.posts}</span>
        </p>
        <p className="flex justify-between">
          <span className="opacity-50">Number of comments:</span>
          <span>{community.comments}</span>
        </p>
      </Stack>
    </div>
  );
}
