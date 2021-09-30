import { useRouter } from "next/router";
import { getSession, signIn, signOut } from "next-auth/client";
import React, { useEffect, useState, MouseEvent } from "react";
import Layout from "../../components/navLayout/Layout";
import TextButton from "../../components/buttons/TextButton";
import PageLoadingBar from "../../components/PageLoadingBar";
import { Container, makeStyles } from "@material-ui/core";
import { COLORS } from "../../lib/Colors";

const useStyles = makeStyles((theme) => ({
  containerStyle: {
    width: "100%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "90%",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(7),
    },
  },
}));

export default function Settings() {
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();
  const router = useRouter();

  const handleSignOut = (e: React.SyntheticEvent) => {
    signOut();
  };

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setIsLoading(false);
      } else {
        router.replace("/login");
      }
    });
  }, [router]);

  if (isLoading) {
    return <PageLoadingBar />;
  }

  return (
    <Layout>
      <Container className={classes.containerStyle}>
        <>
          <h1>Welcome to your settings page!</h1>
          <TextButton
            color={COLORS.actionOrange}
            textColor={COLORS.white}
            title="Sign Out"
            onClick={handleSignOut}
          />
          <br />
        </>
      </Container>
    </Layout>
  );
}