import { Box, Button, Theme } from "@material-ui/core";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { makeStyles } from "@material-ui/core/styles";
import { COLORS } from "../../lib/Colors";

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    textTransform: "none",
    backgroundColor: COLORS.inactiveGrey
  }
}))

export default function CreateContactButtonSmall() {
  const classes = useStyles()

  return (
    <Button variant="contained" className={classes.btn}>
      <Box display="flex">
        <Box fontSize={16} flexGrow={1}>
          Add a manual contact
        </Box>
        <Box flexGrow={1} justifyContent="flex-end">
          <PersonAddIcon />
        </Box>
      </Box>
    </Button>
  )
}