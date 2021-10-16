import React from "react";
import { Paper, Typography, makeStyles, Divider } from "@material-ui/core";
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
import { IContact } from "../../lib/UnifiedDataType";
import { IOrganisation, IUser } from "../../lib/DataTypes";

interface ContactDetailsProps {
  fieldValues?: IContact | IUser | IOrganisation;
}

export default function ContactDetails({ fieldValues }: ContactDetailsProps) {
  const classes = useStyles();

  const linksList = (fieldValues?: IContact | IUser | IOrganisation) => {
    const links = fieldValues?.links;
    let list = [];
    if (links?.facebook) {
      list.push({ fieldType: "Facebook", fieldValue: links.facebook });
    }
    if (links?.instagram) {
      list.push({ fieldType: "Instagram", fieldValue: links.instagram });
    }
    if (links?.linkedIn) {
      list.push({ fieldType: "LinkedIn", fieldValue: links.linkedIn });
    }
    if (links?.twitter) {
      list.push({ fieldType: "Twitter", fieldValue: links.twitter });
    }
    if (links?.website) {
      list.push({ fieldType: "Website", fieldValue: links.website });
    }
    if (links?.other) {
      const otherLinks = links.other.map((link) => ({
        fieldType: "Other",
        fieldValue: link,
      }));
      list = list.concat(otherLinks);
    }
    return list;
  };

  const fieldCreator = (
    fieldType: string,
    fieldValue: string,
    index: number
  ) => {
    return (
      <div key={index.toString()}>
        {index !== 0 && <Divider />}
        <div className={classes.iconRow}>
          {fieldType === "Facebook" && <Facebook className={classes.icon} />}
          {fieldType === "Instagram" && <Instagram className={classes.icon} />}
          {fieldType === "LinkedIn" && <LinkedIn className={classes.icon} />}
          {fieldType === "Twitter" && <Twitter className={classes.icon} />}
          {fieldType === "Website" && <Language className={classes.icon} />}
          {fieldType === "Other" && <Language className={classes.icon} />}
          <a id={fieldType + index.toString()} href={fieldValue}>
            <Typography className={`${classes.wrapText} ${classes.topSpacing}`}>
              {fieldValue}
            </Typography>
          </a>
        </div>
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
          {fieldValues?.email &&
            fieldValues.email.length > 0 &&
            fieldValues.email[0] && (
              <div className={`${classes.iconRow} ${classes.responsiveField}`}>
                <Mail className={classes.icon} />
                <div className={classes.inputFields}>
                  <a
                    href={`mailto:${fieldValues.email[0]}?subject=Connecting to you from CataLog`}
                  >
                    <Typography className={classes.wrapText}>
                      {fieldValues.email[0]}
                    </Typography>
                  </a>
                  <a
                    href={
                      fieldValues.email.length > 1
                        ? `mailto:${fieldValues.email[1]}?subject=Connecting to you from CataLog`
                        : "#"
                    }
                  >
                    <Typography
                      className={`${classes.wrapText} ${classes.topSpacing}`}
                    >
                      {fieldValues.email.length > 1 ? fieldValues.email[1] : ""}
                    </Typography>
                  </a>
                </div>
              </div>
            )}
          {fieldValues?.phone &&
            fieldValues.phone.length > 0 &&
            fieldValues.phone[0] && (
              <div
                className={`${classes.iconRow} ${classes.responsiveField} ${classes.responsiveSpacing}`}
              >
                <Phone className={classes.icon} />
                <div className={classes.inputFields}>
                  <Typography>{fieldValues.phone[0]}</Typography>
                  <Typography className={classes.topSpacing}>
                    {fieldValues.phone.length > 1 ? fieldValues.phone[1] : ""}
                  </Typography>
                </div>
              </div>
            )}
        </div>
        {fieldValues?.location && (
          <>
            <Divider />
            <div className={classes.iconRow}>
              <Business className={classes.icon} />
              <Typography className={classes.topSpacing}>
                {fieldValues?.location}
              </Typography>
            </div>
          </>
        )}
        <Divider />
        {linksList(fieldValues).map((field, index) =>
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
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
  },
  wrapText: {
    overflowWrap: "break-word",
    wordWrap: "break-word",
    wordBreak: "break-word",
  },
}));
