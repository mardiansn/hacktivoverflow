const Answer = require('../models/answer')
const ObjectId = require('mongoose').Types.ObjectId;
const Question = require('../models/question')

class AnswerController {
  static create (req, res, next) {
    const { content, questionId } = req.body
    console.log(req.body);
    const { id } = req.loggedUser
    Answer.create({ content, owner: id, questionId })
      .then(answer=>{
        return Question.findByIdAndUpdate( questionId, { $push: { answers : answer._id}}).populate('answers')
      })
      .then(question=>{
        console.log(question);
        res.status(201).json({message: 'Successfully created answer'})
      })
      .catch(next)
  }
  static findById (req, res, next) {
    const { id } = req.params
    Answer.findById(id)
      .populate('owner')
      .then(answer=>{
        res.status(200).json(answer)
      })
      .catch(next)
  }
  static update(req, res, next) {
    const { content } = req.body
    const { id } = req.params
    let objParams = { content }
    Answer.findByIdAndUpdate(id, objParams, { new:true, omitUndefined: true })
      .then(answer =>{
        res.status(200).json({message: 'Success Updated answer', answer: answer})
      })
      .catch(next)
  }
  static delete (req, res, next) {
    const { id } = req.params
    Answer.findByIdAndDelete(id)
      .then(answer=>{
        res.status(200).json({message: 'Success deleted answer', answer: answer})
      })
      .catch(next)
  }
  static upvote (req, res, next) {
    const { answerId } = req.body
    if(!answerId) next({ status: 400, message: { message: 'not found' }})
    Answer.findOne({_id: ObjectId(answerId), upVotes: req.loggedUser.id})
      .then(answer => {
        if(answer) {
          return Answer.findByIdAndUpdate( answerId, { $pull : { upVotes: req.loggedUser.id }})
        } else {
          return Answer.findByIdAndUpdate( answerId, { $push: { upVotes: req.loggedUser.id }})
        }
      })
      .then(response=>{
        return Answer.findByIdAndUpdate( answerId, { $pull : { downVotes: req.loggedUser.id }}, { new: true })
      })
      .then(answer=>{
        res.status(200).json({message: 'Successfully upvote answer', answer})
      })
      .catch(next)
  }
  static downvote (req, res, next) {
    const { answerId } = req.body
    if(!answerId) next({ status: 400, message: { message: 'not found' }})
    Answer.findOne({_id: ObjectId(answerId), downVotes: req.loggedUser.id})
      .then(answer => {
        if(answer) {
          return Answer.findByIdAndUpdate(answerId, { $pull : { downVotes: req.loggedUser.id }})
        } else {
          return Answer.findByIdAndUpdate(answerId, { $push: { downVotes: req.loggedUser.id }})
        }
      })
      .then(response =>{
        return Answer.findByIdAndUpdate(answerId, { $pull : { upVotes: req.loggedUser.id }}, { new: true })
      })
      .then(answer =>{
        res.status(200).json({message:'Successfully downvote answer', answer})
      })
      .catch(next)
  }
}

module.exports = AnswerController