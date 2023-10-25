import axios from 'axios'

export function post(data) {
  const url = 'http://47.243.58.57:3001/process_data'
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function marketReactionPost(price_fluctuation = 1, fleet_size = 18000) {
  const url = `http://47.243.58.57:3000/predict?price_fluctuation=${price_fluctuation}&fleet_size=${fleet_size}`
  return new Promise((resolve, reject) => {
    axios
      .post(url)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function trafficFlowPost(osmId) {
  const url = `http://47.243.58.57:3000/get_trafficflow`
  // const trimedOSMId = osmId.toString().slice(0, -1)

  const data = {
    nodeid: [osmId],
  }
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((res) => {
        resolve(res.data[0])
      })
      .catch((err) => {
        reject(err)
      })
  })
}
