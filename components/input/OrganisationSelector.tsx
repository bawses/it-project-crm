import React from "react";
import { makeStyles } from "@material-ui/core";
import Select, { OnChangeValue } from "react-select";
import { SelectValue } from "../tables/contactsTableTags";
import { IOrganisation } from "../../lib/DataTypes";

interface OrganisationSelectorProps {
  selectedOrganisation: OnChangeValue<SelectValue, false> | null;
  onChange: (value: OnChangeValue<SelectValue, false>) => void;
  organisations?: IOrganisation[];
}

export default function OrganisationSelector({
  selectedOrganisation,
  onChange,
  organisations = [],
}: OrganisationSelectorProps) {
  const classes = useStyles();

  return (
    <div className={classes.topSpacing}>
      <Select
        instanceId="organisationSelector"
        options={organisations
          .filter((org) => !selectedOrganisation || org._id !== selectedOrganisation.value)
          .map((org) => ({ value: org._id, label: org.name }))}
        value={selectedOrganisation}
        onChange={onChange}
        isSearchable={true}
        placeholder={"Select organisation..."}
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
