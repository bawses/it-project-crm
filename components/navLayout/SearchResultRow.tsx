import { Avatar, Typography, TableRow, TableCell, IconButton, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import DEFAULT_IMAGE from "../../assets/blank-profile-picture-973460_640.png";
import { COLORS } from "../../lib/Colors";
import { makeStyles, createStyles, Theme  } from "@material-ui/core/styles";
import { IUser } from "../../lib/DataTypes";
import React from "react";
import Link from "next/link"

export interface SearchResultRowProps {
  profile: IUser,
}

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

export default function SearchResultRow({profile}: SearchResultRowProps) {
  const classes = useStyles()

  const name = profile.name.firstName + " " + profile.name.lastName
  const nameComponent = <Typography component="p" style={{ fontWeight: 600 }}>{name}</Typography>
  const roleComponent = <Typography component="p">{profile.job}</Typography>

  // Adjust component based on screen size
  const theme = useTheme()
  const bigScreen = useMediaQuery(theme.breakpoints.up("md"))

  // console.log("row rendered")

  return (
    <Link href={"contacts/" + profile._id} passHref>
      <TableRow className={classes.row} hover={true}>
        <TableCell><Avatar src={DEFAULT_IMAGE.src} /></TableCell>
        {bigScreen
          ?
          <>
            <TableCell>{nameComponent}</TableCell>
            <TableCell>{roleComponent}</TableCell>
          </>
          : <TableCell>{nameComponent} {roleComponent}</TableCell>
        }
      </TableRow>
    </Link>
  )
}