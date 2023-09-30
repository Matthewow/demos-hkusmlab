import { Box, Container, Typography, Divider } from '@mui/material'
import React from 'react'

export const DemoContainer = ({ children, title, about }) => {
  return (
    <Container sx={{ mt: 15, mb: 10 }} maxWidth="xl">
      <Box sx={{ marginY: 5 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 500 }}
          gutterBottom
        >
          {title}
        </Typography>
        <Divider sx={{ marginY: 5 }}></Divider>
        <Typography variant="h6" sx={{ mb: 2 }}>
          About
        </Typography>
        {about}
      </Box>
      <Divider sx={{ marginBottom: 5 }}></Divider>
      {children}
    </Container>
  )
}
