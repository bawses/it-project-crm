import { Box } from "@material-ui/core";
import { COLORS } from "../../lib/Colors";
import CustomButton from "./../button";

export type CategoryButton = "all" | "starred" | "archived"

interface ContactsTableCategoryProps {
  pressedButton: CategoryButton,
  handleButtonPress: (button: CategoryButton) => void
}

const activeColors = { color: COLORS.actionOrange, textColor: COLORS.white }
const inactiveColors = { color: COLORS.inactiveGrey, textColor: COLORS.black }

export default function ContactsTableCategory({ pressedButton, handleButtonPress }: ContactsTableCategoryProps) {
  return (
    <Box flexGrow={1}>
      <CustomButton title="All" {...(pressedButton === "all" ? activeColors : inactiveColors)} onClick={() => handleButtonPress("all")} />
      <CustomButton title="Starred" {...(pressedButton === "starred" ? activeColors : inactiveColors)} onClick={() => handleButtonPress("starred")} />
      <CustomButton title="Archived" {...(pressedButton === "archived" ? activeColors : inactiveColors)} onClick={() => handleButtonPress("archived")} />
    </Box>
  )
}