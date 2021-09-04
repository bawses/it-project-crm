import React from "react";
import { makeStyles, IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { COLORS } from "../../src/colors";
import Select, { OptionTypeBase } from "react-select";

const options = [
  {
    value: "archive",
    label: "Archive contact",
  },
  {
    value: "delete",
    label: "Delete contact",
  },
];

interface ContactOptionsProps {
  onPressArchive?: () => void;
  onPressDelete?: () => void;
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
  onPressArchive = () => {},
  onPressDelete = () => {},
  onPressEdit = () => {},
}: ContactOptionsProps) {
  const classes = useStyles();

  return (
    <div className={classes.contactOptionsMenu}>
      <Select
        className={classes.contactOptionsBtn}
        styles={contactOptionsStyles}
        instanceId="contactOptions"
        options={options}
        value={null}
        placeholder={"Added to my contacts"}
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
