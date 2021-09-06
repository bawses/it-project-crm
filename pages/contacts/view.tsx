import { Container, Typography, makeStyles } from "@material-ui/core";
import Image from "next/image";
import DEFAULT_IMAGE from "../../assets/blank-profile-picture-973460_640.png";
import { useState, useEffect, useCallback } from "react";
import MyTags from "../../components/cards/MyTags";
import MyNotes from "../../components/cards/MyNotes";
import ContactDetails from "../../components/cards/ContactDetails";
import ContactOptions from "../../components/buttons/ContactOptions";
import ContactHeader from "../../components/cards/ContactHeader";
import {
  getManualContactById,
  updateManualContact,
} from "../../middleware/ManualContactQueries";
import { IManualContact } from "../../components/DataTypes";
import { updateUser } from "../../middleware/UserQueries";
import Layout from "../../components/navLayout/Layout";

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

interface ViewContactProps {
  contactId: string;
}

export default function ViewContact({
  contactId = "6134bf036b2b512e1ca6ece0",
}: ViewContactProps) {
  const classes = useStyles();
  const [fieldValues, setFieldValues] = useState<IManualContact>();
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [editedNotes, setEditedNotes] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const [isStarred, setIsStarred] = useState(false);

  const fetchContactDetails = useCallback(async () => {
    try {
      const fetchedRawData = await getManualContactById(contactId);
      const fetchedData = fetchedRawData as IManualContact;
      setFieldValues(fetchedData);
      setNotes(fetchedData.notes ?? "");
      setEditedNotes(fetchedData.notes ?? "");
      setTags(fetchedData.tags ?? []);
      /** TODO: fetch tag options from user object */
      const fetchedTagOptions = DUMMY_TAG_OPTIONS;
      setTagOptions(fetchedTagOptions);
      setIsStarred(fetchedData.starred ?? false);
    } catch (e) {
      console.log(e);
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
          fieldValues?._id,
          updateObject
        );
        console.log(updatedContact);
      } catch (e) {
        console.log(e);
      }
    }
  }, [notes, fieldValues]);

  useEffect(() => {
    console.log("update notes");
    updateContactNotes();
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
          fieldValues?._id,
          updateObject
        );
        console.log(updatedContact);
      } catch (e) {
        console.log(e);
      }
    }
  }, [tags, fieldValues]);

  useEffect(() => {
    console.log("update tags");
    updateContactTags();
  }, [tags, updateContactTags]);

  const deleteTag = (toDelete: string) => {
    const newTags = tags.filter((value) => value !== toDelete);
    setTags(newTags);
  };

  /** TODO */
  // const updateUserTags = useCallback(async () => {
  //   try {
  //     const updateObject = {
  //       allTags: tagOptions,
  //     };
  //     const updatedUser = await updateUser("123", updateObject);
  //     console.log(updatedUser);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [tagOptions]);

  // useEffect(() => {
  //   updateUserTags();
  // },[tagOptions, updateUserTags]);

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
          fieldValues?._id,
          updateObject
        );
        console.log(updatedContact);
      } catch (e) {
        console.log(e);
      }
    }
  }, [isStarred, fieldValues]);

  useEffect(() => {
    console.log("update starred");
    updateStarred();
  }, [isStarred, updateStarred]);

  return (
    <Layout>
      <Container className={classes.containerStyle}>
        <ContactOptions
          onPressArchive={() => {}}
          onPressDelete={() => {}}
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
            primaryOrg="Unimelb"
            secondaryOrg="Unimelb2"
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
