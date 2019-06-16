const Post = require('../models/post')

const getPosts = (req, res, next) => {
   
    Post.find().then(posts => {
        res.status(200).json({
            message: 'Posts fetched successfully!!',
            posts: posts
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
    
}

module.exports = getPosts