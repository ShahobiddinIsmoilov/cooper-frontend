import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import UserNavbarItem from "./UserNavbarItem";

export default function UserNavbar({ active }: { active: string }) {
  function handleLeftScroll() {
    document.getElementById("userpagenavbar")!.scrollLeft -= 50;
  }

  function handleRightScroll() {
    document.getElementById("userpagenavbar")!.scrollLeft += 50;
  }

  return (
    <div className="flex justify-between items-center mt-2">
      <div className="flex items-center overflow-y-scroll no-scrollbar">
        <button
          onClick={handleLeftScroll}
          className="p-3 w-fit h-fit xs:hover:bg-dark-750 rounded-full sm:hidden"
        >
          <FaChevronLeft />
        </button>
        <div
          id="userpagenavbar"
          className="flex gap-1 xs:gap-2 py-2 overflow-y-scroll no-scrollbar"
        >
          <Link to={""}>
            <UserNavbarItem value="Activity" active={active} />
          </Link>
          <Link to={`/profile/posts`}>
            <UserNavbarItem value="Posts" active={active} />
          </Link>
          <Link to={`/profile/comments`}>
            <UserNavbarItem value="Comments" active={active} />
          </Link>
          <Link to={`/profile/saved`}>
            <UserNavbarItem value="Saved" active={active} />
          </Link>
          <Link to={`/profile/liked`}>
            <UserNavbarItem value="Liked" active={active} />
          </Link>
          <Link to={`/profile/disliked`}>
            <UserNavbarItem value="Disliked" active={active} />
          </Link>
        </div>
        <button
          onClick={handleRightScroll}
          className="p-3 w-fit h-fit xs:hover:bg-dark-750 rounded-full sm:hidden"
        >
          <FaChevronRight />
        </button>
      </div>
      <Link to="/profile/settings" className="mr-6 ml-2">
        <IoMdSettings size={24} />
        {/* <UserNavbarItem value="Settings" active={active} /> */}
      </Link>
    </div>
  );
}
