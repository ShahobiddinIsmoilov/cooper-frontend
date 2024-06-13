import { Link } from "react-router-dom";

export default function Credits() {
  return (
    <p className="text-center text-xs text-white/50">
      <Link
        to="https://www.linkedin.com/in/shahobiddin-ismoilov"
        target="_blank"
        rel="noopener noreferrer"
      >
        © Shahobiddin Ismoilov, 2024
      </Link>
    </p>
  );
}
