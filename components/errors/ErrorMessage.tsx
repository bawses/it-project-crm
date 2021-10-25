import { Alert, AlertTitle } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

export type AlertSeverity = "error" | "warning" | "info" | "success"

interface ErrorMessageProps {
  open: boolean,
  alertMessage?: string,
  severity?: AlertSeverity,
  alertTitle?: string
  handleClose?: () => void,
}

export default function ErrorMessage({
  open,
  alertMessage = "An error has occurred - Please refresh the page and try again",
  severity = "error",
  alertTitle = "Error",
  handleClose = () => {},
}: ErrorMessageProps) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert variant="filled" severity={severity}>
        <AlertTitle>{alertTitle}</AlertTitle>
        {alertMessage}
      </Alert>
    </Snackbar>
  )
}