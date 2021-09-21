import { Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import SearchResultRow from './SearchResultRow';
import NoResultsRow from './NoResultsRow';
import { IUser } from '../../lib/DataTypes';

export type IdToProfileMap = Record<string, IUser>

interface SearchResultTableProps {
  searchResults: IUser[] ,
}

export default function SearchResultsTable({ searchResults }: SearchResultTableProps ) {
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
    <TableContainer component={Paper} style={{ width: "50ch"}}>
      <Table >
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </TableContainer>
  )
}