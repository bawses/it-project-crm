import { Container, Typography, makeStyles } from "@material-ui/core";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import PageLoadingBar from "../../components/PageLoadingBar";
import { COLORS } from "../../lib/Colors";
import { getSession } from "next-auth/client";
import WelcomeSection from "../../components/landingSections/WelcomeSection";
import ProfessionalsSection from "../../components/landingSections/ProfessionalsSection";
import OrganisationsSection from "../../components/landingSections/OrganisationsSection";

const useStyles = makeStyles((theme) => ({
    section: {
        height: 600,
        overflow: 'hidden',
        [theme.breakpoints.down("sm")]: {
            height: 500,
          },
        [theme.breakpoints.down("xs")]: {
            height: 400,
          },
    },
    professionalsSection: {
        backgroundColor: COLORS.white,
    },
    organisationsSection: {
        backgroundColor: '#ff896c',
    }

}));

export default function Landing() {
  const classes = useStyles();
  const router = useRouter();

//   useEffect(() => {
//     getSession().then((session) => {
//       if (session) {
//         router.replace('/contacts');
//       }
//     });
//   }, [router]);

  return (
<div>
    <WelcomeSection />
    <ProfessionalsSection />
    <OrganisationsSection />
</div>
  );
}
