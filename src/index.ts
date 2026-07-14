import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import contactRouter from './routes/contact'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://fullstack-portfolio-nu-bay.vercel.app',
    'https://fullstack-portfolio-penny-and-wish.vercel.app',
    'https://fullstack-portfolio-git-main-penny-and-wish.vercel.app',
    'https://joeymaes.dev',
    'https://www.joeymaes.dev',
  ],
  credentials: true,
}))
app.use(express.json())

app.get('/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/contact', contactRouter)

app.listen(PORT, () => {
  console.log(`Portfolio backend running on http://localhost:${PORT}`)
})