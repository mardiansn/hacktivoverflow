import axios from 'axios'

//  DEV
// const server = 'http://localhost:3000'

//  PROD
const server = 'http://api.teje.mardii.site'

const instance = axios.create({
  baseURL: server
})

export default instance
