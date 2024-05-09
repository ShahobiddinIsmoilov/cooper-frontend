import { Link, useNavigate, useParams } from "react-router-dom";
import { CommunityDetailProps } from "../interfaces/communityDetailProps";
import { Button, Stack } from "@mantine/core";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { sortbar } from "./post/lang_post";
import { infobar } from "./lang_components";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuthContext } from "../contexts/AuthContext";

interface Props {
  community: CommunityDetailProps;
}

export default function AboutCommunity({ community }: Props) {
  const navigate = useNavigate();
  const { community_link } = useParams();
  const { language } = useLanguage();
  const auth_user_id = useAuthContext().user?.user_id;

  function handleFeedClick() {
    navigate(`/c/${community_link}`);
  }

  return (
    <Stack>
      <div className="flex gap-1 xs:gap-2 mt-4 ml-2 xs:ml-4">
        <button
          onClick={handleFeedClick}
          className="px-4 py-[10px] text-sm xs:text-base font-bold rounded-full hover:bg-dark-700"
        >
          {sortbar.feed[language]}
        </button>
        <button className="px-4 py-[10px] text-sm xs:text-base font-bold rounded-full bg-dark-700">
          {sortbar.about[language]}
        </button>
      </div>
      <Stack mx={16} mb={100}>
        {auth_user_id === community.owner && (
          <Link to={`/c/${community.link}/manage`}>
            <Button radius={12} className="button-secondary w-full">
              <IoMdSettings />
              <span className="ml-2">{infobar.settings[language]}</span>
            </Button>
          </Link>
        )}
        <Stack mx={16}>
          <p className="flex justify-center items-center gap-2 text-white/50">
            <FaInfoCircle className="inline-block" />
            {infobar.about_community[language]}
          </p>
          <p className="text-white">{community.description}</p>
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
          {/* <p className="flex justify-between">
            <span className="text-white/50">Moderator:</span>
            <span>{community.owner}</span>
          </p> */}
        </Stack>
      </Stack>
    </Stack>
  );
}
