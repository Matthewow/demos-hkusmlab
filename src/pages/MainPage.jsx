import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {
  Alert,
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
  Snackbar,
  Stack,
  TextField,
} from '@mui/material'
import { NavBar } from '../components/NavBar'
import { PopoverIconTitle } from '../components/PopoverIconTitle'
import Lottie from 'lottie-react'
import animationData from './animation_order.json'
import CSVReader from 'react-csv-reader'
import { CSVUploader } from '../components/CSVUploader'

export function MainPage(props) {
  const [algotype, setAlgotype] = useState('')
  const [radius, setRadius] = useState(0)
  const [driverData, setDriverData] = useState(null)
  const [orderData, setOrderData] = useState(null)
  const [alertContent, setAlertContent] = useState('')
  const [alertStatus, setAlertStatus] = useState(false)
  const [alerttType, setAlertType] = useState('success')

  const handleSubmit = () => {
    if (!algotype || !radius) {
      setAlertContent('Please fill in all the fields')
      setAlertType('error')
      setAlertStatus(true)
    } else if (!(!isNaN(radius) && radius >= 1 && radius <= 1000)) {
      setAlertContent('Radius should be a number between 1 - 1000')
      setAlertType('error')
      setAlertStatus(true)
    } else {
      const payload = {
        algotype: algotype,
        radius: radius,
        driverData: driverData,
        orderData: orderData,
      }
      console.log(payload)
      setAlertType('success')
      setAlertContent('submit success')
      setAlertStatus(true)
    }
  }

  return (
    <React.Fragment>
      <NavBar />

      <Container sx={{ mt: 20 }} maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item lg={4} md={4} xs={12} sm={5}>
            <Card
              variant="elevation"
              sx={{ paddingX: 3, paddingBottom: 3, boxShadow: 5 }}
            >
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

              <PopoverIconTitle
                title="Driver Data Table"
                popoverContent={
                  <Typography sx={{ p: 1 }} variant="body1">
                    Driver Data Table should follow the format here
                    driver_id,driver_region,driver_lat, driver_lng
                  </Typography>
                }
              />

              <CSVUploader setterFuc={setDriverData} currentData={driverData} />

              <PopoverIconTitle
                title="Order Data Table"
                popoverContent={
                  <Typography sx={{ p: 1 }} variant="body1">
                    Order Data Table should follow the format here
                    order_id,order_region,order_lat, order_lng
                  </Typography>
                }
              />
              <CSVUploader setterFuc={setOrderData} currentData={orderData} />

              <Divider variant="fullWidth" sx={{ mt: 3, marginBottom: 3 }} />
              <Stack justifyContent="flex-end" direction="row">
                <Button
                  variant="contained"
                  color="info"
                  sx={{ marginRight: 2 }}
                  onClick={handleSubmit}
                >
                  submit
                </Button>
              </Stack>
            </Card>
          </Grid>

          <Grid item lg={8} md={8} xs={12} sm={7}>
            <Card
              variant="elevation"
              sx={{ px: 3, height: '100%', boxShadow: 5 }}
            >
              <Typography variant="h5" sx={{ paddingY: 3 }}>
                Results
              </Typography>
              <Divider variant="fullWidth" />
              <Container sx={{ paddingY: 3 }}>
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mt: 10 }}
                >
                  <Box maxWidth="50%">
                    <Lottie loop={false} animationData={animationData} />
                  </Box>
                  <Typography variant="subtitle1" sx={{ color: 'grey' }}>
                    waitting for submission
                  </Typography>
                </Stack>
              </Container>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={alertStatus}
        autoHideDuration={4000}
        onClose={() => {
          setAlertStatus(false)
        }}
      >
        <Alert
          severity={alerttType}
          sx={{ width: '100%' }}
          onClose={() => {
            setAlertStatus(false)
          }}
        >
          {alertContent}
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}
