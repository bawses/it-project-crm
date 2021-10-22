import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { COLORS } from "../../lib/Colors";
import TextButton from "../../components/buttons/TextButton";

export default function ProfessionalsSection() {
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
          <Typography variant={isMobile ? "h6" : "h4"}>
            Your network at your fingertips.
          </Typography>
        </div>
        <div className={classes.description}>
          <Typography variant={isMobile ? undefined : "h5"}>
            No matter where you are, stay connected with whoever you want.
            CataLog keep the details of your contacts organised and handy, and
            helps your network stay in touch with you too.{" "}
          </Typography>
        </div>
      </div>
      <div className={classes.getStartedBtn}>
        <TextButton
          title="Get Started Now"
          color={COLORS.primaryBlue}
          textColor={COLORS.white}
          className={classes.btn}
        />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: COLORS.white,
    height: 450,
    [theme.breakpoints.down("xs")]: {
      height: 400,
    },
  },
  content: {
    marginTop: theme.spacing(16),
    margin: theme.spacing(7),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(7),
      margin: theme.spacing(5),
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(6),
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
    margin: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(4),
    },
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2),
    },
  },
  btn: {
    float: "right",
  },
}));
