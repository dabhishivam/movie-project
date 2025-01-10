const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000

app.use('/profile', express.static('upload'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const movieRouter = require('./movieRouter/movierouter')
mongoose.connect("mongodb+srv://dabhishivam2006:dabhishivam@crud.kqdwh.mongodb.net/movie")
    .then(() => {
        console.log("db connected 👍")
    })
    .catch((error) => {
        console.log(error)
    })
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api/movie', movieRouter)
app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`))