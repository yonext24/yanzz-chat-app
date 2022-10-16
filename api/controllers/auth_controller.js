const User = require('../models/User')
const bcrypt = require('bcrypt')
const createError = require('../utils/errorHandler')
const jwt = require('jsonwebtoken')

const AuthController = {
  register: async (req, res, next) => {
    try {
      const { username, email, password } = req.body
      const usernameCheck = await User.findOne({username})
      if (usernameCheck) return next(createError(400, 'Username already exists!'))
      const emailCheck = await User.findOne({email})
      if (emailCheck) return next(createError(400, 'Email already exists!'))

      const hash = bcrypt.hashSync(password, 10)

      const newUser = await User.create({
        username: username,
        email: email,
        password: hash,
      })

      await newUser.save()

      return res.status(200).json('User created correctly!')
    }
    catch (err) {
      next(err)
    }
  },
  login: async (req, res, next) => {
    try {
      const { username } = req.body
      const user = await User.findOne({username}).populate({
        path: 'hasChatsWith',
        select: ['_id', 'username', 'isAvatarImageSet', 'avatarImage']
      })

      if (!user) return next(createError(400, 'Username or password incorrect!'))
      const isPassword = await bcrypt.compare(req.body.password, user.password)
      if (!isPassword) return next(createError(400, 'Username or password incorrect!'))

      const { password, ...otherDetails } = user._doc
      const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT)

      res.cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      }).status(200).json({ ...otherDetails })
    }
    catch (err) {
      return next(err)
    }
  }
}

module.exports = AuthController