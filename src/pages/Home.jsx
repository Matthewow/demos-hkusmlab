import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import backgroundImage from '../images/home-background-image.jpg'
import { RoutesConfig } from '../routes-config'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
  const backgroundTransparency = 0.6
  const navigate = useNavigate()
  console.log(
    `@CopyRight Disclaimer: \n Photo by Joshua Rawson-Harris("https://unsplash.com/@joshrh19?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText") on Unsplash`
  )

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
  }

  return (
    <>
      <Box sx={rootStyles}>
        <Box sx={contentStyles}>
          <Typography variant="h1" sx={{ fontWeight: 800 }}>
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
      <Container sx={{ my: 20 }} spacing={20}>
        <Typography variant="h3" sx={{ marginBottom: 5 }}>
          Available Demos
        </Typography>

        <Box>
          {RoutesConfig.map((route) => {
            if (route.path === '/') return <></>
            return (
              <>
                <Divider />
                <Stack
                  key={route.path}
                  sx={{ my: 5 }}
                  spacing={2}
                  alignItems="flex-start"
                >
                  <Typography variant="h4" fontWeight={500}>
                    {route.name}
                  </Typography>
                  <Typography variant="body1" fontWeight="light">
                    {route.description}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#123456' }}
                    onClick={() => {
                      navigate(route.path)
                    }}
                  >
                    Go to demo ➤
                  </Button>
                </Stack>
              </>
            )
          })}
        </Box>
      </Container>
    </>
  )
}
