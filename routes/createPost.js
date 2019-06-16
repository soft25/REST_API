const Post = require('../models/post')

const createPost = (req, res, next) => {
    if(!req.file) {
        const error = new Error('No iamge provided!!')
        error.statusCode = 422
        throw error 
    }

    const title = req.body.title
    const content = req.body.content
    const imageUrl = req.file.path

    const post = new Post({
        title: title,
        imageUrl: imageUrl,
        content: content,
        creator: {name: 'Sofiane KIRATI'}
    })

    post.save()
        .then((result) => {
            res.status(201).json({
                message: 'Post created successfully!',
                post: result
            })
        }).catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })

}

module.exports = createPost