import React from 'react';
import { COLORS } from "../../src/colors";
import { Box, IconButton, AppBar, Toolbar } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

// MaterialUI Icons
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1
    },
    customizeToolbar: {
      minHeight: '50px',
      maxHeight: '50px'
    },
    navButton: {
      margin: theme.spacing(5),
    },
  }),
);

type FooterProps = {
  pageType?: string;
}

export default function Footer({pageType = "personal"}: FooterProps) {
    // NavBar code references https://material-ui.com/components/app-bar/
    const classes = useStyles();
    return (
      <div>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar className={classes.customizeToolbar}>
                <div className={classes.grow} >
                  <Box display="flex" justifyContent="center">
                    <IconButton edge="start" color="inherit" aria-label="open drawer" className={classes.navButton}>
                      < AccountCircleIcon fontSize = 'large' />
                    </IconButton>
                    <IconButton color="inherit" className={classes.navButton}>
                      <CollectionsBookmarkIcon fontSize = 'large'/>
                    </IconButton>
                    <IconButton edge="end" color="inherit" className={classes.navButton}>
                      <PersonAddIcon fontSize = 'large'/>
                    </IconButton>
                  </Box>
                </div>
            </Toolbar>
        </AppBar>
      </div>
    );
  }
  