// One row indicating that no results could be found 
import { Avatar, Typography, TableRow, TableCell, IconButton, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles, createStyles, Theme  } from "@material-ui/core/styles";
import { IUser } from "../../lib/DataTypes";
import React from "react";
import Link from "next/link"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    row: {
      "&:hover": {
        cursor: 'pointer'
      }
    },
  })
);

export default function NoResultsRow() {
  const classes = useStyles();
  const theme = useTheme();
  // const bigScreen = useMediaQuery(theme.breakpoints.up("md"))

  return (
    <TableRow className={classes.row} hover={true}>
      <TableCell>
        <Typography component="p">No Results Found</Typography>
      </TableCell>
    </TableRow>
  )
}