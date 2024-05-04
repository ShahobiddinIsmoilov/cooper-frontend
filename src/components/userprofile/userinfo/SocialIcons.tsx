import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserDetailProps } from "../../../interfaces/userDetailProps";

interface Props {
  user: UserDetailProps;
}

export default function SocialIcons({ user }: Props) {
  return (
    <div className="flex mt-2 gap-4 text-2xl">
      {user.telegram && (
        <Link
          to={user.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <FaTelegram size={28} />
        </Link>
      )}
      {user.instagram && (
        <Link
          to={user.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <FaInstagram size={28} />
        </Link>
      )}
      {user.facebook && (
        <Link
          to={user.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <FaFacebook size={28} />
        </Link>
      )}
      {user.twitter && (
        <Link
          to={user.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <FaTwitter size={28} />
        </Link>
      )}
    </div>
  );
}
