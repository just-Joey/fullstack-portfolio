import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import contactRouter from './routes/contact'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'], credentials: true }))
app.use(express.json())

app.get('/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/contact', contactRouter)

app.listen(PORT, () => {
  console.log(`Portfolio backend running on http://localhost:${PORT}`)
})