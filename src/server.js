import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import contactRoutes from './routes/contact.js'

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json({ limit: '20kb' }))

app.get('/api/health', (_req, res) => res.json({
  status: 'ok',
  database: mongoose.connection.readyState === 1 ? 'connected' : 'not connected'
}))
app.use('/api/contact', contactRoutes)
app.use((req, res) => res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` }))
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ message: 'Something went wrong on the server.' })
})

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log('Connected to MongoDB')
    } catch (error) {
      console.error('MongoDB connection failed:', error.message)
      console.warn('Server will run, but contact messages cannot be saved until MongoDB connects.')
    }
  } else {
    console.warn('MONGODB_URI is not set. Contact submissions cannot be saved.')
  }
  app.listen(PORT, () => console.log(`Portfolio API running at http://localhost:${PORT}`))
}
start()
