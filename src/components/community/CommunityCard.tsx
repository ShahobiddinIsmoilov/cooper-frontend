import { Link } from "react-router-dom";
import { CommunityProps } from "../../interfaces/communityProps";
import { Avatar } from "@mantine/core";
import { infobar } from "../lang_components";
import { useLanguage } from "../../contexts/LanguageContext";

interface CommunityCardProps {
  community: CommunityProps;
  closeDrawer?: () => void;
}

export default function CommunityCard({
  community,
  closeDrawer,
}: CommunityCardProps) {
  const { language } = useLanguage();

  return (
    <Link
      to={`/c/${community.name}`}
      onClick={closeDrawer}
      className="mx-4 flex gap-3 items-center px-8 py-2 rounded-xl hover:bg-dark-750"
    >
      <Avatar src={community.avatar} />
      <div className="truncate">
        <p className="font-bold">{community.name}</p>
        <p className="text-white/50 truncate text-sm">
          {community.members === 1
            ? infobar.members_one[language]
            : community.members.toLocaleString() + infobar.members[language]}
        </p>
      </div>
    </Link>
  );
}
