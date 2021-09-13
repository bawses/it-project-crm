import { Avatar, Typography, TableRow, TableCell, Button, IconButton } from "@material-ui/core";
import stockImage from '../../public/stockImage.jpg'
import StarsIcon from '@material-ui/icons/Stars';
import { COLORS } from "../../lib/Colors";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { IManualContact } from "../../lib/DataTypes";

export interface ContactsTableRowProps {
  contact: IManualContact,
  starVariant?: { handleStar: (target: IManualContact) => Promise<boolean | undefined> },
  addVariant?: { alreadyAdded: boolean, handleAdd: (target: IManualContact) => Promise<boolean | undefined> }
}

const useStyles = makeStyles({
  addBtn: {
    textTransform: "none",
    backgroundColor: COLORS.actionOrange,
    color: COLORS.white,
    fontWeight: "bold"
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

    buttonComponent = <IconButton onClick={() => starVariant.handleStar(contact)}><StarsIcon htmlColor={starColor} /></IconButton>
  } else {
    // Determine text and status for add variant
    buttonComponent = (
      <Button
        disabled={addVariant?.alreadyAdded}
        variant="contained"
        className={classes.addBtn}
        onClick={() => addVariant?.handleAdd(contact)}
      >
        {addVariant?.alreadyAdded ? "Added" : "Add"}
      </Button>
    )
  }

  const name = contact.name.firstName + " " + contact.name.lastName

  return (
    <TableRow>
      <TableCell><Avatar src={stockImage.src} /></TableCell>
      <TableCell><Typography component="p" style={{ fontWeight: 600 }}>{name}</Typography></TableCell>
      <TableCell><Typography component="p">{contact.job}</Typography></TableCell>
      <TableCell>{buttonComponent}</TableCell>
    </TableRow>
  )
}