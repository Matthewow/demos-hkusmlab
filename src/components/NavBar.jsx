import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material'

export const NavBar = () => {
  return (
    <AppBar sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
      <Toolbar sx={{ height: 90 }} variant="regular">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width={'100%'}
        >
          <Stack direction="row" alignItems="center">
            <Box
              component="img"
              src="static/hku-logo.png"
              sx={{ height: 40, width: 40, pr: 2 }}
            />
            <Typography variant="h6">
              Smart Mobility Lab at HKU | Driver-Order Matching Dashboard
            </Typography>
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
