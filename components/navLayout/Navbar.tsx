import React from 'react';
import { Typography, AppBar, Toolbar, InputBase, IconButton } from "@material-ui/core";
import { COLORS } from "../../lib/Colors";
import { createStyles, alpha, Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";

// MaterialUI Icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";

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
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.9),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 1),
      },
      marginRight: theme.spacing(2),
      width: "100%",
      marginLeft: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(2),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: COLORS.black,
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      marginLeft: theme.spacing(2),
      color: COLORS.black,
      transition: theme.transitions.create("width"),
      width: "100%",
      height: "2.75ch",
      [theme.breakpoints.up("md")]: {
        width: "50ch",
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
      [theme.breakpoints.up("md")]: {
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
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search..."
              classes={{
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>

          {/* icons */}
          {isMobile ? (
            <></>
          ) : (
            // show icons in Navbar if not Mobile
            <React.Fragment>
              {/* <NavLink className="nav-name" to="/customer/pastorders">Past Orders</NavLink> */}
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
              >
                <CollectionsBookmarkIcon fontSize="large" />
              </IconButton>
              <IconButton
                className={classes.navButton}
                color="inherit"
                aria-label="myProfile"
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
