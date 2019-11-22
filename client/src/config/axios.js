import axios from 'axios'

//  DEV
// const server = 'http://172.16.11.178:3000'

//  PROD
const server = 'http://api.teje.mardii.site'

const instance = axios.create({
  baseURL: server
})

export default instance
