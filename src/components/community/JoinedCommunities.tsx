import { Stack } from "@mantine/core";
import { CommunityProps } from "../../interfaces/communityProps";
import { useQuery } from "@tanstack/react-query";
import { navbar } from "../lang_components";
import { useLanguage } from "../../contexts/LanguageContext";
import CommunityCard from "./CommunityCard";
import getCommunities from "../../services/community/getCommunities";

interface Props {
  user: number;
  closeDrawer?: () => void;
}

export default function JoinedCommunities({ user, closeDrawer }: Props) {
  const { language } = useLanguage();

  const { isPending, error, data } = useQuery({
    queryKey: ["community-list-joined"],
    queryFn: () => getCommunities(`/api/community/list/joined/?user=${user}`),
  });

  if (isPending) return null;

  if (error) return null;

  const communities = data.data;

  return (
    communities.length > 0 && (
      <Stack gap={0}>
        <p className="my-2 text-xs font-bold tracking-widest text-center text-white/50">
          {navbar.joined_communities[language]}
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
