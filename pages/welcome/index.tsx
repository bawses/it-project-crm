import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import PageLoadingBar from "../../components/PageLoadingBar";
import { getSession } from "next-auth/client";
import WelcomeSection from "../../components/landingSections/WelcomeSection";
import ProfessionalsSection from "../../components/landingSections/ProfessionalsSection";
import OrganisationsSection from "../../components/landingSections/OrganisationsSection";

export default function Welcome() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // If user already logged in, redirect to logged in home page (contacts)
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  return (
    <div>
      <WelcomeSection
        onPressCTA={() => router.push(isLoggedIn ? "/contacts" : "/login")}
        CTAtitle={isLoggedIn ? "Go to your contacts" : "Login"}
      />
      <ProfessionalsSection
        isLoggedIn={isLoggedIn}
        onPressCTA={() => router.push("/signup")}
      />
      <OrganisationsSection
        isLoggedIn={isLoggedIn}
        onPressCTA={() => router.push("/signup")}
      />
    </div>
  );
}