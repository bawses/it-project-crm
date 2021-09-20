import React from "react";
import { makeStyles, IconButton, Tooltip } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import SettingsIcon from "@material-ui/icons/Settings";

interface ProfileOptionsProps {
  onPressEdit?: () => void;
  onPressSettings?: () => void;
}

export default function ProfileOptions({
  onPressEdit = () => {},
  onPressSettings = () => {},
}: ProfileOptionsProps) {
  const classes = useStyles();

  return (
    <div className={classes.profileOptionsMenu}>
      <Tooltip title="Edit">
        <IconButton onClick={onPressEdit}>
          <Edit className={classes.icon} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Settings">
      <IconButton onClick={onPressSettings}>
        <SettingsIcon className={classes.icon} />
      </IconButton>
      </Tooltip>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  profileOptionsMenu: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  icon: {
    fontSize: 35,
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
    },
  },
}));
