import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { COLORS } from "../../lib/Colors";
import TextButton from "../../components/buttons/TextButton";

interface SectionProps {
  isLoggedIn?: boolean;
  onPressCTA?: () => void;
}

export default function ProfessionalsSection({
  isLoggedIn = false,
  onPressCTA = () => {},
}: SectionProps) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div className={classes.section}>
      <div className={classes.content}>
        <Typography
          variant={isMobile ? "h5" : "h3"}
          style={{ fontWeight: "bold" }}
        >
          CataLog for professionals
        </Typography>
        <div className={classes.subtitle}>
          <Typography
            variant={isMobile ? "h6" : "h4"}
            style={{ color: "#D0BD8D", fontWeight: "bold" }}
          >
            Your network at your fingertips.
          </Typography>
        </div>
        <div className={classes.description}>
          <Typography variant={isMobile ? undefined : "h5"}>
            No matter where you are, stay connected with whoever you want.
            <br />
            CataLog keep the details of your contacts organised and handy, and
            helps your network stay in touch with you too.{" "}
          </Typography>
        </div>
      </div>
      {!isLoggedIn && (
        <div className={classes.getStartedBtn}>
          <TextButton
            title="Get Started Now"
            color={COLORS.primaryBlue}
            textColor={COLORS.white}
            className={classes.btn}
            fontSize={isMobile ? "1rem" : "1.5rem"}
            onClick={onPressCTA}
          />
        </div>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: COLORS.white,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  content: {
    margin: theme.spacing(7),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(5),
    },
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(3),
    },
  },
  subtitle: {
    marginTop: theme.spacing(2),
  },
  description: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(3),
    },
  },
  getStartedBtn: {
    paddingBottom: theme.spacing(9),
    paddingRight: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.down("xs")]: {
      paddingRight: theme.spacing(2),
    },
  },
  btn: {
    float: "right",
  },
}));
