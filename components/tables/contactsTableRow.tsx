import { Avatar, Typography, TableRow, TableCell, IconButton, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import DEFAULT_IMAGE from "../../assets/blank-profile-picture-973460_640.png";
import StarsIcon from '@material-ui/icons/Stars';
import { COLORS } from "../../lib/Colors";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import TextButton from "../buttons/TextButton";
import Link from "next/link"
import { IContact } from "../../lib/UnifiedDataType";

export interface ContactsTableRowProps {
  contact: IContact,
  starVariant?: { handleStar: (target: IContact) => Promise<boolean> },
  addVariant?: { handleContactAdd: (target: IContact) => Promise<boolean> }
}

const useStyles = makeStyles({
  row: {
    "&:hover": {
      cursor: 'pointer'
    }
  }
})

export default function ContactsTableRow({ contact, starVariant, addVariant }: ContactsTableRowProps) {
  const classes = useStyles()

  // Adjust component based on screen size
  const theme = useTheme()
  const bigScreen = useMediaQuery(theme.breakpoints.up("md"))

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
    let btnTitle = "Add"
    let btnIsDisabled = false
    if (contact.isManualContact) {
      btnTitle = bigScreen ? "Manual Contact" : "Manual"
      btnIsDisabled = true
    } else if (contact.isAddedContact) {
      btnTitle = "Added"
      btnIsDisabled = true
    }

    buttonComponent = (
      <TextButton
        disabled={btnIsDisabled}
        color={COLORS.actionOrange}
        textColor={COLORS.white}
        onClick={(event) => {
          event.stopPropagation()
          addVariant?.handleContactAdd(contact)
        }}
        title={btnTitle}
      />
    )
  }

  const name = contact.name.firstName + " " + contact.name.lastName
  const nameComponent = <Typography component="p" style={{ fontWeight: 600 }}>{name}</Typography>
  const roleComponent = <Typography component="p">{contact.job}</Typography>

  return (
    <Link href={`contacts/${contact.isManualContact ? "manual/" : ""}${contact._id}`} passHref>
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
        <TableCell width="20%" align="center">{buttonComponent}</TableCell>
      </TableRow>
    </Link>
  )
}