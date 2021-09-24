// search bar and search results (fetching from API Client)
import React, { useState, useRef, useEffect } from 'react';
import { COLORS } from "../../lib/Colors";
import { IUser } from "../../lib/DataTypes";
import SearchResultTable from './SearchResultTable';
import {searchUsersByName } from "../../api_client/UserQueries"
import { InputBase } from "@material-ui/core";
import { createStyles, alpha, Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useRouter } from "next/router";


// MaterialUI Icons
import SearchIcon from "@material-ui/icons/Search";
import { type } from 'os';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.9),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 1),
      },
      [theme.breakpoints.down("xs")]: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "95%",
      },
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: "auto",
      },
    },
    searchIcon: {
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0, 1),
      }, 
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
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(1, 1, 1, 2.25),
      },
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

    resultsTable: {
      position: "absolute",
      top: "45px",
    },

  })
);

// type SearchbarProps = {
//   pageType?: string;
// };

export default function Searchbar() {
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [searchString, setSearchString] = useState<string>("");
  const [predictiveResults, setPredictiveResults] = useState<IUser[]>([]);

  // const ref = useRef();
  // const [isOpen, setIsOpen] = useState(false);
  // useOnClickOutside(ref, () => setIsOpen(false));
  // const router = useRouter();


//  function to handle a click outside (to hide the search results)
//  reference: https://github.com/Pomax/react-onclickoutside/issues/310
// function useOnClickOutside(ref: any, handler: any) {
//   useEffect(
//     () => {
//       const listener = (event: any) => {
//         if (!ref.current || ref.current.contains(event.target)) {
//           setIsOpen(false);
//           return;
//         } 
//         handler(event);
        
//       };

//       document.addEventListener('mousedown', listener);
//       document.addEventListener('touchstart', listener);

//       return () => {
       
//         document.removeEventListener('mousedown', listener);
//         document.removeEventListener('touchstart', listener);
//       };
//     },
//     [ref, handler]
//   );
// }

  // driver function for when a search string is inputted
  async function handleNewSearchString(newSearchString: string) {
    setSearchString(newSearchString);
    
    console.log(newSearchString); 
    try {
      const fetchedPredictions = await searchUsersByName(searchString);
      console.log(fetchedPredictions);
      setPredictiveResults(fetchedPredictions); 
      // if (predictiveResults.length <= 0) {
      //   displayResultsError(undefined);
      // }
      // else {
      //   // console.log(predictiveResults[0].name);
      //   displayPredictiveResults(predictiveResults);
      // }

    } catch (e) {
      // TODO: Display error to user on webpage
      console.log(e);
    }
  }

  // function displayPredictiveResults(predictiveResults: IUser[]) {
  //   console.log("displayPredictiveResultscalled")

  //   return(
  //     // <div className={classes.root}>
  //       <div className={classes.resultsTable}> 
  //         <SearchResultTable searchResults={predictiveResults} />
  //       </div>
  //     // </div>  
  //   )
  // }

  // function displayResultsError(predictiveResults: undefined) {
  //   // TODO Create Error display
  //   console.log("ERROR")
  // }

  return (
    <div className={classes.root}>
          {/* search bar */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            {isMobile ? (
              <InputBase
                placeholder="Search..."
                classes={{
                  input: classes.inputInput
                }}
                onChange={(event) => handleNewSearchString(event.target.value)}
                inputProps={{ "aria-label": "search" }}
              />
            ) : (
              <InputBase
                placeholder="Search..."
                classes={{
                  input: classes.inputInput
                }}
                onChange={(event) => handleNewSearchString(event.target.value)}
                inputProps={{ "aria-label": "search" }}
              />
            )}
            <div className={classes.resultsTable}> 
              <SearchResultTable searchResults={predictiveResults} searchString = {searchString} />
            </div>
          </div>
    </div>
  );
}