const Post = require('../models/post')

const getSinglePost = (req, res, next) => {
    const postId = req.params.postId
    Post.findById(postId).then(post => {
        if(!post) {
            const error = new Error('Post not found!!')
            error.statusCode = 404
            throw error        
        }
        res.status(200).json({
            message: 'Post fetched',
            post: post
        })
    }).catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

module.exports = getSinglePost