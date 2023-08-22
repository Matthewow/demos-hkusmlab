import React, { useState } from 'react'
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
  Select,
  Snackbar,
  Stack,
  TextField,
} from '@mui/material'
import { NavBar } from '../components/NavBar'
import { PopoverIconTitle } from '../components/PopoverIconTitle'
import Lottie from 'lottie-react'
import animationData from './animation_order.json'
import { CSVUploader } from '../components/CSVUploader'
import { appConfigs, fileNames } from '../appConfigs'
import { MatchResult } from '../components/MatchResult'
import { post } from '../utils/http'
import { useAlert } from '../components/Alert'

export function MainPage() {
  const [algotype, setAlgotype] = useState('')
  const [radius, setRadius] = useState('')
  const [driverData, setDriverData] = useState(null)
  const [orderData, setOrderData] = useState(null)
  const [resultLoaded, setResultLoaded] = useState(false)
  const [resultData, setResultData] = useState(null)
  const [Alert, showAlert] = useAlert()

  const inputChecking = () => {
    console.log(driverData, orderData)
    if (
      isNaN(radius) ||
      radius < appConfigs.rangeMIN ||
      radius > appConfigs.rangeMAX
    ) {
      showAlert(
        `Radius should be a number between ${appConfigs.rangeMIN} - ${appConfigs.rangeMAX}!`
      )
      return false
    } else if (driverData.name !== fileNames.driverInputName) {
      showAlert('Please upload driver data file named with driver_info.csv')
      return false
    } else if (orderData.name !== fileNames.orderInputName) {
      showAlert('Please upload order data file named with order_info.csv')
      return false
    }
    return true
  }

  const handleSubmit = () => {
    if (inputChecking()) {
      const formData = new FormData()
      formData.append('method', algotype)
      formData.append('radius', parseInt(radius) / 1000)
      formData.append('driver_info', driverData)
      formData.append('order_info', orderData)
      console.log('formData', formData)
      post(formData)
        .then((res) => {
          console.log('result raw data: ', res)
          setResultData(res)
          showAlert('Successfully submitted!', 'success')
          setResultLoaded(true)
        })
        .catch((err) => {
          console.error(err)
          showAlert(`Submission failed! Please check your input! ${err}`)
        })
    }
  }

  const downloadResults = () => {
    const replacer = (key, value) => (value === null ? '' : value) // specify how you want to handle null values here
    const header = Object.keys(resultData[0])

    let csv = resultData.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    )
    csv.unshift(header.join(','))
    csv = csv.join('\r\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const data = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = data
    link.download = 'results.csv'
    console.log('data', data)
    link.click()
  }

  return (
    <React.Fragment>
      <NavBar />
      <Alert />
      <Container sx={{ mt: 15, mb: 10 }} maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item lg={4} md={4} xs={12} sm={5}>
            <Card
              variant="elevation"
              sx={{ paddingX: 3, paddingBottom: 3, boxShadow: 5 }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
                sx={{ paddingY: 3 }}
              >
                <Typography variant="h5">Inputs</Typography>
                <Button
                  variant="contained"
                  color="info"
                  disabled={
                    algotype === '' &&
                    radius === '' &&
                    !driverData &&
                    !orderData
                  }
                  onClick={() => {
                    setAlgotype('')
                    setRadius('')
                    setResultData(null)
                    setResultLoaded(false)
                    setDriverData(null)
                    setOrderData(null)
                  }}
                >
                  Clear
                </Button>
              </Stack>
              <Divider variant="fullWidth" />
              <PopoverIconTitle
                title="Algorithm Type"
                popoverContent={
                  <Box>
                    <Typography variant="subtitle1">Broadcast mode:</Typography>
                    <Typography variant="body2">
                      The e-hailing firm broadcasts the requests received from
                      passengers to taxi drivers, who have freedom to select an
                      order.
                    </Typography>
                    <Divider sx={{ marginY: 1 }} />
                    <Typography variant="subtitle1">Dispatch mode:</Typography>
                    <Typography variant="body2">
                      The platform assigns the orders requested by passengers to
                      specific drivers, who are normally not allowed to reject
                      the assignment.
                    </Typography>
                  </Box>
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
                  <MenuItem value={'broadcasting'}>
                    <Typography variant="body1">Broadcast</Typography>
                  </MenuItem>
                </Select>
              </FormControl>

              <Divider variant="fullWidth" />

              <PopoverIconTitle
                title="Radius"
                popoverContent={
                  <Typography sx={{ p: 1 }} variant="body2">
                    {`Radius refers to the distance within which a passenger can
                    hire a driver. This distance should be between ${appConfigs.rangeMIN} to ${appConfigs.rangeMAX} 
                    meters.`}
                  </Typography>
                }
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label={`Number of range ${appConfigs.rangeMIN} - ${appConfigs.rangeMAX} | Unit: meter`}
                variant="outlined"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
              />

              <PopoverIconTitle
                title="Driver Data Table"
                popoverContent={
                  <Typography sx={{ p: 1 }} variant="body2">
                    Driver Data Table should be named as driver_info.csv and
                    containing the following columns:
                    <br />
                    driver_id,longitude, latitude, region
                  </Typography>
                }
              />

              <CSVUploader
                setterFuc={setDriverData}
                currentData={driverData}
                sampleFilePath={fileNames.driverInputSample}
              />

              <PopoverIconTitle
                title="Order Data Table"
                popoverContent={
                  <Typography sx={{ p: 1 }} variant="body2">
                    Order Data Table should be named as order_info.csv and
                    containing the following columns:
                    <br /> order_id, origin_lng, origin_lat,reward_units,
                    order_region
                  </Typography>
                }
              />
              <CSVUploader
                setterFuc={setOrderData}
                currentData={orderData}
                sampleFilePath={fileNames.orderInputSample}
              />

              <Divider variant="fullWidth" sx={{ mt: 3, marginBottom: 3 }} />
              <Stack justifyContent="flex-end" direction="row">
                <Button
                  variant="contained"
                  color="info"
                  disabled={!algotype || !radius || !driverData || !orderData}
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
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={'100%'}
                sx={{ paddingY: 3 }}
              >
                <Typography variant="h5">Results</Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="info"
                    disabled={!resultLoaded}
                    onClick={downloadResults}
                  >
                    Download as CSV
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    disabled={!resultLoaded}
                  >
                    Show on Map
                  </Button>
                </Stack>
              </Stack>
              <Divider variant="fullWidth" />
              <Container sx={{ paddingY: 3 }}>
                {resultLoaded ? (
                  <MatchResult rows={resultData} />
                ) : (
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
                )}
              </Container>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
