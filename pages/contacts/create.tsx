import {
  Paper,
  Container,
  Typography,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Business } from "@material-ui/icons";
import Image from "next/image";
import DEFAULT_IMAGE from "../../assets/blank-profile-picture-973460_640.png";
import { useState } from "react";
import { OnChangeValue } from "react-select";
import EditContactOptions from "../../components/buttons/EditContactOptions";
import ExtraField from "../../components/input/ExtraField";
import ResponsiveFieldPair from "../../components/input/ResponsiveFieldPair";
import VerticalFieldPair from "../../components/input/VerticalFieldPair";
import LocationSelector from "../../components/input/LocationSelector";
import AddFieldSelector from "../../components/input/AddFieldSelector";
import { createManualContact } from "../../middleware/ManualContactQueries";
import { IManualContact } from "../../components/DataTypes";

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
  otherDetails: {
    borderRadius: 10,
    padding: 25,
    [theme.breakpoints.down("xs")]: {
      padding: 20,
    },
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

export type ExtraFieldType = {
  fieldType: string;
  fieldValue: string;
};

export default function CreateContact() {
  const classes = useStyles();
  const [location, setLocation] = useState<OnChangeValue<
    { value: string; label: string },
    false
  > | null>(null);
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
      <ExtraField
        key={index.toString()}
        index={index}
        fieldType={fieldType}
        fieldValue={fieldValue}
        handleChange={(event) =>
          handleExtraField(fieldType, event.target.value, index)
        }
        onPressDelete={() => {
          deleteField(index, fieldType);
        }}
      />
    );
  };

  const createNewContact = async () => {
    const contactToCreate: IManualContact = {
      ownerId: "123",
      name: {
        firstName: fieldValues.firstName,
        lastName: fieldValues.lastName,
      },
      email: [fieldValues.primaryEmail, fieldValues.secondaryEmail],
      phone: [fieldValues.primaryPhone, fieldValues.secondaryPhone],
      job: fieldValues.title,
      location: location?.value,
      links: {
        facebook: extraFields.find((field) => field.fieldType === "Facebook")
          ?.fieldValue,
        linkedIn: extraFields.find((field) => field.fieldType === "LinkedIn")
          ?.fieldValue,
        instagram: extraFields.find((field) => field.fieldType === "Instagram")
          ?.fieldValue,
        twitter: extraFields.find((field) => field.fieldType === "Twitter")
          ?.fieldValue,
        website: extraFields.find((field) => field.fieldType === "Website")
          ?.fieldValue,
        other: extraFields
          .filter((field) => field.fieldType === "Other")
          .map((other) => other.fieldValue),
      },
      notes: "",
      tags: [],
      starred: false,
      archived: false,
    };
    try {
      const newContact = await createManualContact(contactToCreate);
      console.log(newContact);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteField = (index: number, fieldType: string) => {
    const newExtraFields = extraFields.filter((field, i) => i !== index);
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

  const handleAddedField = (
    value: OnChangeValue<{ value: string; label: string }, false> | null
  ) => {
    if (value) {
      // New field selected, so add this text field to page
      setExtraFields([
        ...extraFields,
        { fieldType: value.label, fieldValue: "" },
      ]);
    }
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createNewContact();
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
            <ResponsiveFieldPair
              small={true}
              leftId="firstName"
              leftLabel="First name"
              leftValue={fieldValues.firstName}
              rightId="lastName"
              rightLabel="Last name"
              rightValue={fieldValues.lastName}
              leftOnChange={(event) =>
                handleChange("firstName", event.target.value)
              }
              rightOnChange={(event) =>
                handleChange("lastName", event.target.value)
              }
            />
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
            <LocationSelector
              selectedLocation={location}
              onChange={(value) => setLocation(value)}
            />
            <ResponsiveFieldPair
              leftId="primaryOrganisation"
              leftLabel="Primary organisation"
              leftValue={fieldValues.primaryOrg}
              rightId="secondaryOrganisation"
              rightLabel="Secondary organisation"
              rightValue={fieldValues.secondaryOrg}
              leftOnChange={(event) =>
                handleChange("primaryOrg", event.target.value)
              }
              rightOnChange={(event) =>
                handleChange("secondaryOrg", event.target.value)
              }
            />
          </div>
        </div>
        <Paper
          elevation={3}
          className={`${classes.otherDetails} ${classes.topSpacing}`}
        >
          <div className={classes.responsiveRow}>
            <VerticalFieldPair
              iconType="email"
              topId="primaryEmail"
              topLabel="Primary email"
              topValue={fieldValues.primaryEmail}
              bottomId="secondaryEmail"
              bottomLabel="Secondary email"
              bottomValue={fieldValues.secondaryEmail}
              topOnChange={(event: any) =>
                handleChange("primaryEmail", event.target.value)
              }
              bottomOnChange={(event: any) =>
                handleChange("secondaryEmail", event.target.value)
              }
            />
            <VerticalFieldPair
              iconType="phone"
              topId="primaryPhone"
              topLabel="Primary phone"
              topValue={fieldValues.primaryPhone}
              bottomId="secondaryPhone"
              bottomLabel="Secondary phone"
              bottomValue={fieldValues.secondaryPhone}
              topOnChange={(event: any) =>
                handleChange("primaryPhone", event.target.value)
              }
              bottomOnChange={(event: any) =>
                handleChange("secondaryPhone", event.target.value)
              }
            />
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
        <AddFieldSelector
          onChange={handleAddedField}
          addedFields={extraFields}
        />
        <EditContactOptions onCancel={() => {}} onSubmit={handleSubmit} />
      </form>
    </Container>
  );
}
