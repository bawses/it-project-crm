import React from "react";
import { makeStyles } from "@material-ui/core";
import Select, { OnChangeValue } from "react-select";
import { SelectValue } from "../tables/contactsTableTags";
import { AusCities } from "../../backend/AusCities";

interface LocationSelectorProps {
  selectedLocation: OnChangeValue<SelectValue, false> | null;
  onChange: (value: OnChangeValue<SelectValue, false>) => void;
}

const options = AusCities.map((city) => `${city.city}, ${city.admin_name}, AU`).sort();

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
