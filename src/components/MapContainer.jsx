import { Box, Container, Stack, Typography, styled } from '@mui/material'
import mapboxgl from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'
import { appConfigs } from '../appConfigs'
import 'mapbox-gl/dist/mapbox-gl.css'
import { importImage, passengerDriverNaming } from '../utils/mapServices'

mapboxgl.accessToken = appConfigs.mapboxAccessToken
const carImg = importImage('car')
const passengerImg = importImage('man')

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

const drawPairs = (map, data) => {
  const {
    driverSourceName,
    driverLayerName,
    orderSourceName,
    orderLayerName,
    connectionLayerName,
    connectionSourceName,
  } = passengerDriverNaming(data)
  //passenger
  map.addSource(orderSourceName, {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [data.order_lng, data.order_lat],
          },
        },
      ],
    },
  })

  map.addLayer({
    id: orderLayerName,
    type: 'symbol',
    source: orderSourceName,
    layout: {
      'icon-image': 'passengerIcon',
    },
  })

  //driver
  map.addSource(driverSourceName, {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [data.driver_lng, data.driver_lat],
          },
        },
      ],
    },
  })

  map.addLayer({
    id: driverLayerName,
    type: 'symbol',
    source: driverSourceName,
    layout: {
      'icon-image': 'carIcon',
    },
  })

  //connection
  const connectionLine = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [data.driver_lng, data.driver_lat],
            [data.order_lng, data.order_lat],
          ],
        },
      },
    ],
  }

  map.addSource(connectionSourceName, {
    type: 'geojson',
    data: connectionLine,
  })
  map.addLayer({
    id: connectionLayerName,
    source: connectionSourceName,
    type: 'line',
    paint: {
      'line-width': 2,
      'line-color': '#007cbf',
    },
  })
}

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
