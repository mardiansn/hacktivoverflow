if(process.env.NODE_ENV === 'development') require('dotenv').config()

const express = require('express')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const uri = process.env.MONGO_URI
// const uri = process.env.MONGO_URI_TEMP
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

// DB 
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('connected to mongo database'))
  .catch((err) => console.log('failed to connect to database\n', JSON.stringify(err, null, 2)))

const app = express()

//  MIDDLEWARES
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)

app.use(errorHandler)

app.listen(port, () => console.log('running on port ', port))
