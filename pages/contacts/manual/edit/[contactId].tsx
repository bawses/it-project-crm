import {
  Paper,
  Container,
  Typography,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Business } from "@material-ui/icons";
import Image from "next/image";
import DEFAULT_IMAGE from "../../../../assets/blank-profile-picture-973460_640.png";
import React, { useCallback, useEffect, useState } from "react";
import { OnChangeValue } from "react-select";
import EditContactOptions from "../../../../components/buttons/EditContactOptions";
import ExtraField from "../../../../components/input/ExtraField";
import ResponsiveFieldPair from "../../../../components/input/ResponsiveFieldPair";
import VerticalFieldPair from "../../../../components/input/VerticalFieldPair";
import LocationSelector from "../../../../components/input/LocationSelector";
import AddFieldSelector from "../../../../components/input/AddFieldSelector";
import Layout from "../../../../components/navLayout/Layout";
import PageLoadingBar from "../../../../components/PageLoadingBar";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { COLORS } from "../../../../lib/Colors";
import { IManualContact_Update } from "../../../../lib/DataTypes_Update";
import { IContact } from "../../../../lib/UnifiedDataType";
import {
  getContact,
  updateContact,
} from "../../../../api_client/ContactClient";

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
    display: "flex",
    flexDirection: "column",
    width: "25%",
    margin: theme.spacing(1.5),
    [theme.breakpoints.down("sm")]: {
      width: "36%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "64%",
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
  uploadImageBtn: {
    backgroundColor: COLORS.primaryBlue,
    color: COLORS.white,
    fontWeight: "bold",
    marginTop: "5px",
    textTransform: "none",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: COLORS.primaryBlue,
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

export default function EditManualContact() {
  const classes = useStyles();
  const [initialContact, setInitialContact] = useState<IContact>();
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
  const { contactId } = router.query;

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

  const extractFieldValues = (fetchedData: IContact) => {
    return {
      firstName: fetchedData.name.firstName ?? "",
      lastName: fetchedData.name.lastName ?? "",
      title: fetchedData.job ?? "",
      primaryOrg:
        fetchedData.organisations &&
        fetchedData.organisations.length > 0 &&
        fetchedData.organisations[0]
          ? fetchedData.organisations[0]
          : "",
      secondaryOrg:
        fetchedData.organisations &&
        fetchedData.organisations.length > 1 &&
        fetchedData.organisations[1]
          ? fetchedData.organisations[1]
          : "",
      primaryEmail:
        fetchedData.email &&
        fetchedData.email.length > 0 &&
        fetchedData.email[0]
          ? fetchedData.email[0]
          : "",
      secondaryEmail:
        fetchedData.email &&
        fetchedData.email.length > 1 &&
        fetchedData.email[1]
          ? fetchedData.email[1]
          : "",
      primaryPhone:
        fetchedData.phone &&
        fetchedData.phone.length > 0 &&
        fetchedData.phone[0]
          ? fetchedData.phone[0]
          : "",
      secondaryPhone:
        fetchedData.phone &&
        fetchedData.phone.length > 1 &&
        fetchedData.phone[1]
          ? fetchedData.phone[1]
          : "",
      address: "",
    };
  };

  const extractExtraFields = (fetchedData: IContact) => {
    let extraLinks = [];
    if (fetchedData.links?.facebook) {
      extraLinks.push({
        fieldType: "Facebook",
        fieldValue: fetchedData.links?.facebook,
      });
    }
    if (fetchedData.links?.instagram) {
      extraLinks.push({
        fieldType: "Instagram",
        fieldValue: fetchedData.links?.instagram,
      });
    }
    if (fetchedData.links?.linkedIn) {
      extraLinks.push({
        fieldType: "LinkedIn",
        fieldValue: fetchedData.links?.linkedIn,
      });
    }
    if (fetchedData.links?.twitter) {
      extraLinks.push({
        fieldType: "Twitter",
        fieldValue: fetchedData.links?.twitter,
      });
    }
    if (fetchedData.links?.website) {
      extraLinks.push({
        fieldType: "Website",
        fieldValue: fetchedData.links?.website,
      });
    }
    if (fetchedData.links?.other) {
      const otherLinks = fetchedData.links?.other.map((link) => ({
        fieldType: "Other",
        fieldValue: link,
      }));
      extraLinks = [...extraLinks, ...otherLinks];
    }
    return extraLinks;
  };

  const loadContactData = useCallback(async () => {
    if (contactId && typeof contactId === "string") {
      try {
        setIsLoading(true);
        const fetchedData = await getContact(contactId, true);
        console.log(fetchedData);
        setInitialContact(fetchedData);
        setLocation(
          fetchedData.location
            ? { value: fetchedData.location, label: fetchedData.location }
            : null
        );
        const initialFieldValues = extractFieldValues(fetchedData);
        setFieldValues(initialFieldValues);
        const extraLinks = extractExtraFields(fetchedData);
        setExtraFields(extraLinks);
        setIsLoading(false);
      } catch (e) {
        /** TODO: redirect to error page */
        console.log(e);
        setIsLoading(false);
      }
    }
  }, [contactId]);

  useEffect(() => {
    loadContactData();
  }, [loadContactData]);

  const updateManualContactDetails = async () => {
    if (initialContact) {
      /** TODO: make alert or pop up if missing required fields */
      if (
        !!fieldValues.firstName === false &&
        !!fieldValues.lastName === false
      ) {
        console.log("Error: must enter first or last name");
        return;
      }
      /** Remove any extra fields that are empty */
      const finalExtraFields = extraFields.filter(
        (field) => field.fieldValue !== ""
      );
      const detailsToUpdate: IManualContact_Update = {
        name: {
          firstName: fieldValues.firstName,
          lastName: fieldValues.lastName,
        },
        email: [fieldValues.primaryEmail, fieldValues.secondaryEmail],
        phone: [fieldValues.primaryPhone, fieldValues.secondaryPhone],
        job: fieldValues.title,
        location: location ? location.value : "",
        links: {
          facebook: finalExtraFields.find(
            (field) => field.fieldType === "Facebook"
          )?.fieldValue,
          linkedIn: finalExtraFields.find(
            (field) => field.fieldType === "LinkedIn"
          )?.fieldValue,
          instagram: finalExtraFields.find(
            (field) => field.fieldType === "Instagram"
          )?.fieldValue,
          twitter: finalExtraFields.find(
            (field) => field.fieldType === "Twitter"
          )?.fieldValue,
          website: finalExtraFields.find(
            (field) => field.fieldType === "Website"
          )?.fieldValue,
          other: finalExtraFields
            .filter((field) => field.fieldType === "Other")
            .map((other) => other.fieldValue),
        },
        organisations: [fieldValues.primaryOrg, fieldValues.secondaryOrg],
      };
      try {
        setIsLoading(true);
        const updatedContact = await updateContact(
          initialContact,
          detailsToUpdate
        );
        router.replace(`/contacts/manual/${updatedContact._id}`);
        setIsLoading(false);
      } catch (e: any) {
        console.log(e);
        setIsLoading(false);
      }
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
    updateManualContactDetails();
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
          Edit manual contact:
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
                required={true}
              />
              <TextField
                size="small"
                variant="filled"
                id="title"
                label="Title"
                fullWidth
                value={fieldValues.title || ""}
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
                leftValue={fieldValues.primaryOrg || ""}
                rightId="secondaryOrganisation"
                rightLabel="Secondary organisation"
                rightValue={fieldValues.secondaryOrg || ""}
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
                topValue={fieldValues.primaryEmail || ""}
                bottomId="secondaryEmail"
                bottomLabel="Secondary email"
                bottomValue={fieldValues.secondaryEmail || ""}
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
                topValue={fieldValues.primaryPhone || ""}
                bottomId="secondaryPhone"
                bottomLabel="Secondary phone"
                bottomValue={fieldValues.secondaryPhone || ""}
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
                value={fieldValues.address || ""}
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
          <EditContactOptions
            onCancel={() => router.back()}
            onSubmit={handleSubmit}
            submitLabel={"Save changes"}
          />
        </form>
      </Container>
    </Layout>
  );
}