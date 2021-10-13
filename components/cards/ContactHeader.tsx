import React from "react";
import { Typography, makeStyles, IconButton, Paper } from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import StarIcon from "@material-ui/icons/Star";
import { COLORS } from "../../lib/Colors";
import DEFAULT_IMAGE from "../../assets/building-1062.png";
import Image from "next/image";

type profileType = "user" | "organisation";

interface ContactHeaderProps {
  type?: profileType;
  firstName?: string;
  lastName?: string;
  title?: string;
  selectedOrg?: {
    _id: string;
    name: string;
    imageUrl?: string;
  } | null;
  manualOrg?: string;
  showStar?: boolean;
  starred?: boolean;
  onStar?: () => void;
  about?: string;
}

export default function ContactHeader({
  type = "user",
  firstName = "",
  lastName = "",
  title = "",
  selectedOrg = null,
  manualOrg = "",
  showStar = true,
  starred = false,
  onStar = () => {},
  about = "",
}: ContactHeaderProps) {
  const classes = useStyles();

  return (
    <div className={classes.profileHeader}>
      <div className={classes.fullNameRow}>
        <Typography variant="h5" component="h1">
          {firstName} {lastName}
        </Typography>
        {showStar && (
          <IconButton onClick={onStar}>
            {!starred && (
              <StarsIcon style={{ fontSize: 35, color: COLORS.inactiveGrey }} />
            )}
            {starred && (
              <StarIcon style={{ fontSize: 35, color: COLORS.starredYellow }} />
            )}
          </IconButton>
        )}
      </div>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      {type === "user" && (
        <div className={classes.responsiveRow}>
          {selectedOrg && (
            <div className={classes.organisationField}>
              <div className={classes.selectedOrg}>
                <Image
                  // className={classes.profilePic}
                  src={
                    typeof selectedOrg.imageUrl === "string" &&
                    selectedOrg.imageUrl
                      ? selectedOrg.imageUrl
                      : DEFAULT_IMAGE
                  }
                  alt="Organisation image"
                  width={20}
                  height={20}
                />
                <Typography>{selectedOrg.name}</Typography>
              </div>
            </div>
          )}
          {!!manualOrg && (
            <div className={classes.organisationField}>
              <Typography>{manualOrg}</Typography>
            </div>
          )}
        </div>
      )}
      {type === "organisation" && about && (
        <Paper elevation={3} className={classes.aboutSection}>
          <Typography>{about}</Typography>
        </Paper>
      )}
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
      justifyContent: "center",
    },
  },
  organisationField: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(),
      marginBottom: 0,
    },
  },
  selectedOrg: {
    display: "flex",
    flexDirection: "row",
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
  aboutSection: {
    borderRadius: 10,
    padding: 22,
    [theme.breakpoints.down("xs")]: {
      padding: 15,
    },
    marginTop: theme.spacing(),
  },
}));
