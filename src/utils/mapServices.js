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
