import { useState } from "react";
import { Link } from "react-router-dom";
import { ImSpinner4 } from "react-icons/im";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CommunityDetailProps } from "../../interfaces/communityDetailProps";
import { Avatar, Button, Image } from "@mantine/core";
import { join_button } from "./lang_general";
import { infobar } from "../lang_components";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuthContext } from "../../contexts/AuthContext";
import getCommunityDetail from "../../services/community/getCommunityDetail";
import useCredentials from "../../services/useCredentials";

interface CommunityLinkProps {
  community_name: string;
  community_link: string;
}

export default function CommunityLink({
  community_name,
  community_link,
}: CommunityLinkProps) {
  const [showPreview, setShowPreview] = useState(false);

  let showPreviewTimer: NodeJS.Timeout;
  let hidePreviewTimer: NodeJS.Timeout;

  function handleMouseEnter() {
    clearTimeout(hidePreviewTimer);
    showPreviewTimer = setTimeout(() => {
      setShowPreview(true);
    }, 750);
  }

  function handleMouseLeave() {
    clearTimeout(showPreviewTimer);
    hidePreviewTimer = setTimeout(() => {
      setShowPreview(false);
    }, 250);
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link
        to={`/c/${community_link}`}
        className="font-bold hover:underline text-blue-400"
      >
        {community_name}
      </Link>
      {showPreview && <Preview community_link={community_link} />}
    </div>
  );
}

export function Preview({ community_link }: { community_link: string }) {
  const user = useAuthContext().user;

  const { isPending, error, data } = useQuery({
    queryKey: [`community-preview-${community_link}`],
    queryFn: () =>
      user
        ? getCommunityDetail(
            `/api/community/detail/${community_link}/?auth=true&user=${user.user_id}`
          )
        : getCommunityDetail(
            `/api/community/detail/${community_link}/?auth=false`
          ),
    retry: false,
  });

  if (isPending)
    return (
      <div className="overflow-hidden absolute z-30 bg-dark-850 rounded-xl text-white shadow shadow-white">
        <div className="flex justify-center items-center w-96 h-48">
          <ImSpinner4 className="animate-spin text-xl opacity-50" />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="overflow-hidden absolute z-30 bg-dark-850 rounded-xl text-white shadow shadow-white">
        <div className="flex justify-center items-center w-96 h-48 opacity-50">
          Couldn't load data
        </div>
      </div>
    );

  return (
    <div className="overflow-hidden absolute z-30 bg-dark-850 rounded-xl text-white shadow shadow-white">
      <CommunityPreview community={data.data} />
    </div>
  );
}

interface CommunityPreviewProps {
  community: CommunityDetailProps;
}

function CommunityPreview({ community }: CommunityPreviewProps) {
  const api = useCredentials();
  const query = useQueryClient();
  const { language } = useLanguage();

  function handleClick() {
    if (community.is_joined) {
      api
        .get(`/api/community/action/${community.id}/?action=leave`)
        .then(() => refresh());
    } else {
      api
        .get(`/api/community/action/${community.id}/?action=join`)
        .then(() => refresh());
    }
  }

  function refresh() {
    query.invalidateQueries({ queryKey: ["community-list-joined"] });
    query.invalidateQueries({ queryKey: ["community-list-discover"] });
    query.invalidateQueries({ queryKey: [`community-page-${community.link}`] });
    query.invalidateQueries({
      queryKey: [`community-preview-${community.link}`],
    });
  }

  return (
    <div className="w-96">
      <Image
        src={community.banner}
        className="bg-blue-400 h-24 w-96 object-cover"
      />
      <div className="flex justify-between m-4">
        <div className="flex gap-2">
          <Avatar
            src={community.avatar}
            className="w-10 xs:w-14 h-10 xs:h-14 min-w-10 xs:min-w-14 object-cover rounded-full"
          />
          <div className="max-w-[180px] mt-1">
            <Link
              to={`/c/${community.link}`}
              className="text-xl text-blue-400 hover:text-blue-300 font-bold max-w-[180px] overflow-hidden break-words"
            >
              {community.name}
            </Link>
            <p className="text-white/50 text-sm">
              {community.members === 1
                ? infobar.members_one[language]
                : community.members.toLocaleString() +
                  infobar.members[language]}
            </p>
          </div>
        </div>
        <div className="mt-1">
          <Button
            size="xs"
            onClick={handleClick}
            className={`rounded-full px-3 ${
              community.is_joined ? "button-secondary" : "button-primary"
            }`}
          >
            {community.is_joined
              ? join_button.joined[language]
              : join_button.join[language]}
          </Button>
        </div>
      </div>
      <p className="mx-6 mb-6 text-white/75">{community.description} </p>
    </div>
  );
}
