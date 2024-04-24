import { useState } from "react";
import { Link } from "react-router-dom";
import { ImSpinner4 } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import { UserDetailProps } from "../../interfaces/userDetailProps";
import { BiSolidLike } from "react-icons/bi";
import { useAuthContext } from "../../contexts/AuthContext";
import { makeRequest } from "../../services/makeRequest";
import { Avatar } from "@mantine/core";
import readableTime from "../../utils/readableTime";

interface UserLinkProps {
  username: string;
}

export default function UserLink({ username }: UserLinkProps) {
  const [showPreview, setShowPreview] = useState(false);
  const user = useAuthContext().user;

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
        to={username === user?.username ? `/profile` : `/user/${username}`}
        className="font-bold hover:underline text-orange-400"
      >
        {username}
      </Link>
      {showPreview && <Preview username={username} />}
    </div>
  );
}

export function Preview({ username }: UserLinkProps) {
  const { isPending, error, data } = useQuery({
    queryKey: [`user-preview-${username}`],
    queryFn: () => makeRequest(`/api/user/detail/${username}`),
    retry: 2,
  });

  if (isPending)
    return (
      <div className="flex justify-center items-center w-96 h-32 overflow-hidden absolute z-30 bg-dark-850 rounded-xl text-white shadow shadow-white">
        <ImSpinner4 className="animate-spin text-xl opacity-50" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center w-96 h-32 overflow-hidden absolute z-30 bg-dark-850 rounded-xl text-white shadow shadow-white">
        <span className="opacity-50">Couldn't load data</span>
      </div>
    );

  return (
    <div className="overflow-hidden absolute z-30 bg-dark-850 rounded-xl text-white shadow shadow-white">
      <UserPreview userDetail={data.data} />
    </div>
  );
}

interface UserPreviewProps {
  userDetail: UserDetailProps;
}

function UserPreview({ userDetail }: UserPreviewProps) {
  const user = useAuthContext().user;

  return (
    <div className="w-96">
      <div className="flex items-center gap-2 m-4">
        <Avatar
          radius={12}
          src={`../../../../src/assets/${userDetail.avatar}`}
          className="w-20 h-20 min-w-20 min-h-20 object-cover rounded-lg"
        />
        <div className="mx-1 w-full">
          <div className="flex justify-between">
            <Link
              to={
                userDetail.username === user?.username
                  ? `/profile/`
                  : `/user/${userDetail.username}`
              }
              className="font-bold overflow-hidden max-w-64 break-words"
            >
              <p className="text-xl hover:text-indigo-400">
                {userDetail.display_name}
              </p>
              <p className="text-orange-400 text-base">{userDetail.username}</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-96 px-6 pb-4">
        <div className="w-64 overflow-hidden">
          <p className="font-bold opacity-50">Date joined:</p>
          {readableTime(userDetail.created_at, "uz")}
        </div>
        <div className="w-48">
          <p className="font-bold opacity-50">Likes:</p>
          <p>
            <BiSolidLike className="text-yellow-400 inline-block mr-1" />
            {userDetail.votes}
          </p>
        </div>
      </div>
    </div>
  );
}
