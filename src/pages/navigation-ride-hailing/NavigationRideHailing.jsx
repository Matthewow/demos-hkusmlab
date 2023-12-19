import React from 'react'
import { Box, Divider, Grid, Tab, Typography } from '@mui/material'
import { DemoContainer } from '../../containers/DemoContainer'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import LocationSearch from './components/LocationSerach'
import CoordinateInput from './components/CoordinateInput'
import { MapContainer } from './components/Map'
import { appConfigs } from '../../appConfigs'

const title = `Urban Navigation for Ride-Hailing Drivers in Hong Kong`
const about = () => {
  return (
    <Typography variant="subtitle1" align="left" gutterBottom>
      Urban Navigation for Ride-Hailing Drivers in Hong Kong" investigates the
      navigation methods employed by taxi and Uber drivers. It explores the
      challenges they face in efficiently picking up passengers and finding
      optimal routes in Hong Kong's dynamic urban landscape. The study examines
      factors such as traffic patterns, road infrastructure, and digital mapping
      applications to enhance understanding and develop strategies for improving
      the navigation experience. The findings aim to benefit both drivers and
      passengers in the ride-hailing industry.
    </Typography>
  )
}

export const NavigationRideHailingPage = () => {
  const [value, setValue] = React.useState('0')
  const [coordinates, setCoordinates] = React.useState([
    appConfigs.hongkongCenter.lng,
    appConfigs.hongkongCenter.lat,
  ])
  const handleChange = (_, newValue) => {
    setValue(newValue)
  }
  return (
    <DemoContainer title={title} about={about()}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="start"
        height={600}
      >
        <Grid container>
          {/* Seletion Part */}
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                height: '100%',
              }}
            >
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Choose Your Current Location
                </Typography>
                <Typography color="secondary" variant="body1" sx={{ mb: 2 }}>
                  Please note that the demo is exclusively available in Hong
                  Kong. Inputted locations outside of Hong Kong will not be
                  accepted.
                </Typography>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                      <Tab label="By Input Coordinates" value="0" />
                      <Tab label="By Searching a location" value="1" />
                    </TabList>
                  </Box>
                  <TabPanel value="0">
                    <CoordinateInput />
                  </TabPanel>
                  <TabPanel value="1">
                    <LocationSearch setCorrdinates={setCoordinates} />
                  </TabPanel>
                </TabContext>
              </Box>
            </Box>
          </Grid>

          {/* Map Part */}
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                height: '100%',
              }}
            >
              <MapContainer
                lng_init={coordinates[0]}
                lat_init={coordinates[1]}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </DemoContainer>
  )
}
