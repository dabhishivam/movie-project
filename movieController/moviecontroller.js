const fs = require("fs")
const Movie = require("../movieModel/moviemodel");
const path = require('path')

const store = async (req, res) => {
    // console.log(req.files)
    // console.log(req.body)
    // console.log(req.files.filename)
    var arr = []
    req.files.movie_image.forEach((image) => {
        arr.push(image.filename)
    });
    console.log(arr);

    // console.log(arr)
    var singleimage = ""
    if (req.files.thumbnail !== undefined) {
        singleimage = req.files.thumbnail[0].filename
    }
    console.log(singleimage)
    try {
        const { movie_name, movie_price, movie_description } = req.body
        if (movie_name == "" || movie_price == "" || movie_description == "") {
            res.json("all fields are required")
        } else {
            await Movie.create({
                movie_name, movie_price, movie_description, thumbnail: singleimage, movie_image: arr
            })
            res.json({
                success: true,
                message: "data inserted"
            })
        }
    } catch (error) {
        res.json(error)
    }
}

const index = async (req, res) => {
    console.log(req.body)
    try {
        const movie = await Movie.find()
        res.json({
            success: true,
            movie
        })
    } catch (error) {
        res.json(error)
    }
}

const trash = async (req, res) => {
    const { id } = req.params
    // console.log(id)
    try {
        const singlemovie = await Movie.findById(id)
        const singleimage = singlemovie.thumbnail
        // console.log(singleimage)
        const image = path.join(__dirname, `../upload/${singleimage}`)
        console.log(image);

        fs.unlink(image, (err) => {
            if (err) {
                res.json("image not deleted")
            } else {
                res.json("image deleted")
            }
        })
        await Movie.findByIdAndDelete(id)
        res.json({
            success: true,
            message: "data deleted"
        })
    } catch (error) {
        res.json(error)
    }
}

const update = async (req, res) => {
    const { id } = req.query
    console.log(id)
    var arr = []
    req.files.movie_image.forEach((image) => {
        arr.push(image.filename)
    });
    console.log(arr);

    // console.log(arr)
    var singleimage = ""
    if (req.files.thumbnail !== undefined) {
        singleimage = req.files.thumbnail[0].filename
    }
    console.log(singleimage)
    try {
        const { movie_name, movie_price, movie_description } = req.body
        await Movie.findByIdAndUpdate(
            { _id: id },
            {
                movie_name, movie_price, movie_description, thumbnail: singleimage, movie_image: arr
            }
        )
        res.json({
            success: true,
            message: "record updated"
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { store, index, trash, update }