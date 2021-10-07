import { Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import ContactsTableRow from './contactsTableRow';
import { IContact } from '../../lib/UnifiedDataType';

export type ContactsTableVariant = "Add" | "Star" | "Merge"

interface ContactsTableProps {
  contacts: IContact[],
  handleRowButtonClick?: (target: IContact, rowSetter: (isLoading: boolean) => void) => Promise<boolean>
  variant: ContactsTableVariant
}

export default function ContactsTable({ contacts, handleRowButtonClick, variant }: ContactsTableProps) {
  const rows: JSX.Element[] = []
  for (const contact of contacts) {
    const key = contact._id || contact.name.firstName
    if (handleRowButtonClick !== undefined) {
      rows.push(
        <ContactsTableRow
          key={key}
          contact={contact}
          {...(
            variant == "Add" ?
              { addVariant: { handleContactAdd: handleRowButtonClick } }
              : variant == "Star" ?
                { starVariant: { handleStar: handleRowButtonClick } }
                : { mergeVariant: { handleContactMerge: handleRowButtonClick } }
          )
          }
        />
      )
    } else {
      rows.push(
        <ContactsTableRow
          key={key}
          contact={contact}
        />
      )
    }
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