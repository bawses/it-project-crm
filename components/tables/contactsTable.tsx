import { FormLabelBaseProps, Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import ContactsTableRow from './contactsTableRow';
import { IManualContact } from '../../lib/DataTypes';

export type IdToContactMap = Record<string, IManualContact>

interface ContactsTableProps {
  contacts: IManualContact[],
  handleRowButtonClick: (target: IManualContact) => Promise<boolean | undefined>
  idToContactMap?: IdToContactMap
}

export default function ContactsTable({ contacts, handleRowButtonClick, idToContactMap }: ContactsTableProps) {
  const rows: JSX.Element[] = []
  for (const contact of contacts) {
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
        {...(idToContactMap ? { addVariant: { alreadyAdded: alreadyAdded, handleAdd: handleRowButtonClick } } : { starVariant: { handleStar: handleRowButtonClick } })}
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