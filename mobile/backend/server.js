import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const port = process.env.PORT

connectDB(process.env.DATABASE_URL)

app.get('/', (req, res) => {
    res.send('Server connected!')
})

console.log('Port:', port)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

