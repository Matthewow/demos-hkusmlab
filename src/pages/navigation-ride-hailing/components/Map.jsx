import { Box, Container } from '@mui/material'
import mapboxgl from 'mapbox-gl'
import { useEffect, useRef, useState } from 'react'
import { appConfigs } from '../../../appConfigs'
import 'mapbox-gl/dist/mapbox-gl.css'
import { navigationPost } from '../../../utils/http'

mapboxgl.accessToken = appConfigs.mapboxAccessToken

const MAP_STYLE = 'mapbox://styles/mapbox/dark-v11'
const ZOOM_LEVEL = 15

export const MapContainer = ({ lng_init, lat_init }) => {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const markerRef = useRef(null)

  const [coords, setCoords] = useState({
    lng: lng_init,
    lat: lat_init,
    zoom: ZOOM_LEVEL,
  })

  useEffect(() => {
    const initializeMap = ({ lng, lat, zoom }) => {
      if (mapRef.current) return // Do not initialize the map if it already exists

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: MAP_STYLE,
        center: [lng, lat],
        zoom: zoom,
        attributionControl: false,
        logoPosition: 'top-left',
      })

      mapRef.current.on('move', () => {
        const { lng, lat } = mapRef.current.getCenter()
        const zoom = mapRef.current.getZoom()
        setCoords({
          lng: parseFloat(lng.toFixed(4)),
          lat: parseFloat(lat.toFixed(4)),
          zoom: parseFloat(zoom.toFixed(2)),
        })
      })

      markerRef.current = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(mapRef.current)
    }

    initializeMap(coords)

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])
  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      // Update map center and marker position
      mapRef.current.setCenter([lng_init, lat_init])
      markerRef.current.setLngLat([lng_init, lat_init])

      // Get the new route and draw it
      navigationPost(`${lat_init}_${lng_init}`).then((newRoute) => {
        // First, check if there's already a source for the route
        if (mapRef.current.getSource('route')) {
          // Update the route data
          mapRef.current.getSource('route').setData({
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: newRoute,
            },
          })
        } else {
          // Add a new source and layer for the route
          mapRef.current.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: newRoute,
              },
            },
          })

          mapRef.current.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#fcba03', // Choose a color for the route line
              'line-width': 6,
            },
          })
        }
      })
    }
  }, [lng_init, lat_init])

  return (
    <Container sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ width: '100%', height: 600 }} ref={mapContainerRef} />
    </Container>
  )
}
