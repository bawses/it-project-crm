import React, { SyntheticEvent } from "react";
import { makeStyles } from "@material-ui/core";
import { COLORS } from "../../lib/Colors";
import TextButton from "./TextButton";
import LoadingButton from "./LoadingButton";

interface EditContactOptionsProps {
  onCancel?: () => void;
  onSubmit?: (event: SyntheticEvent) => void;
  toSubmitForm?: boolean;
  submitLabel?: string;
  isLoading?: boolean;
}

export default function EditContactOptions({
  onCancel = () => {},
  onSubmit = (event: SyntheticEvent) => {},
  toSubmitForm = true,
  submitLabel = "Create contact",
  isLoading = false,
}: EditContactOptionsProps) {
  const classes = useStyles();

  return (
    <div className={classes.formOptions}>
      <TextButton
        onClick={onCancel}
        className={`${classes.formButton} ${classes.cancelButton}`}
        title="Cancel"
      />
      {!isLoading && <TextButton
        type={toSubmitForm ? "submit" : "button"}
        onClick={onSubmit}
        color={COLORS.actionOrange}
        textColor={COLORS.white}
        className={`${classes.formButton} ${classes.submitButton}`}
        title={submitLabel}
      />}
      {isLoading && <LoadingButton className={`${classes.formButton} ${classes.loadingButton}`}/>}
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
  loadingButton: {
    fontWeight: "bold",
    margin: "5px",
  },
  cancelButton: {
    backgroundColor: COLORS.white,
  },
  submitButton: {},
}));
