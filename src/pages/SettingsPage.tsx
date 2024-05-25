import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../services/makeRequest";
import { useAuthContext } from "../contexts/AuthContext";
import { FetchError, FetchLoading } from "../utils/FetchStatus";
import { settings_page } from "./lang_pages";
import { useLanguage } from "../contexts/LanguageContext";
import BackButtonHeader from "../components/general/BackButtonHeader";
import UserSettings from "../components/userprofile/usersettings/UserSettings";

export default function SettingsPage() {
  const username = useAuthContext().user?.username;
  const { language } = useLanguage();

  const { isPending, error, data } = useQuery({
    queryKey: ["usersettings"],
    queryFn: () => makeRequest(`/api/user/detail/${username}`),
  });

  if (isPending) return <FetchLoading size={24} mt={8} />;

  if (error) return <FetchError mt={8} />;

  const user = data.data;

  return (
    <Stack mx={16} mt={12} mb={100} className="max-w-3xl">
      <BackButtonHeader header={settings_page.header[language]} />
      <UserSettings user={user} />
    </Stack>
  );
}
