import {
  Container,
  Typography,
  makeStyles,
  Button,
  IconButton,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { COLORS } from "../../src/colors";
import Image from "next/image";
import DEFAULT_IMAGE from "../../assets/blank-profile-picture-973460_640.png";
import { useState, useEffect } from "react";
import Select, { OptionTypeBase } from "react-select";
import MyTags from "../../components/cards/MyTags";
import MyNotes from "../../components/cards/MyNotes";
import ContactDetails from "../../components/cards/ContactDetails";

const options = [
  {
    value: "archive",
    label: "Archive contact",
  },
  {
    value: "delete",
    label: "Delete contact",
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
  topSpacing: {
    marginTop: theme.spacing(),
  },
  profilePic: {
    borderRadius: "50%",
  },
  profileHeader: {
    width: "100%",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  responsiveRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  editIcon: {
    fontSize: 35,
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
    },
  },
  responsiveField: {
    flexGrow: 1,
  },
  titleField: {},
  locationSelector: {
    fontSize: "1rem",
  },
  textfieldLabel: {
    fontSize: "0.8rem",
  },
  contactOptionsBtn: {
    fontSize: "1rem",
    width: 220,
    [theme.breakpoints.down("sm")]: {
      width: 200,
      fontSize: "0.8rem",
    },
  },
  contactOptionsMenu: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
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

const contactOptionsStyles = {
  dropdownIndicator: (base: any) => ({
    ...base,
    color: COLORS.white,
  }),
  menu: (provided: any) => ({ ...provided, zIndex: 9999 }),
  control: (styles: any) => ({
    ...styles,
    backgroundColor: COLORS.primaryBlue,
  }),
  placeholder: (styles: any) => ({ ...styles, color: COLORS.white }),
};

type ExtraFieldType = {
  fieldType: string;
  fieldValue: string;
};

export type ContactDetailsType = {
  firstName?: string;
  lastName?: string;
  title?: string;
  location?: string;
  primaryOrg?: string;
  secondaryOrg?: string;
  primaryEmail?: string;
  secondaryEmail?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  address?: string;
  links?: ExtraFieldType[];
};

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

export default function ViewContact() {
  const classes = useStyles();
  const [fieldValues, setFieldValues] = useState<ContactDetailsType>({});
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [editedNotes, setEditedNotes] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagOptions, setTagOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchedContactDetails = DUMMY_CONTACT;
    setFieldValues(fetchedContactDetails);
    const fetchedContactNotes = DUMMY_NOTES;
    setNotes(fetchedContactNotes);
    setEditedNotes(fetchedContactNotes);
    const fetchedTags = DUMMY_TAGS;
    setTags(fetchedTags);
    const fetchedTagOptions = DUMMY_TAG_OPTIONS;
    setTagOptions(fetchedTagOptions);
  }, []);

  const toggleEditingMode = () => {
    setIsEditingNotes(!isEditingNotes);
  };

  const saveEditedNotes = () => {
    if (isEditingNotes) {
      setNotes(editedNotes);
      toggleEditingMode();
      // API call here to update contact notes?
    }
  };

  const cancelEditedNotes = () => {
    setEditedNotes(notes);
    if (isEditingNotes) {
      toggleEditingMode();
    }
  };

  /** TODO: update database with new tags once you navigate away from page */

  const deleteTag = (toDelete: string) => {
    const newTags = tags.filter((value) => value !== toDelete);
    setTags(newTags);
  };

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
      <div className={classes.contactOptionsMenu}>
        <Select
          className={classes.contactOptionsBtn}
          styles={contactOptionsStyles}
          instanceId="contactOptions"
          options={options}
          value={null}
          placeholder={"Added to my contacts"}
        />
        <IconButton onClick={() => {}}>
          <Edit className={classes.editIcon} />
        </IconButton>
      </div>
      <div className={classes.primaryDetailsStyle}>
        <Container className={classes.profilePicDiv}>
          <Image
            className={classes.profilePic}
            src={DEFAULT_IMAGE}
            alt="Profile picture"
          />
        </Container>
        <div className={classes.profileHeader}>
          <Typography variant="h5" component="h1">
            {fieldValues.firstName} {fieldValues.lastName}
          </Typography>
          <Typography variant="h6" component="h2">
            {fieldValues.title}
          </Typography>
          <div className={classes.responsiveRow}>
            <div className={`${classes.responsiveField} ${classes.topSpacing}`}>
              <Typography>{fieldValues.primaryOrg}</Typography>
            </div>
            {fieldValues.secondaryOrg && (
              <div
                className={`${classes.responsiveField} ${classes.topSpacing}`}
              >
                <Typography>{fieldValues.secondaryOrg}</Typography>
              </div>
            )}
          </div>
        </div>
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
