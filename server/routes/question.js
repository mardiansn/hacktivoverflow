const route = require('express').Router()
const QuestionController = require('../controllers/question');
const {authenticate, qAuthorize} = require('../middlewares/auth');

route.get('/', QuestionController.find)
route.use(authenticate)
route.post('/', QuestionController.create)
route.patch('/upvote', QuestionController.upvote)
route.patch('/downvote', QuestionController.downvote)
route.get('/my', QuestionController.findMine)
route.get('/:id',qAuthorize ,QuestionController.findById)
route.patch('/:id', qAuthorize, QuestionController.update)
route.delete('/:id', qAuthorize, QuestionController.delete)

module.exports = route