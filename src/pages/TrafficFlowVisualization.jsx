import React from 'react'
import { DemoContainer } from '../containers/DemoContainer'
import { Box, Typography } from '@mui/material'
import { MapContainer } from '../components/TrafficFlowMap'

const title = `Visualization of Urban Road Traffic Flow in Hong Kong`
const about = () => {
  return (
    <Typography variant="subtitle1" align="left" gutterBottom>
      This demo presents a novel approach for visualizing real-time urban road
      traffic flow in Hong Kong. By harnessing the power of advanced geospatial
      technologies and traffic sensor data, we have developed an interactive map
      interface that provides comprehensive insights into the city's dynamic
      traffic patterns. Users can view the overall traffic situation at a glance
      or delve into more granular details by simply clicking on a specific road
      on the interactive map. The clicked road segment reveals current traffic
      flow data, including the number of vehicles traversing that route in
      real-time. This system not only aids in understanding the current state of
      traffic but also provides valuable data for urban planning, traffic
      management, and policy-making. With its user-friendly design and real-time
      data access, this visualization tool serves as a valuable resource for
      city planners, traffic engineers, and the general public alike,
      contributing to more informed decisions and smarter, more sustainable
      urban development.
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
