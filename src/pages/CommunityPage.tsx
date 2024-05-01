import { ImSpinner4 } from "react-icons/im";
import { useParams } from "react-router-dom";
import { Avatar, Image } from "@mantine/core";
import { IoCloudOffline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../contexts/AuthContext";
import { useWindowSize } from "../contexts/WindowSizeContext";
import { CommunityDetailProps } from "../interfaces/communityDetailProps";
import Infobar from "../components/Infobar";
import ScrollTop from "../components/ScrollTop";
import PostFeed from "../components/post/PostFeed";
import JoinButton from "../components/community/JoinButton";
import CreatePost from "../components/modals/post/CreatePost";
import getCommunityDetail from "../services/community/getCommunityDetail";

export default function CommunityPage() {
  const user = useAuthContext().user;
  const { screenWidth } = useWindowSize();
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
        className="h-24 xs:h-48 bg-white w-fill object-cover rounded-xl"
      />
      <div className="flex">
        <div className="flex-grow -translate-y-10 xs:-translate-y-14">
          <div className="flex ml-4 xs:ml-8">
            <Avatar
              src={community.avatar}
              className="w-24 h-24 xs:w-32 xs:h-32 rounded-full object-cover border-4 xs:border-8 border-dark-800"
            />
            <div className="flex justify-between items-center mt-10 xs:mt-14 ml-2">
              <p className="text-blue-400 text-lg xs:text-3xl font-bold break-words">
                {community_link}
              </p>
              <JoinButton
                isJoined={community.is_joined}
                community_id={community.id}
                community_link={community.link}
              />
              <div className="rounded-full border">
                <CreatePost
                  community={community.id}
                  community_name={community.name}
                  community_avatar={community.avatar}
                />
              </div>
            </div>
          </div>
          <PostFeed filter="community" community={community.id} />
        </div>
        <div className="mt-4">
          {screenWidth >= 920 && <Infobar community={community} />}
        </div>
      </div>
      <ScrollTop />
    </>
  );
}
