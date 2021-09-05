import React from "react";
import { makeStyles } from "@material-ui/core";
import Select, { OnChangeValue } from "react-select";
import { SelectValue } from "../contactsTableTags";

interface LocationSelectorProps {
  selectedLocation: OnChangeValue<SelectValue, false> | null;
  onChange: (value: OnChangeValue<SelectValue, false>) => void;
}

const options = [
  "Melbourne, AU",
  "Sydney, AU",
  "Tokyo, JP",
  "New York City, USA",
];

export default function LocationSelector({
  selectedLocation,
  onChange,
}: LocationSelectorProps) {
  const classes = useStyles();

  return (
    <div className={classes.topSpacing}>
      <Select
        instanceId="locationSelector"
        options={options
          .filter((str) => !selectedLocation || str !== selectedLocation.value)
          .map((str) => ({ value: str, label: str }))}
        value={selectedLocation}
        onChange={onChange}
        isSearchable={true}
        placeholder={"Select location..."}
        isClearable={true}
        styles={{
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
        }}
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  topSpacing: {
    marginTop: theme.spacing(),
  },
}));
