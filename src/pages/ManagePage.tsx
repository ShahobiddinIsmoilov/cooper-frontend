import { Stack } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../services/makeRequest";
import { FetchError, FetchLoading } from "../utils/FetchStatus";
import { CommunityDetailProps } from "../interfaces/communityDetailProps";
import { manage_page } from "./lang_pages";
import { useLanguage } from "../contexts/LanguageContext";
import BackButtonHeader from "../components/general/BackButtonHeader";
import CommunitySettings from "../components/community/manage/CommunitySettings";

export default function ManagePage() {
  const { community_link } = useParams();
  const { language } = useLanguage();
  const username = useAuthContext().user?.user_id;
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: [`manage-${community_link}`],
    queryFn: () => makeRequest(`/api/community/detail/${community_link}`),
  });

  if (isPending) return <FetchLoading size={24} mt={8} />;

  if (error) return <FetchError mt={8} />;

  const community: CommunityDetailProps = data.data;

  if (username !== community.owner) navigate(`/c/${community_link}`);

  return (
    <Stack gap={16} mx={16} mt={12} mb={100} className="max-w-3xl">
      <BackButtonHeader header={manage_page.header[language]} />
      <CommunitySettings community={community} />
    </Stack>
  );
}
