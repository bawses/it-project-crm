import React, { SyntheticEvent } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { COLORS } from "../../lib/Colors";

interface EditContactOptionsProps {
  onCancel?: () => void;
  onSubmit?: (event: SyntheticEvent) => void;
}

export default function EditContactOptions({
  onCancel = () => {},
  onSubmit = (event: SyntheticEvent) => {},
}: EditContactOptionsProps) {
  const classes = useStyles();

  return (
    <div className={classes.formOptions}>
      <Button
        variant="contained"
        type="button"
        onClick={onCancel}
        className={`${classes.formButton} ${classes.cancelButton}`}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        type="submit"
        onClick={onSubmit}
        color="secondary"
        className={`${classes.formButton} ${classes.submitButton}`}
      >
        Create contact
      </Button>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  formOptions: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: theme.spacing(),
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  formButton: {
    fontWeight: "bold",
    width: "20%",
    margin: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "30%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "70%",
      margin: theme.spacing(),
    },
  },
  cancelButton: {
    backgroundColor: COLORS.white,
  },
  submitButton: {},
}));
