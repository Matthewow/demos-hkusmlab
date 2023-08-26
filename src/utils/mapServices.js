export function importImage(name) {
  let img = new Image()
  img.src = `/static/${name}.png`
  return img
}

export function passengerDriverNaming(data) {
  const driverSourceName = `${data.driver_id}_DRIVER_SOURCE`
  const driverLayerName = `${data.driver_id}_DRIVER_LAYER`
  const orderSourceName = `${data.order_id}_ORDER_SOURCE`
  const orderLayerName = `${data.order_id}_ORDER_LAYER`
  const connectionSourceName = `${data.order_id}_CONNECTION_SOURCE`
  const connectionLayerName = `${data.order_id}_CONNECTION_LAYER`
  return {
    driverSourceName,
    driverLayerName,
    orderSourceName,
    orderLayerName,
    connectionSourceName,
    connectionLayerName,
  }
}

export function calculateAverage(data) {
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

export const drawPairs = (map, data) => {
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
