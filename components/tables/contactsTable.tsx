import { Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import ContactsTableRow from './contactsTableRow';
import { IContact } from '../../lib/UnifiedDataType';

interface ContactsTableProps {
  contacts: IContact[],
  handleRowButtonClick: (target: IContact) => Promise<boolean>
  isAddVariant: boolean
}

export default function ContactsTable({ contacts, handleRowButtonClick, isAddVariant }: ContactsTableProps) {
  const rows: JSX.Element[] = []
  for (const contact of contacts) {
    const key = contact._id || contact.name.firstName
    rows.push(
      <ContactsTableRow
        key={key}
        contact={contact}
        {...(isAddVariant ? { addVariant: { handleContactAdd: handleRowButtonClick } } : { starVariant: { handleStar: handleRowButtonClick } })}
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