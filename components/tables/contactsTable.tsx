import { Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import ContactsTableRow from './contactsTableRow';
import { IManualContact } from '../DataTypes';

interface ContactsTableProps {
  contacts: IManualContact[]
}

export default function ContactsTable({ contacts }: ContactsTableProps) {
  const rows: JSX.Element[] = []
  for (const contact of contacts) {
    const key = contact._id || contact.name.firstName
    rows.push(<ContactsTableRow key={key} name={contact.name.firstName + " " + contact.name.lastName} role={contact.job} isStarred={contact.starred || false} />)
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