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
import { useState } from 'react'
import { RoutesConfig } from '../routes-config'

export const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
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
          <Typography variant="h6">Quick Link</Typography>
        </Stack>

        {RoutesConfig.map((route) => (
          <>
            <Divider />
            <ListItem key={route.name} disablePadding>
              <ListItemButton>
                <ListItemText primary={route.name} />
              </ListItemButton>
            </ListItem>
          </>
        ))}
      </List>
    </Box>
  )
  return (
    <>
      <AppBar sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <Toolbar sx={{ height: 80 }} variant="regular">
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
              <Divider orientation="vertical" flexItem sx={{ mr: 2 }} />
              <Box
                component="img"
                src="static/hku-logo.png"
                sx={{ height: 40, width: 40, pr: 2 }}
              />
              <Typography variant="h6">Smart Mobility Lab at HKU</Typography>
            </Stack>

            <Button
              sx={{ color: 'white' }}
              onClick={() => {
                window.open('https://sites.google.com/view/kejintao')
              }}
            >
              <Typography>ABOUT US</Typography>
            </Button>
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
