import { Stack } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../services/makeRequest";
import { FetchError, FetchLoading } from "../utils/FetchStatus";
import { CommunityDetailProps } from "../interfaces/communityDetailProps";
import ManageHeader from "../components/community/manage/ManageHeader";
import CommunitySettings from "../components/community/manage/CommunitySettings";

export default function ManagePage() {
  const { community_link } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: [`manage-${community_link}`],
    queryFn: () => makeRequest(`/api/community/detail/${community_link}`),
  });

  if (isPending) return <FetchLoading mt="8" />;

  if (error) return <FetchError mt="8" />;

  const community: CommunityDetailProps = data.data;

  return (
    <Stack gap={16} className="max-w-3xl px-4 py-2">
      <ManageHeader />
      <CommunitySettings community={community} />
    </Stack>
  );
}
