import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { FaHome } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { useAuthContext } from "../contexts/AuthContext";
import { useWindowSize } from "../contexts/WindowSizeContext";
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

  return (
    <div
      className={`bg-dark-850 text-white h-full overflow-x-hidden overflow-hidden hover:overflow-y-scroll navbar-scrollbar flex flex-col justify-between border-r border-line ${
        screenWidth >= 1408 || screenWidth < 1200 ? "w-[300px]" : "w-[280px]"
      }`}
    >
      <div>
        <div className="mt-2">
          <SidebarItem
            icon={<FaHome size={24} />}
            text="Home"
            closeDrawer={closeDrawer}
          />
          <SidebarItem
            icon={<MdOutlineExplore size={24} />}
            text="Explore"
            closeDrawer={closeDrawer}
          />
          <SidebarItem
            icon={<FaGlobe size={24} />}
            text="All"
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
  );
}

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  closeDrawer?: () => void;
}

function SidebarItem({ text, icon, closeDrawer }: SidebarItemProps) {
  const path = useLocation().pathname;
  const current = "/" + text.toLowerCase();

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
