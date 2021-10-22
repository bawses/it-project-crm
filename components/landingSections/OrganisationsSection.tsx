import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { COLORS } from "../../lib/Colors";
import TextButton from "../../components/buttons/TextButton";

export default function OrganisationsSection() {
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
          Organisations on CataLog
        </Typography>
        <div className={classes.subtitle}>
          <Typography variant={isMobile ? "h6" : "h4"}>
            Leave a lasting impression.
          </Typography>
        </div>
        <div className={classes.description}>
          <Typography variant={isMobile ? undefined : "h5"}>
            Create a free organisational profile on CataLog and tap into a
            virbant professional community.{" "}
          </Typography>
        </div>
      </div>
      <div className={classes.getStartedBtn}>
        <TextButton
          title="Register your Organisation"
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
    backgroundColor: '#ff896c',
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
