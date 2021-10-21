import { Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import ContactsTableRow from './contactsTableRow';
import { IContact } from '../../lib/UnifiedDataType';

interface ContactsTableProps {
  setLoadingState: (loading: boolean) => void,
  contacts: IContact[],
  handleStarClick?: (contact: IContact) => Promise<boolean>,
  handleAddClick?: (contact: IContact, rowSetter: (isLoading: boolean) => void) => Promise<boolean>,
  handleSelectClick?: (contact: IContact) => void
}

export default function ContactsTable({ setLoadingState, contacts, handleStarClick, handleAddClick, handleSelectClick }: ContactsTableProps) {
  const rows: JSX.Element[] = []
  for (const contact of contacts) {
    const key = contact._id || contact.name.firstName
    rows.push(
      <ContactsTableRow
        key={key}
        setLoadingState={setLoadingState}
        contact={contact}
        {...(
          handleAddClick ? { addVariant: { handleContactAdd: handleAddClick } }
            : handleStarClick ? { starVariant: { handleStar: handleStarClick } }
              : handleSelectClick ? { mergeVariant: { handleSelectClick: handleSelectClick } }
                : {}
        )
        }
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