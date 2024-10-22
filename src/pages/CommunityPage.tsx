import { Route, Routes, useParams } from "react-router-dom";
import { Avatar, Image } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../contexts/AuthContext";
import { useWindowSize } from "../contexts/WindowSizeContext";
import { CommunityDetailProps } from "../interfaces/communityDetailProps";
import { BsDot } from "react-icons/bs";
import { useCustomModal } from "../contexts/CustomModalContext";
import { FetchError, FetchLoading } from "../utils/FetchStatus";
import { infobar } from "../components/lang_components";
import { useLanguage } from "../contexts/LanguageContext";
import Infobar from "../components/Infobar";
import PostFeed from "../components/post/PostFeed";
import JoinButton from "../components/general/JoinButton";
import CreatePost from "../components/modals/post/CreatePost";
import AboutCommunity from "../components/AboutCommunity";
import getCommunityDetail from "../services/community/getCommunityDetail";

export default function CommunityPage() {
  const { screenWidth } = useWindowSize();
  const { community_link } = useParams();
  const { language } = useLanguage();
  const isHeaderSmaller = useWindowSize().screenHeight <= 700;
  const user = useAuthContext().user;

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

  if (isPending) return <FetchLoading size={24} mt={8} />;

  if (error) return <FetchError mt={8} />;

  const community: CommunityDetailProps = data.data;

  const { openCustomModal, setCustomModalContent, customModalContentRef } =
    useCustomModal();

  function handleAvatarClick() {
    setCustomModalContent(
      <Image
        src={community.avatar}
        ref={customModalContentRef}
        className="w-72 min-w-72 h-72 min-h-72 xs:w-[500px] xs:min-w-[500px] xs:h-[500px] xs:min-h-[500px] rounded-full"
      />
    );
    openCustomModal();
  }

  function handleBannerClick() {
    setCustomModalContent(
      <Image
        src={community.banner}
        fit="contain"
        ref={customModalContentRef}
        className="w-screen"
      />
    );
    openCustomModal();
  }

  return (
    <>
      <Image
        onClick={handleBannerClick}
        src={community.banner}
        className="h-24 xs:h-48 bg-white object-cover rounded-xl cursor-pointer"
      />
      <div className="flex">
        <div
          className={`flex-grow ${
            screenWidth >= 920 ? "max-w-[calc(100%-288px)]" : "w-screen"
          }`}
        >
          <div
            className={`absolute ${
              isHeaderSmaller
                ? "top-[102px] xs:top-[164px]"
                : "top-[112px] xs:top-[174px] "
            } mx-4 xs:mx-8`}
          >
            <Avatar
              onClick={handleAvatarClick}
              src={community.avatar}
              className="w-24 h-24 min-w-24 min-h-24 xs:w-40 xs:h-40 xs:min-w-40 xs:min-h-40 rounded-full object-cover border-4 xs:border-8 border-dark-800 cursor-pointer"
            />
          </div>
          <div className="flex justify-end items-center gap-2 mr-4 mt-[10px] xs:mt-4">
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
          <div className="xs:translate-y-6">
            <div className="mt-2 xs:mt-0 mx-5 xs:mx-10 w-[w-screen-40px] break-words">
              <div className="text-2xl xs:text-3xl font-bold text-blue-400">
                {community.name}
              </div>
              <div className="text-white/50 xs:text-lg">
                c/{community.link}
                <BsDot className="inline-block" />
                {community.members === 1
                  ? infobar.members_one[language]
                  : community.members.toLocaleString() +
                    infobar.members[language]}
              </div>
            </div>
            <Routes>
              <Route
                path=""
                element={
                  <PostFeed filter="community" community={community.id} />
                }
              />
              <Route
                path="/about"
                element={<AboutCommunity community={community} />}
              />
            </Routes>
          </div>
        </div>
        <div className="mt-4">
          {screenWidth >= 820 && <Infobar community={community} />}
        </div>
      </div>
    </>
  );
}
