import { Box, Container } from '@mui/material'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from 'react'
import { appConfigs } from '../../../appConfigs'
import 'mapbox-gl/dist/mapbox-gl.css'
import { LineChart } from '@mui/x-charts/LineChart'
import { trafficFlowPost } from '../../../utils/http'

mapboxgl.accessToken = appConfigs.mapboxAccessToken

function flattenArray(arr) {
  if (!Array.isArray(arr)) {
    return []
  }
  if (!Array.isArray(arr[0])) {
    return []
  }
  if (arr[0].length !== 2 || Array.isArray(arr[0][0])) {
    return arr.flat(1)
  }
  return arr
}

function StackedLineChart({ data }) {
  return (
    <LineChart
      xAxis={[
        {
          id: 'Time',
          data: Array.from({ length: 24 }, (_, k) => k),
          valueFormatter: (v) => `${v}:00-${v + 1}:00`,
        },
      ]}
      series={[
        {
          id: 'Cruising',
          label: 'Cruising',
          data: data[0],
          showMark: false,
        },
        {
          id: 'Delivering',
          label: 'Delivering',
          data: data[1],
          showMark: false,
        },
        {
          id: 'Picking_Up',
          label: 'Picking up',
          data: data[2],
          showMark: false,
        },
      ]}
      height={400}
    />
  )
}

export const MapContainer = (props) => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(appConfigs.hongkongCenter.lng)
  const [lat, setLat] = useState(appConfigs.hongkongCenter.lat)
  const [zoom, setZoom] = useState(15)
  const [selectedRoadData, setSelectedRoadData] = useState(
    Array(3)
      .fill()
      .map(() => new Array(24).fill(0))
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

    map.current.on('click', function (e) {
      const features = map.current.queryRenderedFeatures(e.point)
      if (!features.length) {
        return
      }
      if (typeof map.current.getLayer('selectedRoad') !== 'undefined') {
        map.current.removeLayer('selectedRoad')
        map.current.removeSource('selectedRoad')
      }
      const feature = features[0]
      const osmID = feature.id
      if (osmID === undefined) return

      const coordinates = flattenArray(feature?.geometry?.coordinates)
      trafficFlowPost(coordinates).then((res) => {
        console.log('--->', res)
        setSelectedRoadData(res)
      })

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
  }, [lng, lat, zoom])

  // console.log(selectedRoadData)
  return (
    <Container style={{ width: '100%', height: '100%' }}>
      {selectedRoadData ? <StackedLineChart data={selectedRoadData} /> : null}

      <Box style={{ width: '100%', height: 600 }} ref={mapContainer} />
    </Container>
  )
}
