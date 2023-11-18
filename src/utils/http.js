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

export function trafficFlowPost(coordinates) {
  const url = `http://47.243.58.57:3000/get_trafficflow`
  const body = {
    coord_list: coordinates,
  }
  console.log(body)
  return new Promise((resolve, reject) => {
    axios
      .post(url, body)
      .then((res) => {
        console.log(res)
        if (!res?.data[0]) reject('No data')
        resolve(getCountsArray(res?.data[0] || []))
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function getCountsArray(data) {
  const rows = 3
  const cols = 24
  const result = new Array(rows).fill().map(() => new Array(cols).fill(0))
  if (!data) return result

  // Loop through hours
  for (let i = 1; i <= cols; i++) {
    const hour = data[i]
    if (hour) {
      // Add counts to result
      result[0][i - 1] = hour.status_count.cruising || 0
      result[1][i - 1] = hour.status_count.delivering || 0
      result[2][i - 1] = hour.status_count['picking up'] || 0
    }
  }

  return result
}
