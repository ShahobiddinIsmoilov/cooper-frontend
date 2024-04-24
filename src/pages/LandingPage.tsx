import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  navigate("/home");

  return <div></div>;
}

export default LandingPage;
