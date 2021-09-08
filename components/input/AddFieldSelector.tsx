import React from "react";
import { makeStyles } from "@material-ui/core";
import Select, { OnChangeValue } from "react-select";
import { ExtraFieldType } from "../../pages/contacts/create";
import { COLORS } from '../../src/colors';
import { SelectValue } from "../tables/contactsTableTags";

const addFieldOptions = [
  "LinkedIn",
  "Instagram",
  "Twitter",
  "Facebook",
  "Website",
  "Other",
];

interface AddFieldSelectorProps {
  addedFields?: ExtraFieldType[];
  onChange: (value: OnChangeValue<SelectValue, false>) => void;
}

const addFieldStyles = {
  dropdownIndicator: (base: any) => ({
    ...base,
    color: COLORS.white,
  }),
  menu: (provided: any) => ({ ...provided, zIndex: 9999 }),
  control: (styles: any) => ({
    ...styles,
    backgroundColor: COLORS.primaryBlue,
  }),
  input: (styles: any) => ({ ...styles, color: COLORS.white }),
  placeholder: (styles: any) => ({ ...styles, color: COLORS.white }),
};

export default function AddFieldSelector({
  addedFields = [],
  onChange,
}: AddFieldSelectorProps) {
  const classes = useStyles();

  return (
    <Select
      className={classes.addFieldDropdown}
      styles={addFieldStyles}
      instanceId="addField"
      options={addFieldOptions
        .filter(
          (str) =>
            str === "Other" ||
            !(addedFields.filter((field) => field.fieldType === str).length > 0)
        )
        .map((str) => ({ value: str, label: str }))}
      value={null}
      onChange={onChange}
      isSearchable={true}
      placeholder={"Add field..."}
      isClearable={true}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  topSpacing: {
    marginTop: theme.spacing(),
  },
  addFieldDropdown: {
    fontSize: "1rem",
    marginTop: theme.spacing(2),
    width: "25%",
    [theme.breakpoints.down("sm")]: {
      width: "40%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));
