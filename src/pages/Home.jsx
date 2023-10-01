import { Box, Typography } from '@mui/material'
import React from 'react'
import backgroundImage from '../images/home-background-image.jpg'

export const HomePage = () => {
  const backgroundTransparency = 0.6

  const rootStyles = {
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, ${backgroundTransparency}), rgba(0, 0, 0, ${backgroundTransparency})), url(${backgroundImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      zIndex: -1,
    },
  }

  const contentStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    color: 'white',
    fontWeight: 800,
  }

  return (
    <>
      <Box sx={rootStyles}>
        <Box sx={contentStyles}>
          <Typography variant="h1" fontWeight={800}>
            HKU Smart Mobility Lab
          </Typography>
          <Typography variant="h1" fontWeight={800}>
            Research DEMOs
          </Typography>
          <Typography variant="body1">
            Scroll down for our available demos ▼
          </Typography>
        </Box>
      </Box>
      <Box sx={{ m: 30 }}>
        <Typography variant="h4" fontWeight={500}>
          In development...
        </Typography>
      </Box>
    </>
  )
}
