import arrowImage from '../../../images/arrow.png'

export const getMarker = () => {
  const el = document.createElement('div')
  el.className = 'marker'
  el.style.backgroundImage = `url(${arrowImage})`
  el.style.width = '30px'
  el.style.height = '30px'
  el.style.backgroundSize = 'contain'
  el.style.backgroundRepeat = 'no-repeat'
  el.style.zIndex = '1000'
  return el
}
