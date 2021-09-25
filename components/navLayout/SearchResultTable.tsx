/* predictive search results drop down - appears when a search string is being typed;
   disappears when clicked away from OR when the search string is empty */
import { Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import SearchResultRow from './SearchResultRow';
import NoResultsRow from './NoResultsRow';
import { IUser } from '../../lib/DataTypes';
import React from 'react';

export type IdToProfileMap = Record<string, IUser>

interface SearchResultTableProps {
  searchResults: IUser[],
}

export default function SearchResultsTable({ searchResults }: SearchResultTableProps ) {
  
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
    <TableContainer component={Paper}>
      <Table >
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </TableContainer>
  )

}