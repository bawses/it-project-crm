import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { COLORS } from "../../lib/Colors";
import Select, { OnChangeValue } from "react-select";

const options = [
  {
    value: "archive",
    label: "Archive contact",
  },
  {
    value: "unarchive",
    label: "Retrieve from archive",
  },
  {
    value: "delete",
    label: "Delete contact",
  },
];

interface ContactOptionsProps {
  isArchived: boolean;
  onChange: (value: OnChangeValue<{ value: string; label: string }, false>) => void;
  onPressEdit?: () => void;
}

const contactOptionsStyles = {
  dropdownIndicator: (base: any) => ({
    ...base,
    color: COLORS.white,
  }),
  menu: (provided: any) => ({ ...provided, zIndex: 9999 }),
  control: (styles: any) => ({
    ...styles,
    backgroundColor: COLORS.primaryBlue,
  }),
  placeholder: (styles: any) => ({ ...styles, color: COLORS.white }),
};

export default function ContactOptions({
  isArchived,
  onChange,
  onPressEdit = () => {},
}: ContactOptionsProps) {
  const classes = useStyles();

  return (
    <div className={classes.contactOptionsMenu}>
      <Select
        className={classes.contactOptionsBtn}
        styles={contactOptionsStyles}
        instanceId="contactOptions"
        options={
          isArchived
            ? options.filter((option) => option.value !== "archive")
            : options.filter((option) => option.value !== "unarchive")
        }
        value={null}
        placeholder={"Added to my contacts"}
        onChange={onChange}
        isSearchable={false}
        isClearable={false}
      />
      <IconButton onClick={() => onPressEdit}>
        <Edit className={classes.editIcon} />
      </IconButton>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  contactOptionsBtn: {
    fontSize: "1rem",
    width: 220,
    [theme.breakpoints.down("sm")]: {
      width: 200,
      fontSize: "0.8rem",
    },
  },
  contactOptionsMenu: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  editIcon: {
    fontSize: 35,
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
    },
  },
}));
