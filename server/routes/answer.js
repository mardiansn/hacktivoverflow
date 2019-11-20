const route = require('express').Router()
const AnswerController = require('../controllers/answer');
const {authenticate, aAuthorize} = require('../middlewares/auth');

route.use(authenticate)
route.get('/:id', aAuthorize ,AnswerController.findById)
route.post('/', AnswerController.create)
route.patch('/upvote', AnswerController.upvote)
route.patch('/downvote', AnswerController.downvote)
route.patch('/:id', aAuthorize , AnswerController.update)
route.delete('/:id', aAuthorize , AnswerController.delete)

module.exports = route
