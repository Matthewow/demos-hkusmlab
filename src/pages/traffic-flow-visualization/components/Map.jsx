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
          id: 'France',
          label: 'French GDP per capita',
          data: data[0],
          stack: 'total',
          area: true,
          showMark: false,
        },
        {
          id: 'Germany',
          label: 'German GDP per capita',
          data: data[1],
          stack: 'total',
          area: true,
          showMark: false,
        },
        {
          id: 'United Kingdom',
          label: 'UK GDP per capita',
          data: data[2],
          stack: 'total',
          area: true,
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
  const [lng, setLng] = useState(appConfigs.hongkongCenter.lat)
  const [lat, setLat] = useState(appConfigs.hongkongCenter.lng)
  const [zoom, setZoom] = useState(15)
  const [selectedRoadData, setSelectedRoadData] = useState(
    Array.from({ length: 3 }, () =>
      Array.from({ length: 24 }, () => Math.floor(Math.random() * 100 + 1))
    )
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
        console.log(res)
      })
      var radius = 5 // radius in meters

      fetch(
        `https://overpass-api.de/api/interpreter?data=[out:json];way(around:${radius},${e.lngLat.lat},${e.lngLat.lng})[highway];out geom;`
      )
        .then((response) => response.json())
        .then((data) => {
          var ways = data.elements.filter((el) => el.type === 'way')
          // console.log(ways) // Array of OSM ways
          console.log(data)
        })

      // let query = `
      //   [out:json];
      //   way(around:1000,${e.lngLat.lat},${e.lngLat.lng})["highway"];
      //   (._;>;);
      //   out;
      // `
      // const overpassUrl = 'https://overpass-api.de/api/interpreter'
      // Fetch data from Overpass API
      // fetch(`${overpassUrl}?data=${encodeURIComponent(query)}`)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     // Check if there are elements in the response
      //     if (data.elements.length > 0) {
      //       // Find the first way element (which represents a road)
      //       const road = data.elements.find((element) => element.type === 'way')
      //       console.log(`OSM API:`, road)
      //       if (road) {
      //         trafficFlowPost(road.id).then((res) => {
      //           console.log(feature.properties)
      //           console.log(res)
      //         })
      //       } else {
      //         console.log(
      //           '1No road found within 1000 meters of the specified location.'
      //         )
      //       }
      //     } else {
      //       console.log(
      //         '2No features found within 1000 meters of the specified location.'
      //       )
      //     }
      //   })
      //   .catch((error) => console.error('Error:', error))

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

  // console.log(selectedRoadData)
  return (
    <Container style={{ width: '100%', height: '100%' }}>
      {selectedRoadData ? <StackedLineChart data={selectedRoadData} /> : null}

      <Box style={{ width: '100%', height: 600 }} ref={mapContainer} />
    </Container>
  )
}
