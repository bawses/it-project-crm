/**
 * Predictive search results drop down table - appears when a search string
 * is being typed & disappears when clicked away from OR when the search
 * string is empty
 */
import { Paper, Table, TableBody, TableContainer } from "@material-ui/core";
import SearchResultRow from "./SearchResultRow";
import NoResultsRow from "./NoResultsRow";
import { IContact } from "../../lib/UnifiedDataType";
import React from "react";
import LoadingRow from "./LoadingRow";

interface SearchResultTableProps {
  searchResults: IContact[];
  isLoading: boolean;
}

export default function SearchResultsTable({
  searchResults,
  isLoading
}: SearchResultTableProps) {
  //  Populating search results table
  const rows: JSX.Element[] = [];
  if (isLoading) {
    // Results are still loading, show loading indicator
    rows.push(<LoadingRow />);
  } else if (searchResults.length > 0) {
    let counter = 0;
    for (const profile of searchResults) {
      const key = profile._id;
      rows.push(<SearchResultRow key={counter++} profile={profile} />);
    }
  } else {
    const key = null;
    rows.push(<NoResultsRow key={key} />);
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>{rows}</TableBody>
      </Table>
    </TableContainer>
  );
}
