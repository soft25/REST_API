const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    imageUrl: {type: String, required: true},
    content: {type: String, required: true},
    creator: {type: Object, required: true}
}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema)

