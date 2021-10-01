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

interface SearchResultTableProps {
  searchResults: IContact[];
}

export default function SearchResultsTable({
  searchResults,
}: SearchResultTableProps) {
  //  Populating search results table
  const rows: JSX.Element[] = [];
  if (searchResults.length > 0) {
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
