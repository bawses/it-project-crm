import React from "react";
import { Paper, Typography, makeStyles } from "@material-ui/core";
import {
  Mail,
  Phone,
  Business,
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
  Language,
} from "@material-ui/icons";
import { ContactDetailsType } from "../../pages/contacts/view";

interface ContactDetailsProps {
  fieldValues: ContactDetailsType;
}

export default function ContactDetails({ fieldValues }: ContactDetailsProps) {
  const classes = useStyles();

  const fieldCreator = (
    fieldType: string,
    fieldValue: string,
    index: number
  ) => {
    return (
      <div className={classes.iconRow} key={index.toString()}>
        {fieldType === "Facebook" && <Facebook className={classes.icon} />}
        {fieldType === "Instagram" && <Instagram className={classes.icon} />}
        {fieldType === "LinkedIn" && <LinkedIn className={classes.icon} />}
        {fieldType === "Twitter" && <Twitter className={classes.icon} />}
        {fieldType === "Website" && <Language className={classes.icon} />}
        {fieldType === "Other" && <Language className={classes.icon} />}
        <Typography
          id={fieldType + index.toString()}
          className={classes.topSpacing}
        >
          {fieldValue}
        </Typography>
      </div>
    );
  };

  return (
    <div>
      <Paper
        elevation={3}
        className={`${classes.otherDetails} ${classes.topSpacing}`}
      >
        <div className={classes.responsiveRow}>
          <div className={`${classes.iconRow} ${classes.responsiveField}`}>
            <Mail className={classes.icon} />
            <div className={classes.inputFields}>
              <Typography>{fieldValues.primaryEmail}</Typography>
              <Typography className={classes.topSpacing}>
                {fieldValues.secondaryEmail}
              </Typography>
            </div>
          </div>
          <div
            className={`${classes.iconRow} ${classes.responsiveField} ${classes.responsiveSpacing}`}
          >
            <Phone className={classes.icon} />
            <div className={classes.inputFields}>
              <Typography>{fieldValues.primaryPhone}</Typography>
              <Typography className={classes.topSpacing}>
                {fieldValues.secondaryPhone}
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.iconRow}>
          <Business className={classes.icon} />
          <Typography className={classes.topSpacing}>
            {fieldValues.address}
          </Typography>
        </div>
        {fieldValues.links &&
          fieldValues.links.map((field, index) =>
            fieldCreator(field.fieldType, field.fieldValue, index)
          )}
      </Paper>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  otherDetails: {
    borderRadius: 10,
    padding: 25,
    [theme.breakpoints.down("xs")]: {
      padding: 20,
    },
  },
  topSpacing: {
    marginTop: theme.spacing(),
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
  responsiveField: {
    flexGrow: 1,
  },
  responsiveSpacing: {
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(),
    },
  },
  inputFields: {
    width: "100%",
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
