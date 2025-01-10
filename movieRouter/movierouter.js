const express = require('express')
const app = express()

const upload = require('../middleware/Fileupload')
const movieController = require('../movieController/moviecontroller')
const multipleimage = [
    { name: "thumbnail", maxCount: 1 },
    { name: "movie_image", maxCount: 5 }
]
app.post('/', upload.fields(multipleimage), movieController.store)
app.get('/', movieController.index)
app.delete('/:id', movieController.trash)
app.put('/',upload.fields(multipleimage), movieController.update)
module.exports = app
