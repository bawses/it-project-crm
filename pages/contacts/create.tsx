import {
  Paper,
  Container,
  Typography,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { COLORS } from "../../src/colors";
import CustomButton from "../../components/button";
import Image from "next/image";
import DEFAULT_IMAGE from "../../assets/blank-profile-picture-973460_640.png";
import { useState } from "react";
import Select, { OptionTypeBase } from "react-select";

const options = [
  {
    value: "Melbourne, AU",
    label: "Melbourne, AU",
  },
  {
    value: "Sydney, AU",
    label: "Sydney, AU",
  },
  {
    value: "Tokyo, JP",
    label: "Tokyo, JP",
  },
  {
    value: "New York City, USA",
    label: "New York City, USA",
  },
];

const addFieldOptions = [
  {
    value: "linkedin",
    label: "LinkedIn",
  },
  {
    value: "instagram",
    label: "Instagram",
  },
  {
    value: "twitter",
    label: "Twitter",
  },
  {
    value: "facebook",
    label: "Facebook",
  },
  {
    value: "other",
    label: "Other",
  },
];

const useStyles = makeStyles((theme) => ({
  primaryDetailsStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  profilePicDiv: {
    width: "25%",
    margin: 10,
    [theme.breakpoints.down("xs")]: {
      width: "40%",
    },
  },
  primaryDetailsTextfields: {
    width: "100%",
  },
  profilePic: {
    borderRadius: "50%",
  },
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
  titleField: {},
  locationSelector: {},
  textfieldLabel: {
    fontSize: "0.8rem",
  },
  formOptions: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  formButton: {
    fontWeight: "bold",
    width: "20%",
    margin: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "30%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "70%",
    },
  },
  cancelButton: {
    backgroundColor: COLORS.inactiveGrey,
  },
  submitButton: {
  },
}));

type ContactDetailsType = {
  firstName: string;
  lastName: string;
  title: string;
  primaryOrg: string;
  secondaryOrg: string;
  primaryEmail: string;
  secondaryEmail: string;
  primaryPhone: string;
  secondaryPhone: string;
  address: string;
};

type ExtraFieldType = {
  fieldType: string;
  fieldValue: string;
};

export default function CreateContact() {
  const classes = useStyles();
  const [location, setLocation] = useState<OptionTypeBase | null>(null);
  const [fieldValues, setFieldValues] = useState<ContactDetailsType>({
    firstName: "",
    lastName: "",
    title: "",
    primaryOrg: "",
    secondaryOrg: "",
    primaryEmail: "",
    secondaryEmail: "",
    primaryPhone: "",
    secondaryPhone: "",
    address: "",
  });
  const [extraFields, setExtraFields] = useState<ExtraFieldType[]>([]);

  const fieldCreator = (fieldType: string, fieldValue: string) => {
    return (
      <TextField
        key={fieldType}
        id={fieldType}
        label={fieldType}
        value={fieldValue}
        onChange={(event) => handleExtraField(fieldType, event.target.value)}
        fullWidth
      />
    );
  };

  const handleChange = (fieldType: string, fieldValue: string) => {
    setFieldValues({ ...fieldValues, [fieldType]: fieldValue });
  };

  const handleExtraField = (fieldType: string, fieldValue: string) => {
    const newExtraFields = extraFields.map((field) =>
      field.fieldType === fieldType
        ? { fieldType: field.fieldType, fieldValue: fieldValue }
        : field
    );
    setExtraFields(newExtraFields);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(`Form data: ${JSON.stringify(fieldValues)}`);
    console.log(`Location: ${location ? location.value : "None selected"}`);
    console.log("Extra fields:");
    for (let field of extraFields) {
      console.log(JSON.stringify(field));
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" component="h5">
        Create a manual contact
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div className={classes.primaryDetailsStyle}>
          <div className={classes.profilePicDiv}>
            <Image
              className={classes.profilePic}
              src={DEFAULT_IMAGE}
              alt="Profile picture"
            />
          </div>
          <div className={classes.primaryDetailsTextfields}>
            <div className={classes.responsiveRow}>
              <div className={classes.responsiveField}>
                <TextField
                  id="firstName"
                  label="First name"
                  fullWidth
                  value={fieldValues.firstName}
                  onChange={(event) =>
                    handleChange("firstName", event.target.value)
                  }
                />
              </div>
              <div className={classes.responsiveField}>
                <TextField
                  id="lastName"
                  label="Last name"
                  fullWidth
                  value={fieldValues.lastName}
                  onChange={(event) =>
                    handleChange("lastName", event.target.value)
                  }
                />
              </div>
            </div>
            <TextField
              id="title"
              label="Title"
              fullWidth
              value={fieldValues.title}
              onChange={(event) => handleChange("title", event.target.value)}
            />
            <Select
              instanceId="locationSelector"
              options={options}
              value={location}
              onChange={(value) => setLocation(value)}
              isSearchable={true}
              placeholder={"Select location..."}
              isClearable={true}
              styles={{
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
              }}
            />
            <div className={classes.responsiveRow}>
              <div className={classes.responsiveField}>
                <TextField
                  id="primaryOrganisation"
                  label="Primary organisation"
                  variant="filled"
                  InputLabelProps={{ className: classes.textfieldLabel }}
                  fullWidth
                  value={fieldValues.primaryOrg}
                  onChange={(event) =>
                    handleChange("primaryOrg", event.target.value)
                  }
                />
              </div>
              <div className={classes.responsiveField}>
                <TextField
                  id="secondaryOrganisation"
                  label="Secondary organisation"
                  variant="filled"
                  InputLabelProps={{ className: classes.textfieldLabel }}
                  fullWidth
                  value={fieldValues.secondaryOrg}
                  onChange={(event) =>
                    handleChange("secondaryOrg", event.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.responsiveRow}>
          <div className={classes.responsiveField}>
            <TextField
              id="primaryEmail"
              label="Primary email"
              fullWidth
              value={fieldValues.primaryEmail}
              onChange={(event) =>
                handleChange("primaryEmail", event.target.value)
              }
            />
            <TextField
              id="secondaryEmail"
              label="Secondary email"
              fullWidth
              value={fieldValues.secondaryEmail}
              onChange={(event) =>
                handleChange("secondaryEmail", event.target.value)
              }
            />
          </div>
          <div className={classes.responsiveField}>
            <TextField
              id="primaryPhone"
              label="Primary phone"
              fullWidth
              value={fieldValues.primaryPhone}
              onChange={(event) =>
                handleChange("primaryPhone", event.target.value)
              }
            />
            <TextField
              id="secondaryPhone"
              label="Secondary phone"
              fullWidth
              value={fieldValues.secondaryPhone}
              onChange={(event) =>
                handleChange("secondaryPhone", event.target.value)
              }
            />
          </div>
        </div>
        <TextField
          id="workAddress"
          label="Work address"
          fullWidth
          value={fieldValues.address}
          onChange={(event) => handleChange("address", event.target.value)}
        />
        {extraFields.map((field) =>
          fieldCreator(field.fieldType, field.fieldValue)
        )}
        <Select
          instanceId="addField"
          options={addFieldOptions}
          value={null}
          onChange={(value) => {
            if (value) {
              // New field selected, so add this text field to page
              setExtraFields([
                ...extraFields,
                { fieldType: value.label, fieldValue: "" },
              ]);
              // If added field is not "other",
              // remove it from the remaining field options
              if (value.value !== "other") {
                const fieldTypeIndex = addFieldOptions.findIndex(
                  (field) => field.value === value.value
                );
                if (fieldTypeIndex >= 0) {
                  addFieldOptions.splice(fieldTypeIndex, 1);
                }
              }
            }
          }}
          isSearchable={true}
          placeholder={"Add field..."}
          isClearable={true}
          styles={{
            menu: (provided) => ({ ...provided, zIndex: 9999 }),
          }}
        />
        <div className={classes.formOptions}>
          <Button
            variant="contained"
            type="button"
            onClick={() => {}}
            className={`${classes.formButton} ${classes.cancelButton}`}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            color="secondary"
            className={`${classes.formButton} ${classes.submitButton}`}
          >
            Create contact
          </Button>
        </div>
      </form>
    </Container>
  );
}
