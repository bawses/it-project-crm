import { Avatar, Typography, TableRow, TableCell, Button, IconButton } from "@material-ui/core";
import stockImage from '../../public/stockImage.jpg'
import StarsIcon from '@material-ui/icons/Stars';
import { COLORS } from "../../lib/Colors";
import { makeStyles } from "@material-ui/styles";

export interface ContactsTableRowProps {
  name: string,
  role?: string,
  isStarred?: boolean,
  handleStar?: () => void,
  handleAdd?: () => void
}

const useStyles = makeStyles({
  addBtn: {
    textTransform: "none",
    backgroundColor: COLORS.actionOrange,
    color: COLORS.white,
    fontWeight: "bold"
  }
})

export default function ContactsTableRow({ name, role, isStarred, handleStar, handleAdd }: ContactsTableRowProps) {
  const classes = useStyles()

  let buttonComponent: JSX.Element
  if (handleStar) {
    let starColor = COLORS.inactiveGrey
    if (isStarred) {
      starColor = COLORS.starredYellow
    }
    buttonComponent = <IconButton><StarsIcon htmlColor={starColor} /></IconButton>
  } else {
    buttonComponent = <Button variant="contained" className={classes.addBtn}>Add</Button>
  }

  return (
    <TableRow>
      <TableCell><Avatar src={stockImage.src} /></TableCell>
      <TableCell><Typography component="p" style={{ fontWeight: 600 }}>{name}</Typography></TableCell>
      <TableCell><Typography component="p">{role}</Typography></TableCell>
      <TableCell>{buttonComponent}</TableCell>
    </TableRow>
  )
}