import React from "react";
import { makeStyles, IconButton, Tooltip } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { COLORS } from "../../lib/Colors";
import Select, { OnChangeValue } from "react-select";
import TextButton from "./TextButton";

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
  {
    value: "remove",
    label: "Remove from contacts",
  },
];

interface ContactOptionsProps {
  isArchived?: boolean;
  isManual: boolean;
  isAdded?: boolean;
  onChange: (
    value: OnChangeValue<{ value: string; label: string }, false>
  ) => void;
  onPressEdit?: () => void;
  onAdd?: () => void;
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
  isArchived = false,
  isManual,
  isAdded = true,
  onChange,
  onPressEdit = () => {},
  onAdd = () => {},
}: ContactOptionsProps) {
  const classes = useStyles();

  const setOptions = () => {
    const finalOptions = isManual
      ? options.filter((option) => option.value !== "remove")
      : options.filter((option) => option.value === "remove");
    return isArchived
      ? finalOptions.filter((option) => option.value !== "archive")
      : finalOptions.filter((option) => option.value !== "unarchive");
  };

  return (
    <div className={classes.contactOptionsMenu}>
      {isAdded && (
        <Select
          className={classes.contactOptionsBtn}
          styles={contactOptionsStyles}
          instanceId="contactOptions"
          options={setOptions()}
          value={null}
          placeholder={"Added to my contacts"}
          onChange={onChange}
          isSearchable={false}
          isClearable={false}
        />
      )}
      {!isAdded && (
        <TextButton
          title="Add to my contacts"
          color={COLORS.actionOrange}
          textColor={COLORS.white}
          onClick={onAdd}
        />
      )}
      {isManual && (
        <Tooltip title="Edit">
          <IconButton onClick={onPressEdit}>
            <Edit className={classes.editIcon} />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  contactOptionsBtn: {
    fontSize: "1rem",
    width: 220,
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
