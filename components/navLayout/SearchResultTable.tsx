import { FormLabelBaseProps, Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import SearchResultRow from './SearchResultRow';
import { IUser } from '../../lib/DataTypes';

export type IdToProfileMap = Record<string, IUser>

interface SearchResultTableProps {
  searchResults: IUser[],
  handleRowButtonClick: (target: IUser) => Promise<boolean>
  idToProfileMap?: IdToProfileMap
}

export default function SearchResultsTable({ searchResults, handleRowButtonClick, idToProfileMap }: SearchResultTableProps ) {
  const rows: JSX.Element[] = []
  for (const profile of searchResults) {

    const key = profile._id || profile.name.firstName
    rows.push(
      <SearchResultRow
        key={key}
        profile={profile}
      />
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </TableContainer>
  )
}