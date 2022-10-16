const User = require('../models/User')
const Message = require('../models/Message')
const createError = require('../utils/errorHandler')

const MessageController = {
  getAllMessages: async (req, res, next) => {
    if (!req.user) return next(createError(401, 'You musut be logged in to see and send messages'))
    try {
      const to = req.params.id
      const { id: from } = req.user;
  
      const messages = await Message.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
  
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
          id: msg._id
        };
      });
      res.status(200).json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  },
  addMessage: async (req, res, next) => {
    if (!req.user) return next(createError(401, 'You must be logged in to chat'))
    
    try {
      const from = req.user.id
      const { to, message } = req.body
      const data = new Message({
        message: { text: message  },
        users: [from, to],
        sender: from,
      })
      
      const sender = await User.findById(from)
      const getter = await User.findById(to)

      if (!getter || !sender) return next(createError(400, 'Cannot found user'))

      if (!getter.hasChatsWith.includes(sender.id)) getter.hasChatsWith.push(sender.id)
      if (!sender.hasChatsWith.includes(getter.id)) sender.hasChatsWith.push(getter.id)
      
      await sender.save()
      await getter.save()
      await data.save()
      return res.status(200).json('Message created correctly')
    } catch(err) {
      next(err)
    }
  },
}

module.exports = MessageController