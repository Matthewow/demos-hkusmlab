import React from 'react'
import { DemoContainer } from '../containers/DemoContainer'
import { Typography } from '@mui/material'

const title = `A Large-scale simulation platform for ride-hailing services in Manhattan, NYC`
const about = () => {
  return (
    <Typography variant="subtitle1" align="left" gutterBottom>
      This is a large-scale simulation platform for managing and controlling
      ride-hailing vehicles. The simulator platform can be used to simulate the
      movements and trajectories of ride-hailing vehicles for idle cruising,
      picking up passengers, and delivering passengers on a large-scale
      transportation network. The simulation platform is calibrated by a real
      dataset in Manhattan NYC to ensure that the simulation well approximates
      the reality. This simulator is jointly developed by the teams of Dr.
      Jintao Ke at HKU and Prof. Hai Yang at HKUST. The simulation platform will
      be open for public use in the near future.
    </Typography>
  )
}

export const SimulatorPlatform = () => {
  return <DemoContainer title={title} about={about()}></DemoContainer>
}
