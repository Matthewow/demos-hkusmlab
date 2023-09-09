import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

export const NavBar = () => {
  return (
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
              // onClick={handleDawrerOpen}
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
  )
}
