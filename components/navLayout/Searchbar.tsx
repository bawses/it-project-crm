/**
 * Search bar and search results (fetching from API Client)
 */
import React, { useState, useEffect } from "react";
import { COLORS } from "../../lib/Colors";
import SearchResultTable from "./SearchResultTable";
import { searchContactsByName } from "../../api_client/ContactClient";
import { InputBase } from "@material-ui/core";
import { createStyles, alpha, Theme, makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// MaterialUI Icons
import SearchIcon from "@material-ui/icons/Search";
import { IContact } from "../../lib/UnifiedDataType";
import router, { useRouter } from "next/router";

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
      width: "100%",
    },
  })
);

export default function Searchbar() {
  const classes = useStyles();
  const theme = useTheme<Theme>();
  const MAX_ZINDEX = 200;

  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [searchString, setSearchString] = useState<string>("");
  const [predictiveResults, setPredictiveResults] = useState<IContact[]>([]);

  //  thank you Tony
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isOpen, setIsOpen] = useState(false);

  const DESKTOP_ROW_LIMIT = 5;
  const MOBILE_ROW_LIMIT = 3;

  useOnClickOutside(ref, () => setIsOpen(false));

  //  function to handle a click outside (to hide the search results)
  //  reference: https://github.com/Pomax/react-onclickoutside/issues/310
  function useOnClickOutside(ref: any, handler: any) {
    const router = useRouter();

    useEffect(() => {
      const listener = (event: any) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler();
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }

  // driver function for when a search string is inputted
  async function handleNewSearchString(event: any) {
    const newSearchString = event.target.value;
    setSearchString(newSearchString);

    if (newSearchString.length > 0) {
      setIsOpen(true);
    }

    try {
      // var fetchedPredictions = await searchContactsByName(searchString);
      searchContactsByName(searchString).then((results) => {
        var fetchedPredictions = results;
        const filteredPredictions = fetchedPredictions.filter((contact) => !contact.archived);
        setPredictiveResults(filteredPredictions);
      });
    } catch (e) {
      // TODO (NICE TO HAVE): Display error to user on webpage
      console.log(e);
    }
  }

  // when enter is pressed, redirect user to Search Results page with that string
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      router.push({
        pathname: "/search",
        query: { name: searchString },
      });
    }
  };

  return (
    <div className={classes.root} ref={ref}>
      {/* search bar */}
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        {isMobile ? (
          <InputBase
            placeholder="Search..."
            classes={{
              input: classes.inputInput,
            }}
            onChange={(event) => handleNewSearchString(event)}
            onKeyDown={handleKeyDown}
            inputProps={{ "aria-label": "search" }}
          />
        ) : (
          <InputBase
            placeholder="Search..."
            classes={{
              input: classes.inputInput,
            }}
            onChange={(event) => handleNewSearchString(event)}
            onKeyDown={handleKeyDown}
            inputProps={{ "aria-label": "search" }}
          />
        )}
        {isOpen && searchString.length > 0 ? (
          isMobile ? (
            <div className={classes.resultsTable} style={{ zIndex: MAX_ZINDEX }}>
              <SearchResultTable searchResults={predictiveResults.slice(0, MOBILE_ROW_LIMIT)} />
            </div>
          ) : (
            <div className={classes.resultsTable} style={{ zIndex: MAX_ZINDEX }}>
              <SearchResultTable searchResults={predictiveResults.slice(0, DESKTOP_ROW_LIMIT)} />
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
