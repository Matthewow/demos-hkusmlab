import {
  Box,
  Container,
  Divider,
  Grid,
  Slider,
  Stack,
  Typography,
} from '@mui/material'
import React, { useEffect } from 'react'
import { marketReactionPost } from '../utils/http'

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
    matching_ratio: 0.522933333335,
    monthly_reward: 31944.705999999976,
    occupancy_ratio: 0.429717824074074,
    total_reward: 38333647.199999966,
  }

  const outputSliderConfigs = [
    {
      key: 'total_reward',
      title: 'Total Reward',
      minValue: 20000000,
      maxValue: 45000000,
      currentValue: 38333647,
      step: 1,
    },
    {
      key: 'monthly_reward',
      title: 'Monthly Reward per Driver',
      minValue: 20000,
      maxValue: 40000,
      currentValue: 31945,
      step: 1,
    },
    {
      key: 'matching_ratio',
      title: 'Matching Rate',
      minValue: 0,
      maxValue: 1,
      currentValue: 0.5229,
      step: 0.0001,
    },
    {
      key: 'occupancy_ratio',
      title: 'Occupancy Rate',
      minValue: 0,
      maxValue: 1,
      currentValue: 0.4297,
      step: 0.0001,
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
    return (
      <>
        <Stack direction="row">
          <Typography variant="h6" gutterBottom>
            {title}
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
    <Container sx={{ mt: 15, mb: 10 }} maxWidth="xl">
      <Box sx={{ marginY: 10 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Market's Reaction w.r.t Price Fluctuation and Fleet Size
        </Typography>
      </Box>
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
    </Container>
  )
}
