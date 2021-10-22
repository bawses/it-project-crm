import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import PageLoadingBar from "../../components/PageLoadingBar";
import { getSession } from "next-auth/client";
import WelcomeSection from "../../components/landingSections/WelcomeSection";
import ProfessionalsSection from "../../components/landingSections/ProfessionalsSection";
import OrganisationsSection from "../../components/landingSections/OrganisationsSection";

export default function Welcome() {
  const router = useRouter();

  // If user already logged in, redirect to logged in home page (contacts)
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/contacts');
      }
    });
  }, [router]);

  return (
<div>
    <WelcomeSection onPressCTA={() => router.push('/login')}/>
    <ProfessionalsSection onPressCTA={() => router.push('/signup')}/>
    <OrganisationsSection onPressCTA={() => router.push('/signup')}/>
</div>
  );
}
