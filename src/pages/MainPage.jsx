import React, { useState } from 'react'
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
  Popover,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { NavBar } from '../components/NavBar'
import { PopoverIconTitle } from '../components/PopoverIconTitle'
import Lottie from 'lottie-react'
import animationData from './animation_order.json'

export function MainPage(props) {
  const [algotype, setAlgotype] = useState('')
  const [radius, setRadius] = useState(0)

  return (
    <React.Fragment>
      <NavBar />

      <Container sx={{ mt: 20 }} maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item lg={5}>
            <Card variant="elevation" sx={{ paddingX: 3, paddingBottom: 3 }}>
              <Typography variant="h5" sx={{ paddingY: 3 }}>
                Inputs
              </Typography>
              <Divider variant="fullWidth" />
              <PopoverIconTitle
                title="Algorithm Type"
                popoverContent={
                  <>
                    <Typography sx={{ p: 1 }} variant="body1">
                      Broadcasting In the broadcasting phase, the system
                      announces available orders to drivers. This is typically
                      done within a certain radius or zone to ensure that only
                      nearby drivers, who are likely to be able to fulfill the
                      order in a timely manner, receive the broadcast.
                    </Typography>
                    <Divider />
                    <Typography sx={{ p: 1 }} variant="body1">
                      Dispatching Dispatching involves assigning the order to a
                      specific driver. Once the drivers have received the
                      broadcast, they can choose to accept or reject the order.
                    </Typography>
                  </>
                }
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">
                  Order Matching Method
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Order Matching Method"
                  value={algotype}
                  onChange={(e) => setAlgotype(e.target.value)}
                >
                  <MenuItem key="dispatch" value={'dispatch'}>
                    <Typography variant="body1">Dispatch</Typography>
                  </MenuItem>
                  <MenuItem value={'boardcast'}>
                    <Typography variant="body1">Boardcast</Typography>
                  </MenuItem>
                </Select>
              </FormControl>

              <Divider variant="fullWidth" />

              <PopoverIconTitle
                title="Radius"
                popoverContent={
                  <Typography sx={{ p: 1 }} variant="body1">
                    Radius means blabla, with range should be from 1 - 1000
                  </Typography>
                }
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Number of range 1 - 1000"
                variant="outlined"
                onChange={(e) => setRadius(e.target.value)}
              />
              <Divider variant="fullWidth" />

              <PopoverIconTitle
                title="Driver Data Table"
                popoverContent={
                  <Typography sx={{ p: 1 }} variant="body1">
                    Driver Data Table here
                  </Typography>
                }
              />

              <Button variant="outlined">Upload CSV file</Button>

              <PopoverIconTitle
                title="Order Data Table"
                popoverContent={
                  <Typography sx={{ p: 1 }} variant="body1">
                    Order Data Table here
                  </Typography>
                }
              />

              <Button variant="outlined">Upload CSV file</Button>
            </Card>
          </Grid>

          <Grid item lg={7}>
            <Card variant="elevation" sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ paddingY: 3 }}>
                Results
              </Typography>
              <Container>
                <Box maxWidth="50%">
                  <Lottie loop={false} animationData={animationData} />
                </Box>
              </Container>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
