import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material'

export function MainPage(props) {
  return (
    <React.Fragment>
      <AppBar
        sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', visibility: 'hidden' }}
      >
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

            <Button sx={{ color: 'white' }}>
              <Typography>ABOUT US</Typography>
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 20 }} maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item lg={5}>
            <Card variant="elevation" sx={{ paddingX: 3 }}>
              <Typography variant="h5" sx={{ paddingY: 3 }}>
                Inputs
              </Typography>
              <Divider variant="fullWidth" />
              <Typography variant="h5" sx={{ paddingY: 3 }}>
                Inputs
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">
                  Order Matching Method
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Order Matching Method"
                  // onChange={handleChange}
                >
                  <MenuItem key="dispatch" value={'dispatch'}>
                    <Typography variant="body1">Dispatch</Typography>
                  </MenuItem>
                  <MenuItem value={'boardcast'}>
                    <Typography variant="body1">Boardcast</Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Card>
          </Grid>

          <Grid item lg={7}>
            <Card variant="elevation" sx={{ p: 3 }}>
              dfa
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
