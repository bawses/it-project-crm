import { Box } from "@material-ui/core";
import { COLORS } from "../src/colors";
import CustomButton from "./button";

interface ContactsTableCategoryProps {
  allIsPressed: boolean,
  starredIsPressed: boolean,
  archivedIsPressed: boolean
}

const activeColor = COLORS.actionOrange
const activeTextColor = COLORS.white

const inactiveColor = COLORS.inactiveGrey
const inactiveTextColor = COLORS.black

export default function ContactsTableCategory({ allIsPressed, starredIsPressed, archivedIsPressed }: ContactsTableCategoryProps) {
  let allColor = inactiveColor
  let allTextColor = inactiveTextColor
  let starredColor = inactiveColor
  let starredTextColor = inactiveTextColor
  let archivedColor = inactiveColor
  let archivedTextColor = inactiveTextColor

  if (allIsPressed) {
    allColor = activeColor
    allTextColor = activeTextColor
  }
  if (starredIsPressed) {
    starredColor = activeColor
    starredTextColor = activeTextColor
  }
  if (archivedIsPressed) {
    archivedColor = activeColor
    archivedTextColor = activeTextColor
  }

  return (
    <Box flexGrow={1}>
      <CustomButton title="All" color={allColor} textColor={allTextColor} />
      <CustomButton title="Starred" color={starredColor} textColor={starredTextColor} />
      <CustomButton title="Archived" color={archivedColor} textColor={archivedTextColor} />
    </Box>
  )
}