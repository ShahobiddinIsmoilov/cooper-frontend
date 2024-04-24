import { Stack } from "@mantine/core";
import { CommunityProps } from "../../interfaces/communityProps";
import { useQuery } from "@tanstack/react-query";
import CommunityCard from "./CommunityCard";
import getCommunities from "../../services/community/getCommunities";

interface Props {
  closeDrawer?: () => void;
}

export default function AllCommunities({ closeDrawer }: Props) {
  const { isPending, error, data } = useQuery({
    queryKey: ["community-list-all"],
    queryFn: () => getCommunities("/api/community/list/all"),
  });

  if (isPending) return null;

  if (error) return null;

  const communities = data.data;

  return (
    communities.length > 0 && (
      <Stack gap={0}>
        <p className="mb-2 text-xs font-bold tracking-widest text-center text-white/50">
          COMMUNITIES
        </p>
        {communities.map((community: CommunityProps) => (
          <CommunityCard
            key={community.name}
            community={community}
            closeDrawer={closeDrawer}
          />
        ))}
      </Stack>
    )
  );
}
