const express = require('express')
const router = express.Router()
const { body } = require('express-validator/check')

const getPosts = require('../routes/getPosts'),
    getSinglePost = require('../routes/getSingelPost'),
    createPost = require('../routes/createPost'),
    treatValidationResult = require('../middleware/treatValidationResult')

// GET /feed/posts
router.get('/posts', getPosts)
// GET /feed/post/:postId
router.get('/post/:postId', getSinglePost)
// POST /feed/post
router.post('/post', [
    body('title').trim().isLength({min: 7}),
    body('content').trim().isLength({min: 5})
], treatValidationResult, createPost)

module.exports = router