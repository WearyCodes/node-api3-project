const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const {logger, validateUserId, validateUser, validatePost} = require('../middleware/middleware')
const router = express.Router();
const User = require('./users-model')
const Post = require('../posts/posts-model')

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
  .then(users => {
    res.json(users)
  })
  .catch(next)
  console.log(req.user)
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  User.insert({name: req.name})
  .then(user => {res.status(201).json(user)})
  .catch(next)
  // this needs a middleware to check that the request body is valid
  console.log(req.name)
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user, req.name)
});

router.delete('/:id', validateUserId,(req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  console.log(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log(req.user)
});

router.post('/:id/posts', validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.text)
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'Something is wrong!',
    message: err.message,
    stack: err.stack
  })
})

// do not forget to export the router

module.exports = router