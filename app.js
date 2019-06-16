const path = require('path')

const express = require('express')
const app = express() //creating my express app
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require("multer")

const feedRoutes = require('./routers/feed')
const uri = "mongodb://localhost/rest-api"
const port = 3002

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() +  '-' + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }

}
//app.use(bodyParser.urlencoded({extended: true})) // x-www-form_urlencoded
app.use(bodyParser.json()) // parse incoming json data
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))
app.use('/images', express.static(path.join(__dirname, 'images')))

mongoose.connect(uri).then(
    app.listen(port, () => {
        console.log(`Server started on port ` + port);
    })
).catch(err => {
    console.log(err)
})

//CORS setting
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization')
    next()    
});

app.use('/feed', feedRoutes)

// ERROR Middleware
app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    res.status(status).json({message: message})
})

