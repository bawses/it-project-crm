import {
  Paper,
  Container,
  Typography,
  makeStyles,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import {
  Mail,
  Phone,
  Business,
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
  Language,
  Cancel,
} from "@material-ui/icons";
import { COLORS } from "../../src/colors";
import Image from "next/image";
import DEFAULT_IMAGE from "../../assets/blank-profile-picture-973460_640.png";
import { useState } from "react";
import Select, { OnChangeValue } from "react-select";

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
    value: "LinkedIn",
    label: "LinkedIn",
  },
  {
    value: "Instagram",
    label: "Instagram",
  },
  {
    value: "Twitter",
    label: "Twitter",
  },
  {
    value: "Facebook",
    label: "Facebook",
  },
  {
    value: "Website",
    label: "Website",
  },
  {
    value: "Other",
    label: "Other",
  },
];

const useStyles = makeStyles((theme) => ({
  containerStyle: {
    width: "100%",
    marginTop: "5%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
      marginTop: 0,
    },
  },
  primaryDetailsStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  profilePicDiv: {
    width: "25%",
    margin: 10,
    [theme.breakpoints.down("sm")]: {
      width: "30%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "50%",
    },
  },
  inputFields: {
    width: "100%",
  },
  topSpacing: {
    marginTop: theme.spacing(),
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
  icon: {
    marginRight: theme.spacing(2),
  },
  iconRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
  titleField: {},
  locationSelector: {
    fontSize: "1rem",
  },
  textfieldLabel: {
    fontSize: "0.8rem",
  },
  otherDetails: {
    borderRadius: 10,
    padding: 25,
    [theme.breakpoints.down("xs")]: {
      padding: 20,
    },
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
  formButton: {
    fontWeight: "bold",
    width: "20%",
    margin: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "30%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "70%",
      margin: theme.spacing(),
    },
  },
  cancelButton: {
    backgroundColor: COLORS.white,
  },
  submitButton: {},
}));

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
  const [location, setLocation] = useState<OnChangeValue<{ value: string, label: string }, false> | null>(null);
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

  const fieldCreator = (
    index: number,
    fieldType: string,
    fieldValue: string
  ) => {
    return (
      <div className={classes.iconRow} key={index.toString()}>
        {fieldType === "Facebook" && <Facebook className={classes.icon} />}
        {fieldType === "Instagram" && <Instagram className={classes.icon} />}
        {fieldType === "LinkedIn" && <LinkedIn className={classes.icon} />}
        {fieldType === "Twitter" && <Twitter className={classes.icon} />}
        {fieldType === "Website" && <Language className={classes.icon} />}
        {fieldType === "Other" && <Language className={classes.icon} />}
        <TextField
          size="small"
          variant="filled"
          id={fieldType + index.toString()}
          label={fieldType}
          value={fieldValue}
          className={classes.topSpacing}
          onChange={(event) =>
            handleExtraField(fieldType, event.target.value, index)
          }
          fullWidth
        />
        <IconButton onClick={() => { deleteField(index, fieldType); }}>
          <Cancel />
        </IconButton>
      </div>
    );
  };

  const deleteField = (index: number, fieldType: string) => {
    const newExtraFields = extraFields.filter((field, i) => i !== index);
    if (fieldType !== "Other") {
      addFieldOptions.push({ value: fieldType, label: fieldType });
    }
    setExtraFields(newExtraFields);

  };

  const handleChange = (fieldType: string, fieldValue: string) => {
    setFieldValues({ ...fieldValues, [fieldType]: fieldValue });
  };

  const handleExtraField = (
    fieldType: string,
    fieldValue: string,
    index: number
  ) => {
    const newExtraFields = extraFields.map((field, i) =>
      field.fieldType === fieldType && i === index
        ? { fieldType: field.fieldType, fieldValue: fieldValue }
        : field
    );
    setExtraFields(newExtraFields);
  };

  const handleAddedField = (value: OnChangeValue<{ value: string, label: string }, false> | null) => {
    if (value) {
      // New field selected, so add this text field to page
      setExtraFields([
        ...extraFields,
        { fieldType: value.label, fieldValue: "" },
      ]);
      // If added field is not "other",
      // remove it from the remaining field options
      if (value.value !== "Other") {
        const fieldTypeIndex = addFieldOptions.findIndex(
          (field) => field.value === value.value
        );
        if (fieldTypeIndex >= 0) {
          addFieldOptions.splice(fieldTypeIndex, 1);
        }
      }
    }
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(`Form data: ${JSON.stringify(fieldValues)}`);
    console.log(`Location: ${location ? location.value : "None selected"}`);
    console.log("Extra fields array:");
    for (let field of extraFields) {
      console.log(JSON.stringify(field));
    }
  };

  return (
    <Container maxWidth="md" className={classes.containerStyle}>
      <Typography variant="h5" component="h5">
        Create a manual contact
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <div className={classes.primaryDetailsStyle}>
          <Container className={classes.profilePicDiv}>
            <Image
              className={classes.profilePic}
              src={DEFAULT_IMAGE}
              alt="Profile picture"
            />
          </Container>
          <div className={classes.inputFields}>
            <div className={classes.responsiveRow}>
              <div
                className={`${classes.responsiveField} ${classes.topSpacing}`}
              >
                <TextField
                  size="small"
                  variant="filled"
                  id="firstName"
                  label="First name"
                  fullWidth
                  value={fieldValues.firstName}
                  onChange={(event) =>
                    handleChange("firstName", event.target.value)
                  }
                />
              </div>
              <div
                className={`${classes.responsiveField} ${classes.topSpacing}`}
              >
                <TextField
                  size="small"
                  variant="filled"
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
              size="small"
              variant="filled"
              id="title"
              label="Title"
              fullWidth
              value={fieldValues.title}
              onChange={(event) => handleChange("title", event.target.value)}
              className={classes.topSpacing}
            />
            <div className={classes.topSpacing}>
              <Select
                className={classes.locationSelector}
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
            </div>
            <div className={classes.responsiveRow}>
              <div
                className={`${classes.responsiveField} ${classes.topSpacing}`}
              >
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
              <div
                className={`${classes.responsiveField} ${classes.topSpacing}`}
              >
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
        <Paper
          elevation={3}
          className={`${classes.otherDetails} ${classes.topSpacing}`}
        >
          <div className={classes.responsiveRow}>
            <div className={`${classes.iconRow} ${classes.responsiveField}`}>
              <Mail className={classes.icon} />
              <div className={classes.inputFields}>
                <TextField
                  size="small"
                  variant="filled"
                  id="primaryEmail"
                  label="Primary email"
                  fullWidth
                  value={fieldValues.primaryEmail}
                  onChange={(event) =>
                    handleChange("primaryEmail", event.target.value)
                  }
                />
                <TextField
                  size="small"
                  variant="filled"
                  id="secondaryEmail"
                  label="Secondary email"
                  fullWidth
                  value={fieldValues.secondaryEmail}
                  onChange={(event) =>
                    handleChange("secondaryEmail", event.target.value)
                  }
                  className={classes.topSpacing}
                />
              </div>
            </div>
            <div
              className={`${classes.iconRow} ${classes.responsiveField} ${classes.responsiveSpacing}`}
            >
              <Phone className={classes.icon} />
              <div className={classes.inputFields}>
                <TextField
                  size="small"
                  variant="filled"
                  id="primaryPhone"
                  label="Primary phone"
                  fullWidth
                  value={fieldValues.primaryPhone}
                  onChange={(event) =>
                    handleChange("primaryPhone", event.target.value)
                  }
                />
                <TextField
                  size="small"
                  variant="filled"
                  id="secondaryPhone"
                  label="Secondary phone"
                  fullWidth
                  value={fieldValues.secondaryPhone}
                  onChange={(event) =>
                    handleChange("secondaryPhone", event.target.value)
                  }
                  className={classes.topSpacing}
                />
              </div>
            </div>
          </div>
          <div className={classes.iconRow}>
            <Business className={classes.icon} />
            <TextField
              size="small"
              variant="filled"
              id="workAddress"
              label="Work address"
              fullWidth
              value={fieldValues.address}
              onChange={(event) => handleChange("address", event.target.value)}
              className={classes.topSpacing}
            />
          </div>
          {extraFields.map((field, index) =>
            fieldCreator(index, field.fieldType, field.fieldValue)
          )}
        </Paper>
        <Select
          className={classes.addFieldDropdown}
          styles={addFieldStyles}
          instanceId="addField"
          options={addFieldOptions}
          value={null}
          onChange={handleAddedField}
          isSearchable={true}
          placeholder={"Add field..."}
          isClearable={true}
        />
        <div className={`${classes.formOptions} ${classes.topSpacing}`}>
          <Button
            variant="contained"
            type="button"
            onClick={() => { }}
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
