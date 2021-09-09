import { FormLabelBaseProps, Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import ContactsTableRow from './contactsTableRow';
import { IManualContact } from '../../lib/DataTypes';

interface ContactsTableProps {
  contacts: IManualContact[],
  searchResultVariant: boolean
}

function handleStar() { }

function handleAdd() { }

export default function ContactsTable({ contacts, searchResultVariant }: ContactsTableProps) {
  const rows: JSX.Element[] = []
  for (const contact of contacts) {
    const key = contact._id || contact.name.firstName
    rows.push(
      <ContactsTableRow
        key={key}
        name={contact.name.firstName + " " + contact.name.lastName}
        role={contact.job}
        isStarred={contact.starred || false}
        {...(searchResultVariant ? { handleAdd: handleAdd } : { handleStar: handleStar })}
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