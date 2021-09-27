/**
 * CataLog top NavBar for Personal account
 */
import React from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { COLORS } from "../../lib/Colors";
import {
  createStyles,
  Theme,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Searchbar from "./Searchbar";
import { useRouter } from "next/router";
import Tooltip from "@material-ui/core/Tooltip";
import HomeButton from "../buttons/HomeButton";

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
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0.75),
      },
    },
    title: {
      padding: 0,
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
    btn: {
      textTransform: "none",
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
          {isMobile ? (
            <HomeButton
              textColor={COLORS.white}
              title={"CataLog"}
              isMobile={true}
              onClick={() => router.push("/contacts")}
              className={classes.title}
            />
          ) : (
            <HomeButton
              textColor={COLORS.white}
              title={"CataLog"}
              isMobile={false}
              onClick={() => router.push("/contacts")}
              className={classes.title}
            />
          )}

          {/* search bar */}
          <Searchbar />

          {/* icons */}
          {isMobile ? (
            <></>
          ) : (
            // show icons in Navbar if not Mobile
            <React.Fragment>
              <div className={classes.searchAdd}>
                <Tooltip title="Add Manual Contact">
                  <IconButton
                    className={classes.navButton}
                    color="inherit"
                    aria-label="myProfile"
                    onClick={() => router.push("/contacts/create")}
                  >
                    <PersonAddIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </div>

              <Tooltip title="Contacts">
                <IconButton
                  className={classes.navButton}
                  color="inherit"
                  aria-label="myContacts"
                  onClick={() => router.push("/contacts")}
                >
                  <CollectionsBookmarkIcon fontSize="large" />
                </IconButton>
              </Tooltip>

              <Tooltip title="My Profile">
                <IconButton
                  className={classes.navButton}
                  color="inherit"
                  aria-label="myProfile"
                  onClick={() => router.push("/profile")}
                >
                  <AccountCircleIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
