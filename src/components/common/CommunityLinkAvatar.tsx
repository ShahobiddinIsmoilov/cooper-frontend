import { useState } from "react";
import { Link } from "react-router-dom";
import { ImSpinner4 } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import { CommunityDetailProps } from "../../interfaces/communityDetailProps";
import { Avatar, Image } from "@mantine/core";
import getCommunityDetail from "../../services/community/getCommunityDetail";

interface CommunityLinkProps {
  community_avatar?: string;
  community_link: string;
}

export default function CommunityLinkAvatar({
  community_avatar,
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
        <Avatar src={`../../../../src/assets/avatar_${community_link}.jpg`} />
      </Link>
      {showPreview && <Preview community_link={community_link} />}
    </div>
  );
}

function Preview({ community_link }: CommunityLinkProps) {
  const { isPending, error, data } = useQuery({
    queryKey: [`community-preview-${community_link}`],
    queryFn: () =>
      getCommunityDetail(`/api/community/detail/${community_link}`),
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
      <CommunityPreview communityDetail={data.data} />
    </div>
  );
}

interface CommunityPreviewProps {
  communityDetail: CommunityDetailProps;
}

function CommunityPreview({ communityDetail }: CommunityPreviewProps) {
  return (
    <div className="w-96">
      <Image
        src={`../../../../src/assets/banner_${communityDetail.name}.jpg`}
        className="bg-blue-400 h-24 w-96 object-cover"
      />
      <div className="flex items-center gap-2 m-4">
        <Avatar
          src={`../../../../src/assets/avatar_${communityDetail.name}.jpg`}
          className="w-10 xs:w-14 h-10 xs:h-14 min-w-10 xs:min-w-14 object-cover rounded-full"
        />
        <div className="mx-1 w-full">
          <div className="flex justify-between">
            <Link
              to={`/c/${communityDetail.name}`}
              className="text-xl text-blue-400 hover:text-blue-300 font-bold max-w-[180px] overflow-hidden break-words"
            >
              {communityDetail.name}
            </Link>
            <button className="bg-cyan-700 hover:bg-cyan-600 text-white rounded-full px-3 max-h-10 text-nowrap text-sm">
              A'zo bo'lish
            </button>
          </div>
          <p className="opacity-50 text-sm">
            {communityDetail.members.toLocaleString()} ta a'zo
          </p>
        </div>
      </div>
      <p className="m-6 opacity-75">{communityDetail.description} </p>
    </div>
  );
}
