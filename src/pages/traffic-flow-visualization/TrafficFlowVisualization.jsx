import React from 'react'
import { DemoContainer } from '../../containers/DemoContainer'
import { Box, Typography } from '@mui/material'
import { MapContainer } from './components/Map'

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

export const TrafficFlowVisualization = () => {
  return (
    <DemoContainer title={title} about={about()}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <MapContainer />
      </Box>
    </DemoContainer>
  )
}
