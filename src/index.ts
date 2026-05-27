import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import contactRouter from './routes/contact'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/contact', contactRouter)

app.listen(PORT, () => {
  console.log(`Portfolio backend running on http://localhost:${PORT}`)
})