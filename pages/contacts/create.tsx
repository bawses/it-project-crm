import { Paper, Container, Typography, makeStyles, TextField } from "@material-ui/core";
import { Business } from "@material-ui/icons";
import Image from "next/image";
import DEFAULT_IMAGE from "../../assets/blank-profile-picture-973460_640.png";
import React, { useEffect, useState } from "react";
import { OnChangeValue } from "react-select";
import EditContactOptions from "../../components/buttons/EditContactOptions";
import ExtraField from "../../components/input/ExtraField";
import ResponsiveFieldPair from "../../components/input/ResponsiveFieldPair";
import VerticalFieldPair from "../../components/input/VerticalFieldPair";
import LocationSelector from "../../components/input/LocationSelector";
import AddFieldSelector from "../../components/input/AddFieldSelector";
import { IManualContact_Create } from "../../lib/DataTypes_Create";
import Layout from "../../components/navLayout/Layout";
import PageLoadingBar from "../../components/PageLoadingBar";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { createContact_Manual } from "../../api_client/ContactClient";

const useStyles = makeStyles((theme) => ({
  containerStyle: {
    width: "100%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "90%",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(7),
    },
  },
  pageTitle: {
    marginBottom: theme.spacing(),
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
    margin: theme.spacing(2),
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
    padding: theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(3),
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
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fieldCreator = (index: number, fieldType: string, fieldValue: string) => {
    return (
      <ExtraField
        key={index.toString()}
        index={index}
        fieldType={fieldType}
        fieldValue={fieldValue}
        handleChange={(event) => handleExtraField(fieldType, event.target.value, index)}
        onPressDelete={() => {
          deleteField(index, fieldType);
        }}
      />
    );
  };

  const createNewContact = async () => {
    /** TODO: make alert or pop up if missing required fields */
    if (!!fieldValues.firstName === false && !!fieldValues.lastName === false) {
      console.log("Error: must enter first or last name");
      return;
    }
    const contactToCreate: IManualContact_Create = {
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
      organisations: [fieldValues.primaryOrg, fieldValues.secondaryOrg],
      notes: "",
      tags: [],
    };
    try {
      setIsLoading(true);
      const newContact = await createContact_Manual(contactToCreate);
      router.replace(`/contacts/manual/${newContact._id}`);
      setIsLoading(false);
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const deleteField = (index: number, fieldType: string) => {
    const newExtraFields = extraFields.filter((field, i) => i !== index);
    setExtraFields(newExtraFields);
  };

  const handleChange = (fieldType: string, fieldValue: string) => {
    setFieldValues({ ...fieldValues, [fieldType]: fieldValue });
  };

  const handleExtraField = (fieldType: string, fieldValue: string, index: number) => {
    const newExtraFields = extraFields.map((field, i) =>
      field.fieldType === fieldType && i === index ? { fieldType: field.fieldType, fieldValue: fieldValue } : field
    );
    setExtraFields(newExtraFields);
  };

  const handleAddedField = (
    value: OnChangeValue<{ value: string; label: string }, false> | null
  ) => {
    if (value) {
      // New field selected, so add this text field to page
      setExtraFields([...extraFields, { fieldType: value.label, fieldValue: "" }]);
    }
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createNewContact();
  };

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setIsLoading(false);
      } else {
        router.replace("/login");
      }
    });
  }, [router]);

  if (isLoading) {
    return <PageLoadingBar />;
  }

  return (
    <Layout>
      <Container maxWidth="md" className={classes.containerStyle}>
        <Typography variant="h5" component="h5" className={classes.pageTitle}>
          Create a manual contact:
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
                onChange={(event) =>
                  handleChange("address", event.target.value)
                }
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
          <EditContactOptions onCancel={() => router.back()} onSubmit={handleSubmit} />
        </form>
      </Container>
    </Layout>
  );
}
