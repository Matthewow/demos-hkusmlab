import axios from 'axios'

export function post(data) {
  const url = 'http://47.243.58.57/process_data'
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
