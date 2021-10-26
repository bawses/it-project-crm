import React from "react";
import CreatableSelect from "react-select/creatable";
import {
  Paper,
  Container,
  Typography,
  makeStyles,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { COLORS } from "../../lib/Colors";

interface MyTagsProps {
  tags?: string[];
  tagOptions?: string[];
  deleteTag?: (value: string) => void;
  addTag?: (value: string) => void;
  isLoading?: boolean;
}

export default function MyTags({
  tags = [],
  tagOptions = [],
  deleteTag = (value: string) => {},
  addTag = (value: string) => {},
  isLoading = false,
}: MyTagsProps) {
  const classes = useStyles();
  const formatTagOptions = (options: string[]) => {
    const formattedOptions = options
      .filter((option) => !tags.includes(option))
      .map((option) => {
        return {
          value: option,
          label: option,
        };
      });
    return formattedOptions;
  };
  const tagCreator = (value: string, index: number) => {
    return (
      <Container key={index.toString()} className={classes.tagStyle}>
        <Typography component="p">{value}</Typography>
        <IconButton
          onClick={() => {
            deleteTag(value);
          }}
        >
          <Cancel style={{ fontSize: 20 }} />
        </IconButton>
      </Container>
    );
  };
  return (
    <div>
      <Paper
        elevation={3}
        className={`${classes.tagsSection} ${classes.topSpacing}`}
      >
        <Typography variant="h6" component="h3" className={classes.tagsTitle}>
          My tags
        </Typography>
        <div className={isLoading ? classes.loadingContainer : classes.tagsList}>
          {!isLoading && tags.map((value, index) => tagCreator(value, index))}
          {isLoading && <CircularProgress size={20} />}
        </div>
        <CreatableSelect
          instanceId="addTags"
          options={formatTagOptions(tagOptions)}
          value={null}
          onChange={(chosen) => {
            if (chosen) {
              addTag(chosen.value);
            }
          }}
          isSearchable={true}
          placeholder={"Add a tag..."}
          isClearable={true}
          menuPlacement="auto"
        />
      </Paper>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  tagsSection: {
    borderRadius: 10,
    padding: 10,
  },
  tagsTitle: {
    margin: theme.spacing(2),
    marginBottom: theme.spacing(),
  },
  tagsList: {
    minHeight: 60,
    maxHeight: 300,
    overflowY: "auto",
    overflowX: "hidden",
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    maxHeight: 300,
  },
  tagStyle: {
    padding: 5,
    paddingLeft: 12,
    paddingRight: 0,
    borderRadius: 20,
    backgroundColor: COLORS.primaryBlueLight,
    margin: theme.spacing(),
    width: "95%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topSpacing: {
    marginTop: theme.spacing(),
  },
}));
