import { Box } from "@material-ui/core";
import { COLORS } from "../../lib/Colors";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import TextButton from "../buttons/TextButton";

export type CategoryButton = "all" | "starred" | "archived"

interface ContactsTableCategoryProps {
  pressedButton: CategoryButton,
  handleButtonPress: (button: CategoryButton) => void
}

const activeColors = { color: COLORS.actionOrange, textColor: COLORS.white }
const inactiveColors = { color: COLORS.inactiveGrey, textColor: COLORS.black }

export default function ContactsTableCategory({ pressedButton, handleButtonPress }: ContactsTableCategoryProps) {
  // Adjust components based on screen size
  const theme = useTheme()
  const bigScreen = useMediaQuery(theme.breakpoints.up("sm"))

  return (
    <Box flexGrow={1}>
      <TextButton title="All" {...(pressedButton === "all" ? activeColors : inactiveColors)} onClick={() => handleButtonPress("all")} />
      <TextButton title="Starred" {...(pressedButton === "starred" ? activeColors : inactiveColors)} onClick={() => handleButtonPress("starred")} />
      {bigScreen && <TextButton title="Archived" {...(pressedButton === "archived" ? activeColors : inactiveColors)} onClick={() => handleButtonPress("archived")} />}
    </Box>
  )
}