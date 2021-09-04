import React, { NavLink } from 'react';
import { Link, Grid, Box, Typography, AppBar, Toolbar, InputBase } from "@material-ui/core";
import { COLORS } from "../src/colors";
import { createStyles, alpha, Theme, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";

// MaterialUI Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      marginLeft: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.9),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 1),
      },
      marginRight: theme.spacing(2),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: COLORS.black
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      marginLeft: theme.spacing(1),
      color: COLORS.black,
      transition: theme.transitions.create('width'),
      width: '100%',
      height: '3ch',
      [theme.breakpoints.up('sm')]: {
        width: '30ch',
      },
      [theme.breakpoints.up('md')]: {
        width: '50ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    navButton: {
      marginRight: theme.spacing(3),
    },
    title: {
      [theme.breakpoints.up("xs")]: {
        flexGrow: 1
      }
    },
    searchAdd : {
      [theme.breakpoints.up("xs")]: {
        flexGrow: 1
      }
    },
    color: {
      color: COLORS.primaryBlue,
    },
  }),
);

export default function PersonalNavbar(props: any) {
  // NavBar code references https://material-ui.com/components/app-bar/
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar >
        
              <Typography variant="h5" component="h5" className={classes.title}>CataLog</Typography>

              {/* add search bar here */}
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>

              <React.Fragment>
              {/* <NavLink className="nav-name" to="/customer/pastorders">Past Orders</NavLink> */}

              <div className= {classes.searchAdd}>
                <IconButton className={classes.navButton} color="inherit" aria-label="myProfile">
                  <PersonAddIcon fontSize = 'large' />
                </IconButton> 

              </div>

    
              <IconButton className={classes.navButton} color="inherit" aria-label="myProfile">
                <CollectionsBookmarkIcon fontSize = 'large'/>
              </IconButton> 
              <IconButton className={classes.navButton} color="inherit" aria-label="myProfile">
                <AccountCircleIcon fontSize = 'large'/>
              </IconButton> 

              </React.Fragment>

        </Toolbar>
      </AppBar>

    </div>
  );
}
