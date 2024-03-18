const User = require('../users/users-model')

function logger(req, res, next) {
  console.log('method: ' + req.method, 'URL: ' + req.url, 'time: ' + new Date().toTimeString().split(" ")[0]);
  next()
}

async function validateUserId(req, res, next) {
 try { const user = await User.getById(req.params.id)
  if (!user) {
    res.status(404).json({
      message: 'User does not exist'
    })
  } else {
    req.user = user
    next()
  }}
catch (err){
  res.status(500).json({
    message: 'problem finding user'
  })
}
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
 console.log(req.user)
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.name) {
    res.status(400).json({
      message: 'missing required text field'
    })
  } else {
    console.log('validate POST is OK!')
  }
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}