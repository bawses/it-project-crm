/* predictive search results drop down - appears when a search string is being typed;
   disappears when clicked away from OR when the search string is empty */
import React, { useState, useRef, useEffect } from 'react';
import { Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import SearchResultRow from './SearchResultRow';
import NoResultsRow from './NoResultsRow';
import { IUser } from '../../lib/DataTypes';

export type IdToProfileMap = Record<string, IUser>

interface SearchResultTableProps {
  searchString: String,
  searchResults: IUser[],
}

export default function SearchResultsTable({ searchString, searchResults }: SearchResultTableProps ) {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(ref, () => setIsOpen(false));
  // const router = useRouter();


  //  function to handle a click outside (to hide the search results)
  //  reference: https://github.com/Pomax/react-onclickoutside/issues/310
  function useOnClickOutside(ref: any, handler: any) {
    useEffect(
      () => {
        const listener = (event: any) => {
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          } 
          handler(event);
          
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
        
          document.removeEventListener('mousedown', listener);
          document.removeEventListener('touchstart', listener);
        };
      },
      [ref, handler]
    );
  }

  if (searchString.length > 0) {
    setIsOpen(true);
  }

  //  Populating search results table
  const rows: JSX.Element[] = []
  if (searchResults.length > 0) {
    for (const profile of searchResults) {
      const key = profile._id || profile.name.firstName
      rows.push(
        <SearchResultRow
          key={key}
          profile={profile}
        />
      );
    }
  } else {
    rows.push(
      <NoResultsRow />
    );
  }
    
  return (
    // TODO: fix width 
    <>
      {isOpen? (
        <TableContainer component={Paper} style={{ width: "50ch"}}>
          <Table >
            <TableBody>
              {rows}
            </TableBody>
          </Table>
        </TableContainer>
      )
    :(<></>)
    }
    </>
  )

}