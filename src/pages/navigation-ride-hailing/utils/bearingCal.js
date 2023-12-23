export function calculateBearing(startLat, startLng, destLat, destLng) {
  var startLatRad = degreesToRadians(startLat)
  var startLngRad = degreesToRadians(startLng)
  var destLatRad = degreesToRadians(destLat)
  var destLngRad = degreesToRadians(destLng)

  var y = Math.sin(destLngRad - startLngRad) * Math.cos(destLatRad)
  var x =
    Math.cos(startLatRad) * Math.sin(destLatRad) -
    Math.sin(startLatRad) *
      Math.cos(destLatRad) *
      Math.cos(destLngRad - startLngRad)
  var bearing = Math.atan2(y, x)
  return radiansToDegrees(bearing)
}

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180
}

function radiansToDegrees(radians) {
  return (radians * 180) / Math.PI
}
