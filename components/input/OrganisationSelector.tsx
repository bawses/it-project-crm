import React from "react";
import { makeStyles, Container, Typography } from "@material-ui/core";
import Select, { OnChangeValue } from "react-select";
import { IOrganisation } from "../../lib/DataTypes";
import DEFAULT_IMAGE from "../../assets/building-1062.png";
import Image from "next/image";

type orgType = {
  _id: string;
  name: string;
  imageUrl?: string;
};

export type orgSelectValue = {
  value: orgType;
  label: string;
};

interface OrganisationSelectorProps {
  selectedOrganisation: OnChangeValue<orgSelectValue, false> | null;
  onChange: (value: OnChangeValue<orgSelectValue, false>) => void;
  organisations?: IOrganisation[];
}

export default function OrganisationSelector({
  selectedOrganisation,
  onChange,
  organisations = [],
}: OrganisationSelectorProps) {
  const classes = useStyles();

  const formatOptionLabel = ({ value, label }: orgSelectValue) => (
    <div className={classes.selectOption}>
      <div className={classes.imageDiv}>
        <Image
          className={classes.image}
          src={
            (typeof value.imageUrl === "string") && value.imageUrl
              ? value.imageUrl
              : DEFAULT_IMAGE
          }
          alt="Profile picture"
          width={22}
          height={22}
        />
      </div>
      <Typography>{label}</Typography>
    </div>
  );

  return (
    <div className={classes.topSpacing}>
      <Select
        instanceId="organisationSelector"
        options={organisations
          .filter(
            (org) =>
              !selectedOrganisation || org._id !== selectedOrganisation.value._id
          )
          .map((org) => ({
            value: { _id: org._id, name: org.name, imageUrl: org.imageUrl },
            label: org.name,
          }))}
        value={selectedOrganisation}
        onChange={onChange}
        isSearchable={true}
        placeholder={"Select organisation..."}
        isClearable={true}
        styles={{
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
        }}
        formatOptionLabel={formatOptionLabel}
        menuPlacement="auto"
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  topSpacing: {
    marginTop: theme.spacing(),
  },
  selectOption: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 5,
    [theme.breakpoints.down("xs")]: {
      margin: 2,
    },
  },
  imageDiv: {
    marginRight: 10,
  },
  image: {
    borderRadius: "50%",
  },
}));
