const router = require('express').Router()
const MessageController = require('../controllers/message_controller')
const verifyToken = require('../utils/validateToken')

router.post('/chat', verifyToken, MessageController.addMessage)
router.get('/chat/:id', verifyToken, MessageController.getAllMessages)

module.exports = router
