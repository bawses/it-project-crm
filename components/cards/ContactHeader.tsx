import React from "react";
import { Typography, makeStyles, IconButton } from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import StarIcon from '@material-ui/icons/Star';
import { COLORS } from "../../src/colors";

interface ContactHeaderProps {
  firstName?: string;
  lastName?: string;
  title?: string;
  primaryOrg?: string;
  secondaryOrg?: string;
  starred?: boolean;
  onStar?: () => void;
}

export default function ContactHeader({
  firstName = "",
  lastName = "",
  title = "",
  primaryOrg = "",
  secondaryOrg = "",
  starred = false,
  onStar = () => {},
}: ContactHeaderProps) {
  const classes = useStyles();

  return (
    <div className={classes.profileHeader}>
      <div className={classes.fullNameRow}>
        <Typography variant="h5" component="h1">
          {firstName} {lastName}
        </Typography>
        <IconButton onClick={onStar}>
          {!starred && <StarsIcon style={{ fontSize: 35, color: COLORS.inactiveGrey }} />}
          {starred && <StarIcon style={{ fontSize: 35, color: COLORS.starredYellow }} />}
        </IconButton>
      </div>
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
  fullNameRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: 'center',
    },
  },
  organisationField: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(),
      marginBottom: 0,
    },
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
