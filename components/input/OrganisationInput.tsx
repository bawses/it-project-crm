import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import OrganisationSelector, { orgSelectValue } from "./OrganisationSelector";
import { OnChangeValue } from "react-select";
import { IOrganisation } from "../../lib/DataTypes";

interface OrganisationInputProps {
  selectedOrg: OnChangeValue<orgSelectValue, false> | null;
  selectOnChange: (value: OnChangeValue<orgSelectValue, false>) => void;
  organisations?: IOrganisation[];
  manualValue: string;
  manualOnChange: (event: any) => void;
}

export default function OrganisationInput({
  selectedOrg,
  selectOnChange,
  organisations = [],
  manualValue,
  manualOnChange,
}: OrganisationInputProps) {
  const classes = useStyles();

  return (
    <div className={classes.responsiveRow}>
      <div className={classes.responsiveField}>
        <OrganisationSelector
          selectedOrganisation={selectedOrg}
          onChange={selectOnChange}
          organisations={organisations}
        />
      </div>
      <div
        className={`${classes.responsiveField} ${classes.responsiveSpacing}`}
      >
        <TextField
          id="manualOrganisation"
          label="Manually enter organisation"
          variant="filled"
          fullWidth
          value={manualValue}
          onChange={manualOnChange}
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
