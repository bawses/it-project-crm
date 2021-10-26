import React from "react";
import { makeStyles, IconButton, Tooltip, Typography } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import SettingsIcon from "@material-ui/icons/Settings";

interface ProfileOptionsProps {
  onPressEdit?: () => void;
  onPressSettings?: () => void;
  isOrganisation?: boolean;
}

export default function ProfileOptions({
  onPressEdit = () => {},
  onPressSettings = () => {},
  isOrganisation = false,
}: ProfileOptionsProps) {
  const classes = useStyles();

  return (
    <div className={classes.profileOptionsMenu}>
      <Typography variant="h3" component="h3" className={classes.pageTitle}>
        My {isOrganisation ? "Organisation" : ""} Profile
      </Typography>
      <div style={{display: 'flex', flexDirection: 'row'}}>
      <Tooltip title="Edit">
        <IconButton onClick={onPressEdit}>
          <Edit className={classes.icon} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Account settings">
        <IconButton onClick={onPressSettings}>
          <SettingsIcon className={classes.icon} />
        </IconButton>
      </Tooltip>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  profileOptionsMenu: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    fontSize: 37,
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
    },
  },
  pageTitle: {
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
}));
