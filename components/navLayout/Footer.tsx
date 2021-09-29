/**
 * CataLog footer nav (mobile) 
 */
import React from "react";
import { Box, IconButton, AppBar, Toolbar } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: "auto",
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    customizeToolbar: {
      minHeight: "50px",
      maxHeight: "50px",
    },
    navButton: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
  })
);

type FooterProps = {
  pageType?: string;
};

export default function Footer({ pageType = "personal" }: FooterProps) {
  // NavBar code references https://material-ui.com/components/app-bar/
  const classes = useStyles();
  const router = useRouter();
  return (
    <div>
      <AppBar color="primary" className={classes.appBar}>
        <Toolbar className={classes.customizeToolbar}>
          <div className={classes.grow}>
            <Box display="flex" justifyContent="center">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                className={classes.navButton}
                onClick={() => router.push("/profile")}
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
              <IconButton
                color="inherit"
                className={classes.navButton}
                onClick={() => router.push("/contacts")}
              >
                <CollectionsBookmarkIcon fontSize="large" />
              </IconButton>
              <IconButton
                edge="end"
                color="inherit"
                className={classes.navButton}
                onClick={() => router.push("/contacts/create")}
              >
                <PersonAddIcon fontSize="large" />
              </IconButton>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
