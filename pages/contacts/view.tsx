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
  Edit,
} from "@material-ui/icons";
import { COLORS } from "../../src/colors";
import Image from "next/image";
import DEFAULT_IMAGE from "../../assets/blank-profile-picture-973460_640.png";
import { useState, useEffect } from "react";
import Select, { OptionTypeBase } from "react-select";

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
  inputFields: {
    width: "100%",
  },
  topSpacing: {
    marginTop: theme.spacing(),
  },
  profilePic: {
    borderRadius: "50%",
  },
  profileHeader: {
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
  icon: {
    marginRight: theme.spacing(2),
  },
  editIcon: {
    fontSize: 35,
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
    },
  },
  iconRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  responsiveField: {
    flexGrow: 1,
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
  savedNotes: {
    whiteSpace: "pre-line",
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
  myTags: {
    margin: 12,
    width: "30%",
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

type ContactDetailsType = {
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

const DUMMY_NOTES =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export default function ViewContact() {
  const classes = useStyles();
  const [fieldValues, setFieldValues] = useState<ContactDetailsType>({});
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [editedNotes, setEditedNotes] = useState("");

  useEffect(() => {
    const fetchedContactDetails = DUMMY_CONTACT;
    setFieldValues(fetchedContactDetails);
    const fetchedContactNotes = DUMMY_NOTES;
    setNotes(fetchedContactNotes);
    setEditedNotes(fetchedContactNotes);
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

  const fieldCreator = (
    fieldType: string,
    fieldValue: string,
    index: number
  ) => {
    return (
      <div className={classes.iconRow} key={index.toString()}>
        {fieldType === "Facebook" && <Facebook className={classes.icon} />}
        {fieldType === "Instagram" && <Instagram className={classes.icon} />}
        {fieldType === "LinkedIn" && <LinkedIn className={classes.icon} />}
        {fieldType === "Twitter" && <Twitter className={classes.icon} />}
        {fieldType === "Website" && <Language className={classes.icon} />}
        {fieldType === "Other" && <Language className={classes.icon} />}
        <Typography
          id={fieldType + index.toString()}
          className={classes.topSpacing}
        >
          {fieldValue}
        </Typography>
      </div>
    );
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
        <div className={`${classes.inputFields} ${classes.profileHeader}`}>
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
        <div>
          <Paper
            elevation={3}
            className={`${classes.otherDetails} ${classes.topSpacing}`}
          >
            <div className={classes.responsiveRow}>
              <div className={`${classes.iconRow} ${classes.responsiveField}`}>
                <Mail className={classes.icon} />
                <div className={classes.inputFields}>
                  <Typography>{fieldValues.primaryEmail}</Typography>
                  <Typography className={classes.topSpacing}>
                    {fieldValues.secondaryEmail}
                  </Typography>
                </div>
              </div>
              <div
                className={`${classes.iconRow} ${classes.responsiveField} ${classes.responsiveSpacing}`}
              >
                <Phone className={classes.icon} />
                <div className={classes.inputFields}>
                  <Typography>{fieldValues.primaryPhone}</Typography>
                  <Typography className={classes.topSpacing}>
                    {fieldValues.secondaryPhone}
                  </Typography>
                </div>
              </div>
            </div>
            <div className={classes.iconRow}>
              <Business className={classes.icon} />
              <Typography className={classes.topSpacing}>
                {fieldValues.address}
              </Typography>
            </div>
            {fieldValues.links &&
              fieldValues.links.map((field, index) =>
                fieldCreator(field.fieldType, field.fieldValue, index)
              )}
          </Paper>
          <Paper
            elevation={3}
            className={`${classes.otherDetails} ${classes.topSpacing}`}
          >
            <Typography variant="h6" component="h4">
              Notes
            </Typography>
            {!isEditingNotes && (
              <div>
                <Typography component="p" className={classes.savedNotes}>
                  {notes}
                </Typography>
                <Button onClick={toggleEditingMode}>Edit</Button>
              </div>
            )}
            {isEditingNotes && (
              <div>
                <TextField
                  placeholder="Write your notes here..."
                  value={editedNotes}
                  onChange={(event) => setEditedNotes(event.target.value)}
                  variant="filled"
                  id="workAddress"
                  fullWidth
                  multiline={true}
                />
                <Button onClick={saveEditedNotes}>Save</Button>
                <Button onClick={cancelEditedNotes}>Cancel</Button>
              </div>
            )}
          </Paper>
        </div>
        <div className={classes.myTags}>
          <Typography variant="h6" component="h3">
            My tags
          </Typography>
          <Paper
            elevation={3}
            className={`${classes.otherDetails} ${classes.topSpacing}`}
          >
              {/* <CreatableSelect 
               className={classes.addTagsDropdown}
               styles={addTagsStyles}
               instanceId="addTags"
               options={addFieldOptions}
               value={null}
               onChange={handleAddedField}
               isSearchable={true}
               placeholder={"Add field..."}
               isClearable={true}
              /> */}
          </Paper>
        </div>
      </div>
    </Container>
  );
}
