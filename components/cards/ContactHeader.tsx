import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

interface ContactHeaderProps {
  firstName?: string;
  lastName?: string;
  title?: string;
  primaryOrg?: string;
  secondaryOrg?: string;
}

export default function ContactHeader({
  firstName = "",
  lastName = "",
  title = "",
  primaryOrg = "",
  secondaryOrg = "",
}: ContactHeaderProps) {
  const classes = useStyles();

  return (
    <div className={classes.profileHeader}>
      <Typography variant="h5" component="h1">
        {firstName} {lastName}
      </Typography>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <div className={classes.responsiveRow}>
        <div className={classes.organisationField}>
          <Typography>{primaryOrg}</Typography>
        </div>
        {!!secondaryOrg && (
          <div className={classes.organisationField}>
            <Typography>{secondaryOrg}</Typography>
          </div>
        )}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  profileHeader: {
    width: "100%",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  organisationField: {
    flexGrow: 1,
    marginTop: theme.spacing(),
  },
  responsiveRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
}));
