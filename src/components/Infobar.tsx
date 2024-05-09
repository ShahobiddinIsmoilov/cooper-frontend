import { Button, Stack } from "@mantine/core";
import { CommunityDetailProps } from "../interfaces/communityDetailProps";
import { FaInfoCircle } from "react-icons/fa";
import { infobar } from "./lang_components";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { useAuthContext } from "../contexts/AuthContext";

interface InfobarProps {
  community: CommunityDetailProps;
}

export default function Infobar({ community }: InfobarProps) {
  const { language } = useLanguage();
  const auth_user_id = useAuthContext().user?.user_id;

  return (
    <div className="w-[280px] min-w-[280px] max-w-[280px] text-white overflow-hidden h-fit bg-dark-850 rounded-xl p-6 mr-2">
      {" "}
      <Stack gap={8}>
        <p className="flex justify-center items-center gap-2 text-white/50">
          <FaInfoCircle className="inline-block" />
          {infobar.about_community[language]}
        </p>
        <p className="py-2">{community.description}</p>
        <p className="flex justify-between">
          <span className="text-white/50">
            {infobar.number_of_members[language]}:
          </span>
          <span>{community.members}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-white/50">
            {infobar.number_of_posts[language]}:
          </span>
          <span>{community.posts}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-white/50">
            {infobar.number_of_comments[language]}:
          </span>
          <span>{community.comments}</span>
        </p>
        {auth_user_id === community.owner && (
          <Link to={`/c/${community.link}/manage`}>
            <Button
              radius={8}
              pl={8}
              mt={8}
              className="button-secondary w-full"
            >
              <IoMdSettings />
              <span className="ml-2">{infobar.settings[language]}</span>
            </Button>
          </Link>
        )}
      </Stack>
    </div>
  );
}
