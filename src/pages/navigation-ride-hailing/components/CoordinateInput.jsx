import React from 'react'
import { TextField } from '@mui/material'
import { Stack } from '@mui/system'

function CoordinateInput(props) {
  return (
    <Stack spacing={2} direction="row">
      <TextField id="outlined-basic" label="latitude" variant="outlined" />
      <TextField id="outlined-basic" label="longitude" variant="outlined" />
    </Stack>
  )
}

export default CoordinateInput
