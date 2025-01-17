const User = require('../users/users-model')

function logger(req, res, next) {
  console.log('method: ' + req.method, 'URL: ' + req.url, 'time: ' + new Date().toTimeString().split(" ")[0]);
  next()
}

async function validateUserId(req, res, next) {
 try { const user = await User.getById(req.params.id)
  if (!user) {
    res.status(404).json({
      message: 'not found'
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
 const {name} = req.body
 if (!name || !name.trim()) {
  console.log('Validating User...');
  res.status(400).json({
    message: 'missing required name field'
  })
  console.log('... User Validated!')
 } else {
  req.name = name.trim()
  next()
 }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const {text} = req.body
  if (!text || !text.trim()) {
   console.log('Validating User...');
   res.status(400).json({
     message: 'missing required text field'
   })
   console.log('... User Validated!')
  } else {
   req.text = text.trim()
   next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}