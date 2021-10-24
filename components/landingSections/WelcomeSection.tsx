import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { COLORS } from "../../lib/Colors";
import BACKGROUND_IMAGE from "../../assets/landing_background.png";
import TextButton from "../../components/buttons/TextButton";
import Image from "next/image";

interface SectionProps {
  onPressCTA?: () => void;
}

export default function WelcomeSection({ onPressCTA = () => {} }: SectionProps) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery('(max-width:1121px)');
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div className={classes.section}>
      <Image
        src={BACKGROUND_IMAGE}
        alt="Background image"
        className={classes.backgroundImage}
        layout={isSmall ? 'fixed' : "responsive"}
      />
      <div className={classes.content}>
        <Typography
          variant={isMobile ? "h2" : "h1"}
          className={classes.orangeTitle}
        >
          Cata
          <span className={classes.blueTitle}>Log</span>
        </Typography>
        <div style={{ marginLeft: 4 }}>
          <Typography
            variant={isMobile ? "h6" : "h4"}
            style={{ fontWeight: "bold" }}
          >
            Stay connected.
          </Typography>
          <Typography variant={isMobile ? "h6" : "h4"}>
            CataLog is the modern CRM that brings your world closer to you.
          </Typography>
        </div>
        {isMobile && (
          <div className={classes.mobileLoginBtn}>
            <TextButton
              title="Login"
              color={COLORS.actionOrange}
              textColor={COLORS.white}
              onClick={onPressCTA}
            />
          </div>
        )}
      </div>
      {!isMobile && (
        <div className={classes.loginBtn}>
          <TextButton
            title="Login"
            color={COLORS.actionOrange}
            textColor={COLORS.white}
            fontSize='1.5rem'
            onClick={onPressCTA}
          />
        </div>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "6rem",
    fontWeight: "bold",
  },
  orangeTitle: {
    color: COLORS.actionOrange,
  },
  blueTitle: {
    color: COLORS.primaryBlue,
  },
  section: {
    height: 600,
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      height: 500,
    },
    [theme.breakpoints.down("xs")]: {
      height: 400,
    },
  },
  backgroundImage: {
    zIndex: -1,
    height: 600,
    [theme.breakpoints.down("sm")]: {
      height: 500,
    },
    [theme.breakpoints.down("xs")]: {
      height: 400,
    },
  },
  content: {
    position: "absolute",
    top: theme.spacing(15),
    left: 0,
    margin: theme.spacing(7),
    [theme.breakpoints.down("sm")]: {
      top: theme.spacing(12),
      margin: theme.spacing(5),
    },
    [theme.breakpoints.down("xs")]: {
      top: theme.spacing(7),
      margin: theme.spacing(3),
    },
  },
  loginBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: theme.spacing(6),
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(5),
    },
  },
  mobileLoginBtn: {
    marginTop: theme.spacing(3),
  },
}));
