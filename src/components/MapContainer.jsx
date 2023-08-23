import { Box, Container, Stack, Typography, styled } from '@mui/material'
import mapboxgl from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'
import { appConfigs } from '../appConfigs'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = appConfigs.mapboxAccessToken

function calculateAverage(data) {
  if (!data || !data.length) return { averageLat: 0, averageLng: 0 }
  const sums = data.reduce(
    (acc, cur) => {
      return {
        latSum: acc.latSum + cur.order_lat,
        lngSum: acc.lngSum + cur.order_lng,
      }
    },
    { latSum: 0, lngSum: 0 }
  )

  return {
    averageLat: sums.latSum / data.length,
    averageLng: sums.lngSum / data.length,
  }
}

export const MapContainer = (props) => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const { averageLat, averageLng } = calculateAverage(props.data)
  const [lng, setLng] = useState(averageLng)
  const [lat, setLat] = useState(averageLat)
  const [zoom, setZoom] = useState(15)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false,
    })

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  }, [])

  const drawPairs = (data) => {}

  return (
    <Container style={{ width: '100%', height: '100%' }}>
      <Box>
        <Typography variant="body1">{`lat: ${lat} lng: ${lng}`}</Typography>
      </Box>
      <Box style={{ width: '100%', height: '80%' }} ref={mapContainer} />
    </Container>
  )
}
