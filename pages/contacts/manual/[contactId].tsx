import { Container, Typography, makeStyles } from "@material-ui/core";
import Image from "next/image";
import DEFAULT_IMAGE from "../../../assets/blank-profile-picture-973460_640.png";
import React, { useState, useEffect, useCallback } from "react";
import MyTags from "../../../components/cards/MyTags";
import MyNotes from "../../../components/cards/MyNotes";
import ContactDetails from "../../../components/cards/ContactDetails";
import ContactOptions from "../../../components/buttons/ContactOptions";
import ContactHeader from "../../../components/cards/ContactHeader";
import { IContact } from "../../../lib/UnifiedDataType";
import { getAllTags } from "../../../api_client/UserClient";
import Layout from "../../../components/navLayout/Layout";
import { useRouter } from "next/router";
import PageLoadingBar from "../../../components/PageLoadingBar";
import { OnChangeValue } from "react-select";
import { getSession } from "next-auth/client";
import {
  getContact,
  deleteContact,
  updateContact,
  removeTagFromContact,
  addTagToContact,
  toggleStarContact,
  toggleArchiveContact,
} from "../../../api_client/ContactClient";
import ErrorMessage, {
  AlertSeverity,
} from "../../../components/errors/ErrorMessage";
import { DataType } from "../../../lib/EnumTypes";

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
  primaryDetailsStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  profilePicDiv: {
    width: "20%",
    margin: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "30%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "50%",
    },
  },
  profilePic: {
    borderRadius: "50%",
  },
  responsiveSections: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  detailsAndNotes: {
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  myTags: {
    margin: theme.spacing(),
    marginTop: 0,
    width: "25%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

export default function ViewManualContact() {
  const classes = useStyles();
  const [initialContactData, setInitialContactData] = useState<IContact>();
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [tagLoading, setTagLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const [isStarred, setIsStarred] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [errorTitle, setErrorTitle] = useState<string>();
  const [errorSeverity, setErrorSeverity] = useState<AlertSeverity>();
  const router = useRouter();
  const { contactId } = router.query;

  const fetchContactDetails = useCallback(async () => {
    if (contactId && typeof contactId === "string") {
      try {
        setIsLoading(true);
        const fetchedData = await getContact(contactId, true);
        setInitialContactData(fetchedData);
        console.log(fetchedData);
        setNotes(fetchedData.notes ?? "");
        setEditedNotes(fetchedData.notes ?? "");
        setTags(fetchedData.tags ?? []);
        const fetchedTagOptions = await getAllTags();
        setTagOptions(fetchedTagOptions);
        setIsStarred(fetchedData.starred ?? false);
        setIsArchived(fetchedData.archived ?? false);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        // Display error message
        setErrorMessage(
          "Failed to load manual contact - Please refresh the page and try again."
        );
        setErrorTitle(undefined);
        setErrorSeverity(undefined);
        setDisplayError(true);
        setIsLoading(false);
      }
    }
  }, [contactId]);

  const toggleEditingMode = () => {
    setIsEditingNotes(!isEditingNotes);
  };

  const updateContactNotes = useCallback(async () => {
    if (initialContactData) {
      try {
        setBtnLoading(true);
        const updateObject = {
          notes: editedNotes,
        };
        const updatedContact = await updateContact(
          initialContactData,
          updateObject
        );
        console.log("After updating notes");
        console.log(updatedContact);
        setNotes(updatedContact.notes ?? "");
        setEditedNotes(updatedContact.notes ?? "");
      } catch (e) {
        console.log(e);
        // Display error message
        setErrorMessage("Failed to update notes - Please try again");
        setErrorTitle(undefined);
        setErrorSeverity(undefined);
        setDisplayError(true);
      } finally {
        setBtnLoading(false);
      }
    }
  }, [initialContactData, editedNotes]);

  const saveEditedNotes = () => {
    if (isEditingNotes) {
      updateContactNotes().then(() => {
        toggleEditingMode();
      });
    }
  };

  const cancelEditedNotes = () => {
    setEditedNotes(notes);
    if (isEditingNotes) {
      toggleEditingMode();
    }
  };

  const deleteTag = async (toDelete: string) => {
    if (initialContactData) {
      try {
        setTagLoading(true);
        const updatedContact = await removeTagFromContact(
          initialContactData,
          toDelete
        );
        setTags(updatedContact.tags ?? []);
        console.log("After deleting tag");
        console.log(updatedContact);
        const updatedTagOptions = await getAllTags();
        setTagOptions(updatedTagOptions);
      } catch (e) {
        console.log(e);
        // Display error message
        setErrorMessage("Failed to delete tag - Please try again");
        setErrorTitle(undefined);
        setErrorSeverity(undefined);
        setDisplayError(true);
      } finally {
        setTagLoading(false);
      }
    }
  };

  const addTag = async (toAdd: string) => {
    if (initialContactData) {
      try {
        setTagLoading(true);
        const updatedContact = await addTagToContact(initialContactData, toAdd);
        setTags(updatedContact.tags ?? []);
        console.log("After adding tag");
        console.log(updatedContact);
        const updatedTagOptions = await getAllTags();
        setTagOptions(updatedTagOptions);
      } catch (e) {
        console.log(e);
        // Display error message
        setErrorMessage("Failed to add new tag - Please try again");
        setErrorTitle(undefined);
        setErrorSeverity(undefined);
        setDisplayError(true);
      } finally {
        setTagLoading(false);
      }
    }
  };

  const updateStarred = useCallback(async () => {
    if (initialContactData) {
      try {
        const updatedContact = await toggleStarContact(initialContactData);
        console.log(updatedContact);
      } catch (e) {
        console.log(e);
        // Display error message
        setErrorMessage("Failed to star this contact - Please try again");
        setErrorTitle(undefined);
        setErrorSeverity(undefined);
        setDisplayError(true);
      }
    }
  }, [initialContactData]);

  const updateArchived = useCallback(async () => {
    if (initialContactData) {
      try {
        const updatedContact = await toggleArchiveContact(initialContactData);
        console.log(updatedContact);
        // Display error message
        setErrorMessage("Successfully updated archive for this contact!");
        setErrorTitle("Success");
        setErrorSeverity("success");
        setDisplayError(true);
      } catch (e) {
        console.log(e);
        // Display error message
        setErrorMessage(undefined);
        setErrorTitle(undefined);
        setErrorSeverity(undefined);
        setDisplayError(true);
      }
    }
  }, [initialContactData]);

  const deleteThisContact = useCallback(async () => {
    if (initialContactData) {
      try {
        setIsLoading(true);
        const updatedContact = await deleteContact(initialContactData);
        console.log(updatedContact);
        setIsLoading(false);
        router.replace("/contacts");
      } catch (e) {
        console.log(e);
        // Display error message
        setErrorMessage("Failed to delete this contact - Please try again");
        setErrorTitle(undefined);
        setErrorSeverity(undefined);
        setDisplayError(true);
        setIsLoading(false);
      }
    }
  }, [initialContactData, router]);

  const handleContactOption = (
    value: OnChangeValue<{ value: string; label: string }, false> | null
  ) => {
    if (value) {
      if (value.value === "archive") {
        setIsArchived(true);
        updateArchived();
      } else if (value.value === "unarchive") {
        setIsArchived(false);
        updateArchived();
      } else if (value.value === "delete") {
        deleteThisContact();
      }
    }
  };

  useEffect(() => {
    getSession().then((session) => {
      if (session && session.user.type == DataType.User) {
        setIsLoading(false);
        fetchContactDetails();
      } else if (session) {
        router.replace("/organisations/profile");
      } else {
        router.replace("/login");
      }
    });
  }, [router, fetchContactDetails]);

  if (isLoading) {
    return <PageLoadingBar />;
  }

  return (
    <Layout>
      <Container className={classes.containerStyle}>
        <ContactOptions
          isManual={true}
          isArchived={isArchived}
          onChange={handleContactOption}
          onPressEdit={() =>
            router.push(`/contacts/manual/edit/${initialContactData?._id}`)
          }
        />
        <div className={classes.primaryDetailsStyle}>
          <Container className={classes.profilePicDiv}>
            <Image
              className={classes.profilePic}
              src={DEFAULT_IMAGE}
              alt="Profile picture"
            />
          </Container>
          <ContactHeader
            firstName={initialContactData?.name.firstName}
            lastName={initialContactData?.name.lastName}
            title={initialContactData?.job}
            selectedOrg={initialContactData?.organisation ?? null}
            manualOrg={initialContactData?.manualOrganisation}
            starred={isStarred}
            onStar={() => {
              setIsStarred(!isStarred);
              updateStarred();
            }}
          />
        </div>
        <div className={classes.responsiveSections}>
          <div className={classes.detailsAndNotes}>
            <ContactDetails fieldValues={initialContactData} />
            <MyNotes
              isEditingNotes={isEditingNotes}
              toggleEditingMode={toggleEditingMode}
              onChangeEdited={(event: any) =>
                setEditedNotes(event.target.value)
              }
              notes={notes}
              editedNotes={editedNotes}
              saveEditedNotes={saveEditedNotes}
              cancelEditedNotes={cancelEditedNotes}
              isLoading={btnLoading}
            />
          </div>
          <div className={classes.myTags}>
            <MyTags
              tags={tags}
              tagOptions={tagOptions}
              deleteTag={deleteTag}
              addTag={addTag}
              isLoading={tagLoading}
            />
          </div>
        </div>
      </Container>
      <ErrorMessage
        open={displayError}
        alertMessage={errorMessage}
        alertTitle={errorTitle}
        severity={errorSeverity}
        handleClose={() => setDisplayError(false)}
      />
    </Layout>
  );
}
