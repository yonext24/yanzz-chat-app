const createError = require("./errorHandler")
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) return next(createError(401, 'You are not logged!'))
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid'))
    req.user = user
    next()
  })
}
module.exports = verifyToken