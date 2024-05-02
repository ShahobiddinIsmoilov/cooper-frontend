import { ImSpinner4 } from "react-icons/im";
import { useParams } from "react-router-dom";
import { Avatar, Image } from "@mantine/core";
import { IoCloudOffline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../contexts/AuthContext";
// import { useWindowSize } from "../contexts/WindowSizeContext";
import { CommunityDetailProps } from "../interfaces/communityDetailProps";
// import Infobar from "../components/Infobar";
import PostFeed from "../components/post/PostFeed";
import JoinButton from "../components/community/JoinButton";
import CreatePost from "../components/modals/post/CreatePost";
import getCommunityDetail from "../services/community/getCommunityDetail";

export default function CommunityPage() {
  const user = useAuthContext().user;
  // const { screenWidth } = useWindowSize();
  const { community_link } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: [`community-page-${community_link}`],
    queryFn: () =>
      user
        ? getCommunityDetail(
            `/api/community/detail/${community_link}/?auth=true&user=${user.user_id}`
          )
        : getCommunityDetail(
            `/api/community/detail/${community_link}/?auth=false`
          ),
  });

  if (isPending)
    return (
      <div className="flex justify-center items-center mt-16 text-white text-2xl">
        <ImSpinner4 className="animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center mt-16 text-white gap-2">
        <IoCloudOffline />
        Couldn't load data
      </div>
    );

  const community: CommunityDetailProps = data.data;

  return (
    <>
      <Image
        src={community.banner}
        className="h-24 xs:h-48 bg-white object-cover rounded-xl"
      />
      <div className="-translate-y-12 xs:-translate-y-20">
        <div className="flex justify-between mx-4 xs:mx-8">
          <Avatar
            src={community.avatar}
            className="w-24 h-24 min-w-24 min-h-24 xs:w-40 xs:h-40 xs:min-w-40 xs:min-h-40 rounded-full object-cover border-4 xs:border-8 border-dark-800"
          />
          <div className="flex items-center mt-14 xs:mt-16 ml-2 gap-2">
            <div className="border border-white/50 rounded-full">
              <CreatePost
                community={community.id}
                community_name={community.name}
                community_avatar={community.avatar}
              />
            </div>
            <JoinButton
              isJoined={community.is_joined}
              community_id={community.id}
              community_link={community.link}
            />
          </div>
        </div>
        <div className="mt-2 mx-5 xs:mx-10">
          <div className="text-2xl xs:text-3xl font-bold text-blue-400">
            {community.name}
          </div>
          <div className="text-white/50 xs:text-">@{community.link}</div>
        </div>
        <PostFeed filter="community" community={community.id} />
      </div>
      {/* <div className="mt-4">
        {screenWidth >= 920 && <Infobar community={community} />}
      </div> */}
    </>
  );
}
