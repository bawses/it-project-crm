import React from "react";
import {
  Typography,
  makeStyles,
  IconButton,
  Paper,
  Container,
} from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import StarIcon from "@material-ui/icons/Star";
import { COLORS } from "../../lib/Colors";
import DEFAULT_IMAGE from "../../assets/building-1062.png";
import Image from "next/image";
import Link from "next/link";

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
              <Link href={`/organisations/${selectedOrg._id}`} passHref>
              <Paper elevation={3} className={classes.selectedOrg}>
                <div className={classes.companyImageDiv}>
                  <Image
                    className={classes.companyImage}
                    src={
                      typeof selectedOrg.imageUrl === "string" &&
                      selectedOrg.imageUrl
                        ? selectedOrg.imageUrl
                        : DEFAULT_IMAGE
                    }
                    alt="Organisation image"
                    width={25}
                    height={25}
                  />
                </div>
                <Typography>{selectedOrg.name}</Typography>
              </Paper>
              </Link>
            </div>
          )}
          {!!manualOrg && (
            <div className={classes.organisationField}>
              <Paper elevation={3} className={classes.selectedOrg}>
                <Typography>{manualOrg}</Typography>
              </Paper>
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
  companyImageDiv: {
    margin: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyImage: {
    borderRadius: "50%",
  },
  organisationField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(),
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      flexGrow: 1,
      marginLeft: theme.spacing(),
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(),
      marginBottom: 0,
    },
  },
  selectedOrg: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    [theme.breakpoints.down("xs")]: {
      padding: 10,
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
  responsiveRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      justifyContent: "space-between",
    },
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
