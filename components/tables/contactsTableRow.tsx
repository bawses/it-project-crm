import { Avatar, Typography, TableRow, TableCell, IconButton, useMediaQuery, Color } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import DEFAULT_IMAGE from "../../assets/blank-profile-picture-973460_640.png";
import StarsIcon from '@material-ui/icons/Stars';
import { COLORS } from "../../lib/Colors";
import { makeStyles } from "@material-ui/styles";
import { IManualContact } from "../../lib/DataTypes";
import React from "react";
import TextButton from "../buttons/TextButton";
import Link from "next/link"

export interface ContactsTableRowProps {
  contact: IManualContact,
  starVariant?: { handleStar: (target: IManualContact) => Promise<boolean> },
  addVariant?: { alreadyAdded: boolean, handleContactAdd: (target: IManualContact) => Promise<boolean> }
}

const useStyles = makeStyles({
  addBtn: {
    textTransform: "none",
    backgroundColor: COLORS.actionOrange,
    color: COLORS.white,
    fontWeight: "bold"
  },
  row: {
    "&:hover": {
      cursor: 'pointer'
    }
  }
})

export default function ContactsTableRow({ contact, starVariant, addVariant }: ContactsTableRowProps) {
  const classes = useStyles()

  let buttonComponent: JSX.Element
  if (starVariant) {
    // Determine colour for star variant
    let starColor = COLORS.inactiveGrey
    if (contact.starred) {
      starColor = COLORS.starredYellow
    }

    buttonComponent = (
      <IconButton onClick={(event) => {
        event.stopPropagation()
        starVariant.handleStar(contact)
      }}>
        <StarsIcon htmlColor={starColor} />
      </IconButton>
    )
  } else {
    // Determine text and status for add variant
    buttonComponent = (
      <TextButton
        disabled={addVariant?.alreadyAdded}
        className={classes.addBtn}
        onClick={(event) => {
          event.stopPropagation()
          addVariant?.handleContactAdd(contact)
        }}
        title={addVariant?.alreadyAdded ? "Added" : "Add"}
      />
    )
  }

  const name = contact.name.firstName + " " + contact.name.lastName
  const nameComponent = <Typography component="p" style={{ fontWeight: 600 }}>{name}</Typography>
  const roleComponent = <Typography component="p">{contact.job}</Typography>

  // Adjust component based on screen size
  const theme = useTheme()
  const bigScreen = useMediaQuery(theme.breakpoints.up("md"))

  return (
    <Link href={"contacts/" + contact._id} passHref>
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
        <TableCell>{buttonComponent}</TableCell>
      </TableRow>
    </Link>
  )
}