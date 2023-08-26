import { Box, Container, Typography } from '@mui/material'
import mapboxgl from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'
import { appConfigs } from '../appConfigs'
import 'mapbox-gl/dist/mapbox-gl.css'
import { calculateAverage, drawPairs, importImage } from '../utils/mapServices'

mapboxgl.accessToken = appConfigs.mapboxAccessToken
const carImg = importImage('car')
const passengerImg = importImage('man')

export const MapContainer = (props) => {
  const { data } = props
  const mapContainer = useRef(null)
  const map = useRef(null)
  const { averageLat, averageLng } = calculateAverage(data)
  const [lng, setLng] = useState(averageLng)
  const [lat, setLat] = useState(averageLat)
  const [zoom, setZoom] = useState(17)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false,
      logoPosition: 'top-left',
    })

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })

    map.current.on('load', () => {
      map.current.addImage('carIcon', carImg, {
        pixelRatio: 2,
      })
      map.current.addImage('passengerIcon', passengerImg, {
        pixelRatio: 2,
      })

      console.log('props.data', data)
      data.forEach((element) => {
        drawPairs(map.current, element)
      })
    })
  }, [props.data])

  return (
    <Container style={{ width: '100%', height: '100%' }}>
      <Box>
        <Typography variant="body1">{`lat: ${lat} lng: ${lng}`}</Typography>
      </Box>
      <Box style={{ width: '100%', height: '80%' }} ref={mapContainer} />
    </Container>
  )
}
