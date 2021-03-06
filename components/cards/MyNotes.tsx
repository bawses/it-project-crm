import React from "react";
import {
  Paper,
  Typography,
  makeStyles,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { COLORS } from "../../lib/Colors";
import EditContactOptions from "../buttons/EditContactOptions";
import TextButton from "../buttons/TextButton";

interface MyNotesProps {
  isEditingNotes?: boolean;
  toggleEditingMode?: () => void;
  onChangeEdited?: (event: any) => void;
  notes?: string;
  editedNotes?: string;
  saveEditedNotes?: () => void;
  cancelEditedNotes?: () => void;
  isLoading?: boolean;
}

export default function MyNotes({
  isEditingNotes = false,
  toggleEditingMode = () => {},
  onChangeEdited = (event: any) => {},
  notes = "",
  editedNotes = "",
  saveEditedNotes = () => {},
  cancelEditedNotes = () => {},
  isLoading = false,
}: MyNotesProps) {
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={3} className={classes.notesSection}>
        <Typography variant="h6" component="h4">
          Notes
        </Typography>
        {!isEditingNotes && (
          <div>
            <Typography component="p" className={classes.savedNotes}>
              {notes}
            </Typography>
            <div className={classes.editNotes}>
              <TextButton
                onClick={toggleEditingMode}
                color={COLORS.actionOrange}
                textColor={COLORS.white}
                className={classes.editNotesBtn}
                title="Edit"
              />
            </div>
          </div>
        )}
        {isEditingNotes && (
          <div>
            <TextField
              placeholder="Write your notes here..."
              value={editedNotes}
              onChange={onChangeEdited}
              variant="filled"
              id="workAddress"
              fullWidth
              multiline={true}
            />
            <EditContactOptions
              onCancel={cancelEditedNotes}
              onSubmit={saveEditedNotes}
              toSubmitForm={false}
              submitLabel="Save"
              isLoading={isLoading}
            />
          </div>
        )}
      </Paper>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  savedNotes: {
    whiteSpace: "pre-line",
  },
  editNotes: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  editNotesBtn: {
    fontWeight: "bold",
    fontSize: "0.8rem",
  },
  notesSection: {
    marginTop: theme.spacing(),
    borderRadius: 10,
    padding: 25,
    [theme.breakpoints.down("xs")]: {
      padding: 20,
    },
  },
}));
