import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { FaHome } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { useAuthContext } from "../contexts/AuthContext";
import { useWindowSize } from "../contexts/WindowSizeContext";
import { navbar } from "./lang_components";
import { useLanguage } from "../contexts/LanguageContext";
import CreateCommunityButton from "./modals/community/CreateCommunityButton";
import JoinedCommunities from "./community/JoinedCommunities";
import DiscoverCommunities from "./community/DiscoverCommunities";
import AllCommunities from "./community/AllCommunities";
import Credits from "./Credits";

interface Props {
  closeDrawer?: () => void;
}

export default function Navbar({ closeDrawer }: Props) {
  const user = useAuthContext().user;
  const { screenWidth } = useWindowSize();
  const { language } = useLanguage();

  return (
    <div
      className={`bg-dark-850 text-white h-full overflow-x-hidden overflow-y-scroll xs:overflow-hidden xs:hover:overflow-y-scroll navbar-scrollbar border-r border-line ${
        screenWidth >= 1408 || screenWidth < 1200 ? "w-[300px]" : "w-[280px]"
      }`}
    >
      <div className="flex flex-col justify-between gap-8 mb-48">
        <div>
          <div className="mt-2">
            <SidebarItem
              icon={<FaHome size={24} />}
              text={navbar.home[language]}
              value="home"
              closeDrawer={closeDrawer}
            />
            <SidebarItem
              icon={<MdOutlineExplore size={24} />}
              text={navbar.explore[language]}
              value="explore"
              closeDrawer={closeDrawer}
            />
            <SidebarItem
              icon={<FaGlobe size={24} />}
              text={navbar.all[language]}
              value="all"
              closeDrawer={closeDrawer}
            />
          </div>
          <div>
            {user && (
              <>
                <CustomLine />
                <p className="flex justify-center">
                  <CreateCommunityButton />
                </p>
              </>
            )}
            {!user && (
              <>
                <CustomLine />
                <AllCommunities closeDrawer={closeDrawer} />
              </>
            )}
            {user && (
              <>
                <CustomLine />
                <JoinedCommunities
                  user={user.user_id}
                  closeDrawer={closeDrawer}
                />
              </>
            )}
            {user && (
              <>
                <CustomLine />
                <DiscoverCommunities
                  user={user.user_id}
                  closeDrawer={closeDrawer}
                />
              </>
            )}
            {/* <p className="text-white opacity-75 text-sm py-4 text-center">
          <span className="hover:text-cyan-300 cursor-pointer">
            ALL COMMUNITIES
          </span>
        </p> */}
          </div>
        </div>
        <Credits />
      </div>
    </div>
  );
}

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  value: string;
  closeDrawer?: () => void;
}

function SidebarItem({ text, value, icon, closeDrawer }: SidebarItemProps) {
  const path = useLocation().pathname;
  const current = "/" + value;

  return (
    <Link
      to={current}
      onClick={closeDrawer}
      className={`mx-4 flex items-center px-8 py-3 rounded-xl hover:bg-dark-750 ${
        current === path && "bg-dark-750"
      }`}
    >
      {icon}
      <p className="text-lg truncate mx-2">{text}</p>
    </Link>
  );
}

function CustomLine() {
  return (
    <div className="py-2 px-4 opacity-0">
      <hr className="border-line" />
    </div>
  );
}
