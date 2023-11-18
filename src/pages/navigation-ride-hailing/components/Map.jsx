import { Box, Container } from '@mui/material'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from 'react'
import { appConfigs } from '../../../appConfigs'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = appConfigs.mapboxAccessToken

export const MapContainer = (props) => {
  const { lng_init, lat_init } = props
  const mapContainer = useRef(null)
  const map = useRef(null)
  const marker = useRef(null)
  const [lng, setLng] = useState(lng_init)
  const [lat, setLat] = useState(lat_init)
  const [zoom, setZoom] = useState(15)

  useEffect(() => {
    if (!map.current) {
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
        if (marker.current) marker.current.setLngLat([lng_init, lat_init])
        else {
          marker.current = new mapboxgl.Marker()
            .setLngLat([lng_init, lat_init])
            .addTo(map.current)
        }
      })
    } else {
      map.current.setCenter([lng_init, lat_init])
      if (marker.current) marker.current.setLngLat([lng_init, lat_init])
    }
  }, [lng_init, lat_init])

  return (
    <Container style={{ width: '100%', height: '100%' }}>
      <Box style={{ width: '100%', height: 600 }} ref={mapContainer} />
    </Container>
  )
}