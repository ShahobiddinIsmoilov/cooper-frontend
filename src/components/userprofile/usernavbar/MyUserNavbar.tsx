import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import UserNavbarItem from "./UserNavbarItem";

export default function UserNavbar({ active }: { active: string }) {
  function handleLeftScroll() {
    document.getElementById("userpagenavbar")!.scrollLeft -= 50;
  }

  function handleRightScroll() {
    document.getElementById("userpagenavbar")!.scrollLeft += 50;
  }

  return (
    <div className="flex items-center overflow-y-scroll no-scrollbar mt-2">
      <button
        onClick={handleLeftScroll}
        className="p-4 w-fit h-fit xs:hover:bg-dark-750 rounded-full sm:hidden"
      >
        <FaChevronLeft />
      </button>
      <div
        id="userpagenavbar"
        className="flex gap-1 xs:gap-2 py-2 overflow-y-scroll no-scrollbar"
      >
        <Link to={""}>
          <UserNavbarItem value="activity" active={active} />
        </Link>
        <Link to={`/profile/posts`}>
          <UserNavbarItem value="posts" active={active} />
        </Link>
        <Link to={`/profile/comments`}>
          <UserNavbarItem value="comments" active={active} />
        </Link>
        <Link to={`/profile/saved`}>
          <UserNavbarItem value="saved" active={active} />
        </Link>
        <Link to={`/profile/liked`}>
          <UserNavbarItem value="liked" active={active} />
        </Link>
        <Link to={`/profile/disliked`}>
          <UserNavbarItem value="disliked" active={active} />
        </Link>
      </div>
      <button
        onClick={handleRightScroll}
        className="p-3 w-fit h-fit xs:hover:bg-dark-750 rounded-full sm:hidden"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
