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

  useEffect(() => {
    marketReactionPost(inputValues.priceFluctuation, inputValues.fleetSize)
  }, [inputValues])

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
              track={false}
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
              track={false}
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
            <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
              Total Reward
            </Typography>
            <Slider
              defaultValue={38333647}
              min={20000000}
              max={50000000}
              track={false}
              valueLabelDisplay="on"
              marks={[
                { value: 20000000, label: '20m' },
                { value: 38333647, label: 'Base Value: 38333647' },
                { value: 50000000, label: '50m' },
              ]}
              step={1}
            />
            <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
              Monthly Reward per Driver
            </Typography>
            <Slider
              aria-label="Custom marks"
              defaultValue={31944}
              min={10000}
              max={50000}
              track={false}
              valueLabelDisplay="on"
              marks={[
                { value: 10000, label: '10k' },
                { value: 31944, label: 'Base Value: 31944' },
                { value: 50000, label: '50k' },
              ]}
              step={1}
            />
            <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
              Matching Rate
            </Typography>
            <Slider
              aria-label="Custom marks"
              defaultValue={0.5229}
              min={0}
              max={1}
              track={false}
              valueLabelDisplay="on"
              marks={[
                { value: 0, label: '0' },
                { value: 0.5229, label: 'Base Value: 0.5229' },
                { value: 1, label: '1' },
              ]}
              step={0.0001}
            />
            <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
              Occupancy Rate
            </Typography>
            <Slider
              aria-label="Custom marks"
              defaultValue={0.4297}
              min={0}
              max={1}
              track={false}
              valueLabelDisplay="on"
              marks={[
                { value: 0, label: '0' },
                { value: 0.4297, label: 'Base Value: 0.4297' },
                { value: 1, label: '1' },
              ]}
              step={1}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}
