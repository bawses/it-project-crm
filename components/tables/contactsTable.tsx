import { FormLabelBaseProps, Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import ContactsTableRow from './contactsTableRow';
import { IManualContact } from '../../lib/DataTypes_Get';

export type IdToContactMap = Record<string, IManualContact>

interface ContactsTableProps {
  contacts: IManualContact[],
  handleRowButtonClick: (target: IManualContact) => Promise<boolean>
  idToContactMap?: IdToContactMap
}

export default function ContactsTable({ contacts, handleRowButtonClick, idToContactMap }: ContactsTableProps) {
  const rows: JSX.Element[] = []
  for (const contact of contacts) {
    // For the search results variant, check if the each contact has been already added or not
    let alreadyAdded = false
    if (idToContactMap && contact._id) {
      if (contact._id in idToContactMap) {
        alreadyAdded = true
      }
    }

    const key = contact._id || contact.name.firstName
    rows.push(
      <ContactsTableRow
        key={key}
        contact={contact}
        {...(idToContactMap ? { addVariant: { alreadyAdded: alreadyAdded, handleContactAdd: handleRowButtonClick } } : { starVariant: { handleStar: handleRowButtonClick } })}
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