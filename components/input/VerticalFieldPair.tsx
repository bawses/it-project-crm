import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { Mail, Phone } from "@material-ui/icons";

interface VerticalFieldPairProps {
  iconType?: string;
  topId: string;
  bottomId: string;
  topLabel: string;
  bottomLabel: string;
  topValue: string;
  bottomValue: string;
  topOnChange: (event: any) => void;
  bottomOnChange: (event: any) => void;
}

export default function VerticalFieldPair({
  iconType = "",
  topId,
  bottomId,
  topLabel,
  bottomLabel,
  topValue,
  bottomValue,
  topOnChange,
  bottomOnChange,
}: VerticalFieldPairProps) {
  const classes = useStyles();

  return (
    <div
      className={
        iconType === "email"
          ? classes.responsiveField
          : `${classes.responsiveField} ${classes.responsiveSpacing}`
      }
    >
      {iconType === "email" && <Mail className={classes.icon} />}
      {iconType === "phone" && <Phone className={classes.icon} />}
      <div className={classes.inputFields}>
        <TextField
          size="small"
          variant="filled"
          id={topId}
          label={topLabel}
          fullWidth
          value={topValue}
          onChange={topOnChange}
        />
        <TextField
          size="small"
          variant="filled"
          id={bottomId}
          label={bottomLabel}
          fullWidth
          value={bottomValue}
          onChange={bottomOnChange}
          className={classes.topSpacing}
        />
      </div>
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
  inputFields: {
    width: "100%",
  },
  responsiveField: {
    width: "48%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  responsiveSpacing: {
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(),
    },
  },
}));
