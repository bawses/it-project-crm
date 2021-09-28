import React from "react";
import { makeStyles, TextField } from "@material-ui/core";

interface ResponsiveFieldPairProps {
  small?: boolean;
  leftId: string;
  rightId: string;
  leftLabel: string;
  rightLabel: string;
  leftValue: string;
  rightValue: string;
  leftOnChange: (event: any) => void;
  rightOnChange: (event: any) => void;
  required?: boolean;
}

export default function ResponsiveFieldPair({
  small = false,
  leftId,
  rightId,
  leftLabel,
  rightLabel,
  leftValue,
  rightValue,
  leftOnChange,
  rightOnChange,
  required = false,
}: ResponsiveFieldPairProps) {
  const classes = useStyles();

  return (
    <div className={classes.responsiveRow}>
      <div className={classes.responsiveField}>
        <TextField
          size={small ? "small" : undefined}
          id={leftId}
          label={leftLabel}
          variant="filled"
          fullWidth
          value={leftValue}
          onChange={leftOnChange}
          required={required}
        />
      </div>
      <div className={classes.responsiveField}>
        <TextField
          size={small ? "small" : undefined}
          id={rightId}
          label={rightLabel}
          variant="filled"
          fullWidth
          value={rightValue}
          onChange={rightOnChange}
          required={required}
        />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  responsiveRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  responsiveField: {
    width: "48%",
    marginTop: theme.spacing(),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));
