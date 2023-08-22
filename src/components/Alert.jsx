import React, { useCallback, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'

export function useAlert() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('error')

  const showAlert = useCallback((message, severity = 'error') => {
    setMessage(message)
    setSeverity(severity)
    setOpen(true)
  }, [])

  const hideAlert = useCallback(() => {
    setOpen(false)
  }, [])

  const AlertComponent = () => (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={hideAlert}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity={severity} sx={{ width: '100%' }} onClose={hideAlert}>
        {message}
      </Alert>
    </Snackbar>
  )

  return [AlertComponent, showAlert]
}
