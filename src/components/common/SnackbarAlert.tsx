import { Alert, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import ActionResult from '../../model/ActionResult';

type Props = {
  message: ActionResult
}

const SnackbarAlert: React.FC<Props> = ({ message }) => {
  const [snackbarMsg, setSnackbarMsg] = useState<ActionResult | undefined>(message);

  useEffect(() => {
    setSnackbarMsg(message)
  }, [message])

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarMsg(undefined);
  };

  return (
    ReactDOM.createPortal(
    <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        open={snackbarMsg !== undefined}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarMsg?.status}
          sx={{ width: "100%" }}
        >
          {snackbarMsg?.message}
        </Alert>
    </Snackbar>,
    document.body
  ))
}

export default SnackbarAlert