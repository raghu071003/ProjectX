import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "Home",
      "/dashboard": "Dashboard",
      "/login": "Login",
      "/register": "Register",
      "/profile": "Profile",
      "/solve/:problemId": "Solve",
      "/mock": "Mock Interview",
      "/broadcasts": "Broadcasts",
      "/broadcast/:broadcastId": "Broadcast",
      "/practice": "Practice",
    };

    document.title = titles[location.pathname] + " - Skill Forge" || "Skill Forge";
  }, [location]);

  return null;
}

export default TitleManager;