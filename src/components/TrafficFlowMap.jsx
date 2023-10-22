import { Box, Container, Typography } from '@mui/material'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from 'react'
import { appConfigs } from '../appConfigs'
import 'mapbox-gl/dist/mapbox-gl.css'
import { LineChart } from '@mui/x-charts/LineChart'

mapboxgl.accessToken = appConfigs.mapboxAccessToken

function BasicLineChart({ data }) {
  return (
    <LineChart
      xAxis={[
        {
          data: Array.from({ length: 24 }, (v, k) => k),
          valueFormatter: (v) => `${v}:00-${v + 1}:00`,
        },
      ]}
      colors={['#1976d2']}
      series={[
        {
          data: data,
          area: true,
          label: 'Hourly Traffic Flow',
        },
      ]}
      height={300}
    />
  )
}

export const MapContainer = (props) => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(114.1694)
  const [lat, setLat] = useState(22.3193)
  const [zoom, setZoom] = useState(14)
  const [mockData, setMockData] = useState(
    Array.from({ length: 24 }, () => Math.floor(Math.random() * 31))
  )

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

    map.current.on('click', 'road-layer', function (e) {
      var features = map.current.queryRenderedFeatures(e.point)
      var osmId = features[0].properties.osm_id
      console.log('osm', osmId)
    })

    map.current.on('click', function (e) {
      var features = map.current.queryRenderedFeatures(e.point)
      if (!features.length) {
        return
      }
      console.log(features)
      if (typeof map.current.getLayer('selectedRoad') !== 'undefined') {
        map.current.removeLayer('selectedRoad')
        map.current.removeSource('selectedRoad')
      }
      var feature = features[0]
      map.current.addSource('selectedRoad', {
        type: 'geojson',
        data: feature.toJSON(),
      })
      map.current.addLayer({
        id: 'selectedRoad',
        type: 'line',
        source: 'selectedRoad',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': 'yellow',
          'line-width': 8,
        },
      })
    })
  }, [])

  return (
    <Container style={{ width: '100%', height: '100%' }}>
      <BasicLineChart data={mockData} />
      <Box style={{ width: '100%', height: 600 }} ref={mapContainer} />
    </Container>
  )
}
