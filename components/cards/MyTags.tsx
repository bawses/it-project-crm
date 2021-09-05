import React from "react";
import CreatableSelect from "react-select/creatable";
import {
  Paper,
  Container,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { COLORS } from "../../src/colors";

interface MyTagsProps {
  tags?: string[];
  tagOptions?: string[];
  deleteTag?: (value: string) => void;
  addTag?: (value: string) => void;
}

export default function MyTags({
  tags = [],
  tagOptions = [],
  deleteTag = (value: string) => {},
  addTag = (value: string) => {},
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
      <Typography variant="h6" component="h3">
        My tags
      </Typography>
      <Paper
        elevation={3}
        className={`${classes.tagsSection} ${classes.topSpacing}`}
      >
        <div className={classes.tagsList}>
          {tags.map((value, index) => tagCreator(value, index))}
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
        />
      </Paper>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  tagsSection: {
    borderRadius: 10,
    padding: 20,
    [theme.breakpoints.down("xs")]: {
      padding: 15,
    },
  },
  tagsList: {
    height: 350,
    overflowY: "auto",
    overflowX: "hidden",
  },
  tagStyle: {
    padding: 8,
    paddingLeft: 12,
    paddingRight: 0,
    borderRadius: 20,
    backgroundColor: COLORS.primaryBlueLight,
    margin: 8,
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
