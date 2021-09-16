import { Container, Typography, makeStyles } from "@material-ui/core";
import Image from "next/image";
import DEFAULT_IMAGE from "../../assets/blank-profile-picture-973460_640.png";
import { useState, useEffect, useCallback, useRef } from "react";
import MyTags from "../../components/cards/MyTags";
import MyNotes from "../../components/cards/MyNotes";
import ContactDetails from "../../components/cards/ContactDetails";
import ContactOptions from "../../components/buttons/ContactOptions";
import ContactHeader from "../../components/cards/ContactHeader";
import {
  deleteManualContact,
  getManualContactById,
  updateManualContact,
} from "../../api_client/ManualContactQueries";
import { IManualContact } from "../../lib/DataTypes";
import { updateUser } from "../../api_client/UserQueries";
import Layout from "../../components/navLayout/Layout";
import { useRouter } from "next/router";
import PageLoadingBar from "../../components/pageLoadingBar";
import { OnChangeValue } from "react-select";
import { deleteAddedContact } from "../../api_client/AddedContactQueries";
import { getSession } from "next-auth/client";

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

const DUMMY_TAG_OPTIONS = [
  "Finance",
  "Business",
  "Melbourne AI Conference 2019",
  "Management",
  "Data Science",
  "Unimelb",
  "Anime Conference 2017",
  "Sundance film festival 2016",
  "A really really really really really really long tag",
];

export default function ViewContact() {
  const classes = useStyles();
  const [fieldValues, setFieldValues] = useState<IManualContact>();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [editedNotes, setEditedNotes] = useState("");
  const [tags, setTags] = useState<string[]>([]);
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
        const fetchedData = await getManualContactById(contactId);
        setFieldValues(fetchedData);
        setNotes(fetchedData.notes ?? "");
        setEditedNotes(fetchedData.notes ?? "");
        setTags(fetchedData.tags ?? []);
        /** TODO: fetch tag options from user object */
        const fetchedTagOptions = DUMMY_TAG_OPTIONS;
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
    if (fieldValues?._id) {
      try {
        const updateObject = {
          ownerId: "123",
          name: fieldValues.name,
          notes: notes,
        };
        const updatedContact = await updateManualContact(
          fieldValues._id,
          updateObject
        );
        console.log(updatedContact);
      } catch (e) {
        console.log(e);
      }
    }
  }, [notes, fieldValues]);

  useEffect(() => {
    if (!firstUpdate.current) {
      console.log("update notes");
      updateContactNotes();
    }
  }, [notes, updateContactNotes]);

  const saveEditedNotes = () => {
    if (isEditingNotes) {
      setNotes(editedNotes);
      toggleEditingMode();
    }
  };

  const cancelEditedNotes = () => {
    setEditedNotes(notes);
    if (isEditingNotes) {
      toggleEditingMode();
    }
  };

  const updateContactTags = useCallback(async () => {
    if (fieldValues?._id) {
      try {
        const updateObject = {
          ownerId: "123",
          name: fieldValues.name,
          tags: tags,
        };
        const updatedContact = await updateManualContact(
          fieldValues._id,
          updateObject
        );
        console.log(updatedContact);
      } catch (e) {
        console.log(e);
      }
    }
  }, [tags, fieldValues]);

  useEffect(() => {
    if (!firstUpdate.current) {
      console.log("update tags");
      updateContactTags();
    }
  }, [tags, updateContactTags]);

  const deleteTag = (toDelete: string) => {
    const newTags = tags.filter((value) => value !== toDelete);
    setTags(newTags);
  };

  /** TODO */
  // const updateUserTags = useCallback(async () => {
  //   try {
  //     const currentUser = await getSession();
  //     if (currentUser?.user) {
  //       const updateObject = {
  //         allTags: tagOptions,
  //         name: currentUser?.user?.name,
  //         email: currentUser?.user?.email ?? "",
  //       };
  //       const updatedUser = await updateUser("123", updateObject);
  //       console.log(updatedUser);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [tagOptions]);

  // useEffect(() => {
  //   updateUserTags();
  // }, [tagOptions, updateUserTags]);

  /** TODO: update user tags */
  const addTag = (toAdd: string) => {
    setTags([...tags, toAdd]);
    if (!tagOptions.includes(toAdd)) {
      setTagOptions([...tagOptions, toAdd]);
    }
  };

  const updateStarred = useCallback(async () => {
    if (fieldValues?._id) {
      try {
        const updateObject = {
          ownerId: "123",
          name: fieldValues.name,
          starred: isStarred,
        };
        const updatedContact = await updateManualContact(
          fieldValues._id,
          updateObject
        );
        console.log(updatedContact);
      } catch (e) {
        console.log(e);
      }
    }
  }, [isStarred, fieldValues]);

  const updateArchived = useCallback(async () => {
    if (fieldValues?._id) {
      try {
        const updateObject = {
          ownerId: "123",
          name: fieldValues.name,
          archived: isArchived,
        };
        const updatedContact = await updateManualContact(
          fieldValues._id,
          updateObject
        );
        console.log(updatedContact);
      } catch (e) {
        console.log(e);
      }
    }
  }, [isArchived, fieldValues]);

  const deleteContact = useCallback(async () => {
    if (fieldValues?._id) {
      try {
        setIsLoading(true);
        const updatedContact = await deleteManualContact(fieldValues._id);
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
        deleteContact();
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
              tags={tags}
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
