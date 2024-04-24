import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";

function LogoutPage() {
  const { logoutUser } = useAuthContext();

  useEffect(() => {
    logoutUser();

    function timedRedirect() {}

    setTimeout(timedRedirect, 3000);
  });

  return (
    <span>
      You have successfully logged out. You will be redirected to the homepage
      in a moment...
    </span>
  );
}

export default LogoutPage;
