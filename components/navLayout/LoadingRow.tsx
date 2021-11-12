/**
 * Displays a loading indicator for search results
 */
import { TableRow, TableCell, CircularProgress } from "@material-ui/core";
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

export default function LoadingRow() {
  const classes = useStyles();

  return (
    <TableRow className={classes.row} hover={true}>
      <TableCell>
        <CircularProgress />
      </TableCell>
    </TableRow>
  );
}
