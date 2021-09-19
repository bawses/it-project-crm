import React from 'react';
import { Typography, AppBar, Toolbar, InputBase, IconButton } from "@material-ui/core";
import { COLORS } from "../../lib/Colors";
import { createStyles, alpha, Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useRouter } from "next/router";
import Searchbar from "./Searchbar";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    customizeToolbar: {
      minHeight: "50px",
      maxHeight: "50px",
    },
    title: {
      [theme.breakpoints.up("xs")]: {
        flexGrow: 0.5,
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    navButton: {
      marginRight: theme.spacing(2),
    },
    searchAdd: {
      [theme.breakpoints.up("xs")]: {
        flexGrow: 1,
      },
    },
    color: {
      color: COLORS.primaryBlue,
    },
  })
);

type NavbarProps = {
  pageType?: string;
};

export default function Navbar({ pageType = "personal" }: NavbarProps) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const router = useRouter();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.customizeToolbar}>
          {/* logo */}
          <Typography variant="h5" component="h5" className={classes.title}>
            CataLog
          </Typography>

          {/* search bar */}
          <Searchbar/>

          {/* icons */}
          {isMobile ? (
            <></>
          ) : (
            // show icons in Navbar if not Mobile
            <React.Fragment>
              <div className={classes.searchAdd}>
                <IconButton
                  className={classes.navButton}
                  color="inherit"
                  aria-label="myProfile"
                  onClick={() => router.push("/contacts/create")}
                >
                  <PersonAddIcon fontSize="large" />
                </IconButton>
              </div>

              <IconButton
                className={classes.navButton}
                color="inherit"
                aria-label="myProfile"
                onClick={() => router.push("/contacts")}
              >
                <CollectionsBookmarkIcon fontSize="large" />
              </IconButton>
              <IconButton
                className={classes.navButton}
                color="inherit"
                aria-label="myProfile"
                onClick={() => router.push("/profile")}
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
