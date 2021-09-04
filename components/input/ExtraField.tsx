import React from "react";
import {
  Typography,
  makeStyles,
  TextField,
  IconButton,
} from "@material-ui/core";
import {
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
  Language,
  Cancel,
} from "@material-ui/icons";

interface ExtraFieldProps {
  index: number;
  fieldType: string;
  fieldValue: string;
  handleChange?: (event: any) => void;
  onPressDelete?: () => void;
}

export default function ExtraField({
  index,
  fieldType,
  fieldValue,
  handleChange = (event: any) => {},
  onPressDelete = () => {},
}: ExtraFieldProps) {
  const classes = useStyles();

  return (
    <div className={classes.iconRow}>
      {fieldType === "Facebook" && <Facebook className={classes.icon} />}
      {fieldType === "Instagram" && <Instagram className={classes.icon} />}
      {fieldType === "LinkedIn" && <LinkedIn className={classes.icon} />}
      {fieldType === "Twitter" && <Twitter className={classes.icon} />}
      {fieldType === "Website" && <Language className={classes.icon} />}
      {fieldType === "Other" && <Language className={classes.icon} />}
      <TextField
        size="small"
        variant="filled"
        id={fieldType + index.toString()}
        label={fieldType}
        value={fieldValue}
        className={classes.topSpacing}
        onChange={handleChange}
        fullWidth
      />
      <IconButton onClick={onPressDelete}>
        <Cancel />
      </IconButton>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  topSpacing: {
    marginTop: theme.spacing(),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  iconRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));
