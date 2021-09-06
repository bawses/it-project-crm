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
    margin: 12,
    width: "25%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

// type ExtraFieldType = {
//   fieldType: string;
//   fieldValue: string;
// };

// export type ContactDetailsType = {
//   firstName?: string;
//   lastName?: string;
//   title?: string;
//   location?: string;
//   primaryOrg?: string;
//   secondaryOrg?: string;
//   primaryEmail?: string;
//   secondaryEmail?: string;
//   primaryPhone?: string;
//   secondaryPhone?: string;
//   address?: string;
//   links?: ExtraFieldType[];
// };

const DUMMY_CONTACT = {
  firstName: "John",
  lastName: "Appleseed",
  title: "Developer",
  location: "Melbourne, AU",
  primaryOrg: "F Enterprise",
  primaryEmail: "johnappleseed@gmail.com",
  primaryPhone: "+61 123456789",
  secondaryPhone: "3482739472",
  address: "Unimelb",
  links: [
    { fieldType: "Facebook", fieldValue: "johnappleseed" },
    { fieldType: "Instagram", fieldValue: "jjapples" },
    { fieldType: "Other", fieldValue: "linkzz" },
  ],
};

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

const DUMMY_TAGS = [
  "Unimelb",
  "Anime Conference 2017",
  "Sundance film festival 2016",
  "A really really really really really really long tag",
];

const DUMMY_NOTES =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

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
    } catch (e) {
      console.log(e);
    }
  }, [contactId]);

  useEffect(() => {
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

  return (
    <Container className={classes.containerStyle}>
      <Typography variant="h5" component="h5">
        View a manual contact
      </Typography>
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
          // primaryOrg={fieldValues.primaryOrg}
          // secondaryOrg={fieldValues.secondaryOrg}
        />
      </div>
      <div className={classes.responsiveSections}>
        <div className={classes.detailsAndNotes}>
          <ContactDetails fieldValues={fieldValues} />
          <MyNotes
            isEditingNotes={isEditingNotes}
            toggleEditingMode={toggleEditingMode}
            onChangeEdited={(event: any) => setEditedNotes(event.target.value)}
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
  );
}
