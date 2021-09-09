import { Box, Button, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { COLORS } from "../../lib/Colors";

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    textTransform: "none",
    width: theme.spacing(24),
    height: theme.spacing(20),
    backgroundColor: COLORS.inactiveGrey
  }
}))

export default function SearchCreateContactButton() {
  const classes = useStyles()

  return (
    <Button variant="contained" className={classes.btn}>
      <Box display="flex" flexDirection="column" justifyContent="centre">
        <Box fontSize={16} fontWeight="bold">Can&apos;t find the person you were looking for? Add a manual contact here.</Box>
        <Box display="flex" flexDirection="row-reverse"><PersonAddIcon /></Box>
      </Box>
    </Button>
  )
}