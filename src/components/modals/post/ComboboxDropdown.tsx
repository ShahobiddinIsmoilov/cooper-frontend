import { Avatar, Combobox, Space } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../../services/makeRequest";
import { CommunityProps } from "../../../interfaces/communityProps";
import { useLanguage } from "../../../contexts/LanguageContext";

export default function ComboboxDropdown() {
  const { language } = useLanguage();
  const { isPending, error, data } = useQuery({
    queryKey: ["combobox-community-list"],
    queryFn: () => makeRequest(`/api/community/list/all`),
  });

  if (isPending) return lang.loading[language];

  if (error) return lang.error[language];

  const communityList: CommunityProps[] = data.data;

  let communities = [];
  for (let i = 0; i < communityList.length; i++) {
    const item = [
      String(communityList[i]["id"]),
      communityList[i]["avatar"],
      communityList[i]["name"],
      communityList[i]["id"] +
        "@@@" +
        communityList[i]["avatar"] +
        "@@@" +
        communityList[i]["name"],
    ];
    communities[i] = item;
  }

  const communityOptions = communities.map((item) => (
    <Combobox.Option value={item[3]} key={item[0]}>
      <div className="flex items-center gap-2">
        <Space h="xl" />
        <Avatar src={item[1]} size={28} maw={28} />
        <span className="text-lg font-bold truncate">{item[2]}</span>
      </div>
    </Combobox.Option>
  ));
  return communityOptions;
}

const lang = {
  loading: {
    uz: "Yuklanmoqda...",
    en: "Loading...",
    ru: "Loading...",
  },
  error: {
    uz: "Xatolik",
    en: "Error",
    ru: "Error",
  },
};
