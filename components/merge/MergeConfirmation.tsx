import { Avatar, Box, Dialog, Typography } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DEFAULT_IMAGE from "../../assets/blank-profile-picture-973460_640.png";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import TextButton from "../buttons/TextButton";
import { COLORS } from "../../lib/Colors";
import { IContact } from "../../lib/UnifiedDataType";

interface MergeConfirmationProps {
  open: boolean,
  setOpen: (open: boolean) => void,
  manualContact?: IContact,
  handleMergeButtonPress: () => void
}

const useStyles = makeStyles({
  accountBox: {
    width: 100,
    height: 100
  },
  chevron: {
    width: 100,
    height: 100
  },
  profilePic: {
    width: 90,
    height: 90
  }
})

export default function MergeConfirmation({
  open,
  setOpen,
  manualContact,
  handleMergeButtonPress
}: MergeConfirmationProps) {
  const classes = useStyles()

  return (
    <Dialog open={open}>
      <Box display="flex" flexDirection="column" justifyContent="center" mx={4} my={4}>
        {/* Are you sure message */}
        <Box display="flex" justifyContent="center">
          <Typography variant="h4">
            <strong>Are you sure you would like to merge your manual contact?</strong>
          </Typography>
        </Box>
        {/* Images */}
        <Box display="flex" justifyContent="center" mx={20} my={4}>
          <Box display="flex" flexDirection="column" justifyContent="center" flexGrow={1}>
            <AccountBoxIcon className={classes.accountBox} />
          </Box>
          <Box display="flex" flexDirection="column" justifyContent="center" flexGrow={1}>
            <ChevronRight className={classes.chevron} />
          </Box>
          <Box display="flex" flexDirection="column" justifyContent="center" flexGrow={1}>
            <Avatar src={DEFAULT_IMAGE.src} className={classes.profilePic} />
          </Box>
        </Box>
        {/* Information */}
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Box display="flex" justifyContent="center">
            <Typography component="p">
              <strong>Your manual contact entry of {manualContact?.fullName} will be deleted.</strong>
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Typography component="p">
              Notes and tags there will migrate to their CataLog profile.
            </Typography>
          </Box>
        </Box>
        {/* Action buttons */}
        <Box display="flex" justifyContent="flex-end" mr={4} mt={2}>
          <TextButton title="Cancel" onClick={() => { setOpen(false) }} />
          <TextButton
            title="Confirm and Merge"
            textColor={COLORS.white}
            color={COLORS.actionOrange}
            onClick={() => handleMergeButtonPress()}
          />
        </Box>
      </Box>
    </Dialog>
  )
}