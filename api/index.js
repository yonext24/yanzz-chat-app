const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const AuthRoutes = require('./routes/auth_routes')
const MessageRoutes = require('./routes/message_routes')
const cookieParser = require('cookie-parser')

const app = express()
require('dotenv').config()

// middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' ? 'fill' : 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

app.use(cookieParser())
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'fill' : 'http://localhost:3000'
}))
app.use(express.json())

app.use('/api', AuthRoutes)
app.use('/api', MessageRoutes)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO)
    console.log('connected to mongodb')
  } catch(err) {
    throw err
  }
}
mongoose.connection.on('disconnected', () => {
  console.log('mongodb disconnected')
})
mongoose.connection.on('connected', () => {
  console.log('mongodb connected')
})

const PORT = process.env.PORT || 8800
const server = app.listen(PORT, () => {
  connection()
  console.log('Server listening on port: ', PORT)
})