import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  Stack,
  Toolbar,
  ListItem,
  Typography,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import GitHubIcon from '@mui/icons-material/GitHub'
import { useState } from 'react'
import { RoutesConfig } from '../routes-config'
import { useNavigate } from 'react-router-dom'
import React from 'react'

export const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const navigate = useNavigate()

  const list = () => (
    <Box
      sx={{ width: 500 }}
      role="presentation"
      onClick={() => setIsDrawerOpen(false)}
      onKeyDown={() => setIsDrawerOpen(false)}
    >
      <List>
        <Stack direction="row" alignItems="center" sx={{ my: 1 }}>
          <Box
            component="img"
            src="static/hku-logo.png"
            sx={{ height: 40, width: 40, paddingX: 2 }}
          />
          <Typography variant="h6">Quick Links</Typography>
        </Stack>
        <Divider />

        {RoutesConfig.map((route) => (
          <React.Fragment key={route.name}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(route.path)
                }}
              >
                <ListItemText primary={route.name} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  )
  return (
    <>
      <AppBar sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <Toolbar sx={{ height: 60 }} variant="regular">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width={'100%'}
          >
            <Stack direction="row" alignItems="center">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => {
                  setIsDrawerOpen((prevIsDrawerOpen) => !prevIsDrawerOpen)
                }}
                edge="start"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ mr: 2, borderColor: '#aaa' }}
              />
              <Box
                component="img"
                src="static/hku-logo.png"
                sx={{ height: 40, width: 40, pr: 2 }}
              />
              <Typography variant="subtitle1">
                Smart Mobility Lab at HKU
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Button
                sx={{ color: 'white' }}
                onClick={() => {
                  window.open('https://sites.google.com/view/kejintao')
                }}
              >
                <Typography>ABOUT US</Typography>
              </Button>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ mx: 2, borderColor: '#aaa' }}
              />
              <IconButton
                color="inherit"
                aria-label="github"
                onClick={() =>
                  window.open('https://github.com/Matthewow/demos-hkusmlab')
                }
                edge="start"
              >
                <GitHubIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={'left'}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        {list()}
      </Drawer>
    </>
  )
}
