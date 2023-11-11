import React from 'react'
import { Box, Tab, Typography } from '@mui/material'
import { DemoContainer } from '../../../containers/DemoContainer'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import LocationSearch from './components/LocationSerach'

const title = `Visualization of Urban Road Traffic Flow in Hong Kong`
const about = () => {
  return (
    <Typography variant="subtitle1" align="left" gutterBottom>
      This demo showcases an interactive map interface for real-time traffic
      flow visualization in Hong Kong. Utilizing advanced geospatial
      technologies and sensor data, it provides detailed insights into city-wide
      traffic patterns. Users can view the overall traffic scenario or access
      granular data for specific roads, including real-time vehicle counts. This
      tool is valuable for urban planning, traffic management, and
      policy-making, aiding in data-driven decisions for sustainable city
      development. It serves city planners, traffic engineers, and the public
      with its accessible design and real-time data.
    </Typography>
  )
}

export const NavigationRideHailingPage = () => {
  const [value, setValue] = React.useState('0')
  const [coordinates, setCoordinates] = React.useState([])
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <DemoContainer title={title} about={about()}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
            Choose Your Current Location
          </Typography>
          <Typography>{`${coordinates[0]}, ${coordinates[1]}`}</Typography>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab label="By Input Coordinates" value="0" />
                <Tab label="By Searching a location" value="1" />
              </TabList>
            </Box>
            <TabPanel value="0">By Input Coordinates</TabPanel>
            <TabPanel value="1">
              <LocationSearch setCorrdinates={setCoordinates} />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </DemoContainer>
  )
}
