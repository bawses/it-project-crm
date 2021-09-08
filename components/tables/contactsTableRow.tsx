import { Avatar, Typography, TableRow, TableCell } from "@material-ui/core";
import stockImage from '../../public/stockImage.jpg'
import StarsIcon from '@material-ui/icons/Stars';
import { COLORS } from "../../lib/Colors";

export interface ContactsTableRowProps {
  name: string,
  role?: string,
  isStarred: boolean
}

export default function ContactsTableRow({ name, role, isStarred }: ContactsTableRowProps) {
  let starColor = COLORS.inactiveGrey
  if (isStarred) {
    starColor = COLORS.starredYellow
  }

  return (
    <TableRow>
      <TableCell><Avatar src={stockImage.src} /></TableCell>
      <TableCell><Typography component="p" style={{ fontWeight: 600 }}>{name}</Typography></TableCell>
      <TableCell><Typography component="p">{role}</Typography></TableCell>
      <TableCell><StarsIcon htmlColor={starColor} /></TableCell>
    </TableRow>
  )
}