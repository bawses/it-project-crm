import { Container, Typography, makeStyles } from "@material-ui/core";
import Image from "next/image";
import DEFAULT_IMAGE from "../../../assets/blank-profile-picture-973460_640.png";
import { useState, useEffect, useCallback, useRef } from "react";
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
  const [fieldValues, setFieldValues] = useState<IContact>();
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [editedNotes, setEditedNotes] = useState("");
  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const [isStarred, setIsStarred] = useState(false);
  const [isArchived, setIsArchived] = useState(false);

  const firstUpdate = useRef(true);
  const router = useRouter();
  const { contactId } = router.query;

  const fetchContactDetails = useCallback(async () => {
    if (contactId && typeof contactId === "string") {
      try {
        setIsLoading(true);
        const fetchedData = await getContact(contactId, true);
        setFieldValues(fetchedData);
        console.log(fetchedData);
        setNotes(fetchedData.notes ?? "");
        setEditedNotes(fetchedData.notes ?? "");
        const fetchedTagOptions = await getAllTags();
        setTagOptions(fetchedTagOptions);
        setIsStarred(fetchedData.starred ?? false);
        setIsArchived(fetchedData.archived ?? false);
        setIsLoading(false);
      } catch (e) {
        /** TODO: redirect to error page */
        console.log(e);
        setIsLoading(false);
      } finally {
        firstUpdate.current = false;
      }
    }
  }, [contactId]);

  useEffect(() => {
    console.log("first fetch");
    fetchContactDetails();
  }, [fetchContactDetails]);

  const toggleEditingMode = () => {
    setIsEditingNotes(!isEditingNotes);
  };

  const updateContactNotes = useCallback(async () => {
    if (fieldValues) {
      try {
        const updateObject = {
          notes: editedNotes,
        };
        const updatedContact = await updateContact(fieldValues, updateObject);
        console.log(updatedContact);
        setNotes(updatedContact.notes ?? "");
        setEditedNotes(updatedContact.notes ?? "");
      } catch (e) {
        console.log(e);
      }
    }
  }, [fieldValues, editedNotes]);

  const saveEditedNotes = () => {
    if (isEditingNotes) {
      updateContactNotes();
      toggleEditingMode();
    }
  };

  const cancelEditedNotes = () => {
    setEditedNotes(notes);
    if (isEditingNotes) {
      toggleEditingMode();
    }
  };

  const deleteTag = async (toDelete: string) => {
    if (fieldValues) {
      try {
        const updatedContact = await removeTagFromContact(
          fieldValues,
          toDelete
        );
        setFieldValues(updatedContact);
        const updatedTagOptions = await getAllTags();
        setTagOptions(updatedTagOptions);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const addTag = async (toAdd: string) => {
    if (fieldValues) {
      try {
        const updatedContact = await addTagToContact(fieldValues, toAdd);
        setFieldValues(updatedContact);
        const updatedTagOptions = await getAllTags();
        setTagOptions(updatedTagOptions);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const updateStarred = useCallback(async () => {
    if (fieldValues) {
      try {
        const updatedContact = await toggleStarContact(fieldValues);
        console.log(updatedContact);
      } catch (e) {
        console.log(e);
      }
    }
  }, [fieldValues]);

  const updateArchived = useCallback(async () => {
    if (fieldValues) {
      try {
        const updatedContact = await toggleArchiveContact(fieldValues);
        console.log(updatedContact);
      } catch (e) {
        console.log(e);
      }
    }
  }, [fieldValues]);

  const deleteThisContact = useCallback(async () => {
    if (fieldValues) {
      try {
        setIsLoading(true);
        const updatedContact = await deleteContact(fieldValues);
        console.log(updatedContact);
        setIsLoading(false);
        router.replace("/contacts");
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    }
  }, [fieldValues, router]);

  useEffect(() => {
    if (!firstUpdate.current) {
      console.log("update starred");
      updateStarred();
    }
  }, [isStarred, updateStarred]);

  useEffect(() => {
    if (!firstUpdate.current) {
      console.log("update archived");
      updateArchived();
    }
  }, [isArchived, updateArchived]);

  const handleContactOption = (
    value: OnChangeValue<{ value: string; label: string }, false> | null
  ) => {
    if (value) {
      if (value.value === "archive") {
        setIsArchived(true);
      } else if (value.value === "unarchive") {
        setIsArchived(false);
      } else if (value.value === "delete") {
        deleteThisContact();
      }
    }
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
      <Container className={classes.containerStyle}>
        <ContactOptions
          isManual={true}
          isArchived={isArchived}
          onChange={handleContactOption}
          onPressEdit={() => {}}
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
            firstName={fieldValues?.name.firstName}
            lastName={fieldValues?.name.lastName}
            title={fieldValues?.job}
            primaryOrg={
              fieldValues?.organisations &&
              fieldValues?.organisations.length > 0
                ? fieldValues?.organisations[0]
                : ""
            }
            secondaryOrg={
              fieldValues?.organisations &&
              fieldValues?.organisations.length > 1
                ? fieldValues?.organisations[1]
                : ""
            }
            starred={isStarred}
            onStar={() => setIsStarred(!isStarred)}
          />
        </div>
        <div className={classes.responsiveSections}>
          <div className={classes.detailsAndNotes}>
            <ContactDetails fieldValues={fieldValues} />
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
            />
          </div>
          <div className={classes.myTags}>
            <MyTags
              tags={fieldValues?.tags}
              tagOptions={tagOptions}
              deleteTag={deleteTag}
              addTag={addTag}
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
}
