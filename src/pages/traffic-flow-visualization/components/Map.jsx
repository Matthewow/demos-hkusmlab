import { Box, Container, Typography } from '@mui/material'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from 'react'
import { appConfigs } from '../../../appConfigs'
import 'mapbox-gl/dist/mapbox-gl.css'
import { LineChart } from '@mui/x-charts/LineChart'
// import { trafficFlowPost } from '../../../utils/http'
// import { trafficData } from '../data/districtDataMocked'
import { boundaryData } from '../data/hkBoundaryData'
import * as turf from '@turf/turf'
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
          valueFormatter: (v) => `${v}:00`,
        },
      ]}
      series={[
        {
          id: 'Cruising',
          label: 'Cruising',
          data: data[0],
          showMark: true,
        },
        {
          id: 'Delivering',
          label: 'Delivering',
          data: data[1],
          showMark: true,
        },
        {
          id: 'Picking_Up',
          label: 'Picking up',
          data: data[2],
          showMark: true,
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
  const [zoom, setZoom] = useState(10)
  const [selectedRoadName, setSelectedRoadName] = useState(
    'Click a road on the map to see its traffic flow'
  )
  const [selectedRoadData, setSelectedRoadData] = useState(null)

  const loadDistrictBoundary = () => {
    map.current.addSource('hong-kong-districts', {
      type: 'geojson',
      // Use a URL or a local path to your GeoJSON file
      data: boundaryData,
    })
    // Add a new layer to visualize the districts
    map.current.addLayer({
      id: 'hong-kong-districts-fill',
      type: 'fill',
      source: 'hong-kong-districts', // References the data source
      layout: {},
      paint: {
        'fill-color': '#0000ee', // Fill color
        'fill-opacity': 0.1, // Fill opacity
      },
    })

    // Add a new layer to add outlines to the districts
    map.current.addLayer({
      id: 'hong-kong-districts-outline',
      type: 'line',
      source: 'hong-kong-districts', // References the data source
      layout: {},
      paint: {
        'line-color': '#000000', // Line color
        'line-width': 2, // Line width
      },
    })

    map.current.on('click', 'hong-kong-districts-fill', function (e) {
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ['hong-kong-districts-fill'],
      })

      if (!features.length) {
        return
      }

      const feature = features[0]

      // Calculate the geographic center of the district's polygon
      const center = turf.centerOfMass(feature).geometry.coordinates

      // Reposition the map to the center of the clicked district with a smooth transition
      map.current.flyTo({
        center: center,
        zoom: 12, // Increase current zoom level by 2 for a closer view (adjust as desired)
      })
    })
  }

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

    const total = trafficData.length
    let count = 0

    map.current.on('load', () => {
      loadDistrictBoundary()
      // for (let road of trafficData) {
      //   console.log(`${++count}/${total}`)
      //   map.current.addLayer({
      //     id: road.id,
      //     type: 'line',
      //     source: {
      //       type: 'geojson',
      //       data: {
      //         type: 'Feature',
      //         properties: {},
      //         geometry: {
      //           type: 'LineString',
      //           coordinates: road.geo,
      //         },
      //       },
      //     },
      //     layout: {
      //       'line-join': 'round',
      //       'line-cap': 'round',
      //     },
      //     paint: {
      //       'line-color': '#f5f549',
      //       'line-width': 1,
      //     },
      //   })
      // }
    })

    // map.current.on('click', function (e) {
    //   const features = map.current.queryRenderedFeatures(e.point)
    //   if (!features.length) {
    //     return
    //   }
    //   if (typeof map.current.getLayer('selectedRoad') !== 'undefined') {
    //     map.current.removeLayer('selectedRoad')
    //     map.current.removeSource('selectedRoad')
    //   }
    //   const feature = features[0]
    //   console.log(feature)
    //   setSelectedRoadName(feature?.properties?.name)

    //   const coordinates = flattenArray(feature?.geometry?.coordinates)
    //   trafficFlowPost(coordinates)
    //     .then((res) => {
    //       setSelectedRoadData(res)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       if (err === 'No data') {
    //         setSelectedRoadData(null)
    //         setSelectedRoadName(`No data for ${feature?.properties?.name}`)
    //       }
    //     })

    //   map.current.addSource('selectedRoad', {
    //     type: 'geojson',
    //     data: feature.toJSON(),
    //   })
    //   map.current.addLayer({
    //     id: 'selectedRoad',
    //     type: 'line',
    //     source: 'selectedRoad',
    //     layout: {
    //       'line-join': 'round',
    //       'line-cap': 'round',
    //     },
    //     paint: {
    //       'line-color': '#5b92eb',
    //       'line-width': 8,
    //     },
    //   })
    // })
  }, [lng, lat, zoom])

  // console.log(selectedRoadData)
  return (
    <Container style={{ width: '100%', height: '100%' }}>
      <Box style={{ width: '100%', height: 600 }} ref={mapContainer} />
      <Typography variant="body1" color="secondary" gutterBottom>
        {selectedRoadName}
      </Typography>
      {selectedRoadData ? <StackedLineChart data={selectedRoadData} /> : null}
    </Container>
  )
}
