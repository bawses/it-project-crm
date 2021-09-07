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
import { COLORS } from "../../src/colors";
import EditContactOptions from "../buttons/EditContactOptions";

interface MyNotesProps {
  isEditingNotes?: boolean;
  toggleEditingMode?: () => void;
  onChangeEdited?: (event: any) => void;
  notes?: string;
  editedNotes?: string;
  saveEditedNotes?: () => void;
  cancelEditedNotes?: () => void;
}

export default function MyNotes({
  isEditingNotes = false,
  toggleEditingMode = () => {},
  onChangeEdited = (event: any) => {},
  notes = "",
  editedNotes = "",
  saveEditedNotes = () => {},
  cancelEditedNotes = () => {},
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
              <Button
                variant="contained"
                type="button"
                onClick={toggleEditingMode}
                color="secondary"
                className={classes.editNotesBtn}
              >
                Edit
              </Button>
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
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
