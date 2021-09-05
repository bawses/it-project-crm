import { Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import ContactsTableRow, { ContactsTableRowProps } from './contactsTableRow';

interface ContactsTableProps {
  contacts: ContactsTableRowProps[]
}

export default function ContactsTable({ contacts }: ContactsTableProps) {
  const rows: JSX.Element[] = []
  for (const contact of contacts) {
    const key = contact.name + contact.role
    rows.push(<ContactsTableRow key={key} name={contact.name} role={contact.role} isStarred={contact.isStarred} />)
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