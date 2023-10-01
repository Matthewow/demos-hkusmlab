import { Divider, Grid, Slider, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { marketReactionPost } from '../utils/http'
import Surface3D from '../components/Surface3D'
import { DemoContainer } from '../containers/DemoContainer'

const title = `Market's Reaction w.r.t Price Fluctuation and Fleet Size`

const about = () => {
  return (
    <Typography
      variant="subtitle1"
      align="left"
      gutterBottom
      // sx={{ maxWidth: 800 }}
    >
      In this section, we perform a sensitivity analysis of how taxi market
      statistics are influenced by fluctuations in taxi driver{' '}
      <strong style={{ color: '#9c27b0' }}>fleet size</strong> and{' '}
      <strong style={{ color: '#9c27b0' }}>pricing</strong>. The fleet size and
      pricing mechanism are critical factors influencing the taxi market. This
      web app can demonstrate the varying outcomes on platform revenues,
      driver's monthly income, order matching rate, and driver utilization rate
      following alterations in fleet size and pricing. Consequently, this aids
      the government or operators in managing fleet control and adjusting
      pricing strategies.
      <br />
      <br />
      <strong>Four investigated benchmarks:</strong>
      <br />
      <strong style={{ color: '#9c27b0' }}>Total Market Revenue: </strong>
      summation of all completed orders’ revenue of all drivers
      <br />
      <strong style={{ color: '#9c27b0' }}>Monthly Driver Rewards: </strong>
      calculated driver monthly reward (assuming each taxi is operated by two
      drivers in two shifts)
      <br />
      <strong style={{ color: '#9c27b0' }}>
        Passenger Order Matching Ratio:{' '}
      </strong>
      the percentage of served passengers in all ride requests
      <br />
      <strong style={{ color: '#9c27b0' }}>Driver Occupancy Rate:</strong> the
      percentage of drivers’ occupied time periods (picking up or delivering
      passengers)
    </Typography>
  )
}

export const MarketReactionPage = () => {
  const [inputValues, setInputValues] = React.useState({
    priceFluctuation: 1,
    fleetSize: 18000,
  })

  const handleSliderChange = (prop) => (event, newValue) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [prop]: newValue,
    }))
  }

  const baseValues = {
    matching_ratio: 0.5229,
    monthly_reward: 31945,
    occupancy_ratio: 0.4297,
    total_reward: 38333647,
  }

  const outputSliderConfigs = [
    {
      key: 'total_reward',
      title: 'Total Market Revenue',
      minValue: 20000000,
      maxValue: 45000000,
      zAxisMin: 15000000,
      zAxisMax: 42000000,
      currentValue: 38333647,
      step: 1,
      index: 2,
    },
    {
      key: 'monthly_reward',
      title: 'Monthly Driver Rewards',
      minValue: 20000,
      maxValue: 40000,
      zAxisMin: 15000,
      zAxisMax: 35000,
      currentValue: 31945,
      step: 1,
      index: 3,
    },
    {
      key: 'matching_ratio',
      title: 'Passenger Order Matching Ratio',
      minValue: 0,
      maxValue: 1,
      zAxisMin: 0.2,
      zAxisMax: 0.7,
      currentValue: 0.5229,
      step: 0.0001,
      index: 4,
    },
    {
      key: 'occupancy_ratio',
      title: 'Driver Occupancy Rate',
      minValue: 0,
      maxValue: 1,
      zAxisMin: 0.2,
      zAxisMax: 0.5,
      currentValue: 0.4297,
      step: 0.0001,
      index: 5,
    },
  ]

  const [outputValues, setOutputValues] = React.useState(baseValues)

  function formatResponse(res) {
    return {
      matching_ratio: parseFloat(res.matching_ratio.toFixed(4)),
      occupancy_ratio: parseFloat(res.occupancy_ratio.toFixed(4)),
      monthly_reward: Math.round(res.monthly_reward),
      total_reward: Math.round(res.total_reward),
    }
  }

  useEffect(() => {
    marketReactionPost(
      inputValues.priceFluctuation,
      inputValues.fleetSize
    ).then((res) => {
      console.log(res)
      setOutputValues(formatResponse(res))
    })
  }, [inputValues])

  const OutputSlider = ({
    title,
    minValue,
    maxValue,
    baseValue,
    currentValue,
    step,
  }) => {
    const changingRetio = ((currentValue - baseValue) / baseValue) * 100
    return (
      <>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            color={changingRetio < 0 ? 'error' : 'green'}
          >
            {changingRetio !== 0 && changingRetio > 0
              ? `+${changingRetio.toFixed(2)}%`
              : `${changingRetio.toFixed(2)}%`}
          </Typography>
        </Stack>
        <Slider
          defaultValue={currentValue}
          min={minValue}
          max={maxValue}
          disabled={true}
          valueLabelDisplay="on"
          marks={[
            { value: minValue, label: `${minValue}` },
            { value: baseValue, label: `Base Value: ${baseValue}` },
            { value: maxValue, label: `${maxValue}` },
          ]}
          step={step}
        />
      </>
    )
  }

  return (
    <DemoContainer title={title} about={about()}>
      <Grid container>
        <Grid item xs>
          <Stack sx={{ marginX: 5 }} spacing={5}>
            <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
              Price Fluctuation
            </Typography>
            <Slider
              aria-label="Custom marks"
              defaultValue={1}
              min={0.7}
              max={1.3}
              // track={false}
              onChangeCommitted={handleSliderChange('priceFluctuation')}
              valueLabelDisplay="on"
              color="secondary"
              marks={[
                { value: 0.7, label: '0.7' },
                { value: 1, label: 'Base Value: 1' },
                { value: 1.3, label: '1.3' },
              ]}
              step={0.001}
            />
            <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
              Fleet Size (# of Drivers)
            </Typography>
            <Slider
              aria-label="Custom marks"
              defaultValue={18000}
              min={15600}
              max={20400}
              // track={false}
              onChangeCommitted={handleSliderChange('fleetSize')}
              valueLabelDisplay="on"
              color="secondary"
              marks={[
                { value: 15600, label: '15600' },
                { value: 18000, label: 'Base Value: 18000' },
                { value: 20400, label: '20400' },
              ]}
              step={1}
            />
          </Stack>
        </Grid>
        <Divider orientation="vertical" flexItem></Divider>
        <Grid item xs>
          <Stack sx={{ marginX: 5 }} spacing={5}>
            {outputSliderConfigs.map((config) => (
              <OutputSlider
                key={config.key}
                title={config.title}
                minValue={config.minValue}
                maxValue={config.maxValue}
                baseValue={config.currentValue}
                currentValue={outputValues[config.key]}
                step={config.step}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>

      <Divider sx={{ mt: 10 }}></Divider>

      <Typography variant="h4" sx={{ mt: 5, fontWeight: 500 }}>
        3D Plot
      </Typography>
      <Grid container>
        <Grid item xs>
          <Stack sx={{ marginX: 5, marginTop: 5 }} spacing={10}>
            <Typography variant="h6" gutterBottom>
              {outputSliderConfigs[0].title}
            </Typography>
            <Surface3D props={outputSliderConfigs[0]} />
            <Typography variant="h6" gutterBottom>
              {outputSliderConfigs[2].title}
            </Typography>
            <Surface3D props={outputSliderConfigs[2]} />
          </Stack>
        </Grid>
        <Divider orientation="vertical" flexItem></Divider>
        <Grid item xs>
          <Stack sx={{ marginX: 5, marginTop: 5 }} spacing={10}>
            <Typography variant="h6" gutterBottom>
              {outputSliderConfigs[1].title}
            </Typography>
            <Surface3D props={outputSliderConfigs[1]} />
            <Typography variant="h6" gutterBottom>
              {outputSliderConfigs[3].title}
            </Typography>
            <Surface3D props={outputSliderConfigs[3]} />
          </Stack>
        </Grid>
      </Grid>
    </DemoContainer>
  )
}
