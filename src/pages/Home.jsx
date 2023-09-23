import { Box, Typography } from '@mui/material'
import React from 'react'
export const HomePage = () => {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h1">Demos Home Page</Typography>
      <Typography variant="subtitle1">To be done</Typography>
    </Box>
  )
}
