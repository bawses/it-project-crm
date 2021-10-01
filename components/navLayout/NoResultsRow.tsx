/**
 * Display in Search Results that no results could be found
 */
import { Typography, TableRow, TableCell } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    row: {
      "&:hover": {
        cursor: "pointer",
      },
    },
  })
);

export default function NoResultsRow() {
  const classes = useStyles();
  
  return (
    <TableRow className={classes.row} hover={true}>
      <TableCell>
        <Typography component="p">No Results Found</Typography>
      </TableCell>
    </TableRow>
  );
}
