const Question = require('../models/question')
const Answer = require('../models/answer')
const { ObjectId } = require('mongoose').Types

class QuestionController {
  static create (req, res, next) {
    const { title, description, tags} = req.body
    const { id } = req.loggedUser
    Question.create({title, description, tags, owner: id })
      .then(question=>{
        res.status(201).json({question, message:'Successfully created question'})
      })
      .catch(next)
  }
  static async find (req, res, next) {
    let { keyword, page } = req.query;
    const limit = 5

    let objParams
    if (keyword) {
        objParams = { $or: [
                { title: { $regex: `${keyword}`, $options: 'i' }},
                { description: { $regex: `${keyword}`, $options: 'i' }},
                { tags: { $in: [`${keyword}`] } }
            ]
        }
    }
    try {
      const questions = await Question.find(objParams).populate('owner').populate({ path: 'answers', populate: { path: 'owner' }}).sort({createdAt: -1}).skip(page * limit).limit(limit)
      res.status(200).json(questions)
    }
    catch(err) {
      next(err)
    }
  }
  static findMine (req, res, next ) {
    const owner  = req.loggedUser.id
    Question.find({ owner })
    .populate('owner')
    .populate({ path: 'answers', populate: { path: 'owner' }})
    .sort({createdAt: -1})
      .then(questions=>{
        res.status(200).json(questions)
      })
      .catch(next)
  }
  static async findById (req, res, next) {
    const { id } = req.params
    try {
      const question = await Question.findById(id).populate({ path: 'answers', populate: { path: 'owner' }}).populate('owner')
      res.status(200).json(question)
    }
    catch (err) {
      next(err)
    }
    // Question.findById(id).populate('owner').populate('answers')
    //   .then(question=>{
    //     res.status(200).json(question)
    //   })
    //   .catch(next)
  }
  static update(req, res, next) {
    const { id } = req.params
    const {description, tags, title} = req.body
    let objParams = { description, tags, title }
    Question.findByIdAndUpdate(id, objParams, { omitUndefined: true, new: true })
      .then(question=>{
        res.status(200).json({message: 'Successfully updated question', question})
      })
      .catch(next)
  }
  static delete (req, res, next) {
    const {id} = req.params
    Question.findByIdAndDelete(id)
      .then(question=>{
        return Answer.deleteMany({ questionId: id })
      })
      .then(response => {
        res.status(200).json({message: 'Successfully deleted question'})
      })
      .catch(next)
  }
  static upvote (req, res, next) {
    const { questionId } = req.body
    Question.findOne({_id: ObjectId(questionId), upVotes : req.loggedUser.id})
      .then(question=>{
        if(question){
          return Question.findOneAndUpdate({_id: ObjectId(questionId)}, { $pull : { upVotes: req.loggedUser.id } })
        } else {
          return Question.findOneAndUpdate({_id: ObjectId(questionId)}, { $push: { upVotes : req.loggedUser.id } })
        }
      })
      .then(question=>{
        return Question.findOneAndUpdate({_id: ObjectId(questionId)}, { $pull : { downVotes: req.loggedUser.id }}, { new: true })
      })
      .then(question=>{
        res.status(200).json({ message: 'Successfully upvote', question})
      })
      .catch(next)
  } 
  static downvote (req, res, next) {
    const { questionId } = req.body
    Question.findOne({_id: ObjectId(questionId), downVotes : req.loggedUser.id})
      .then(question=>{
        if(question){
          return Question.findOneAndUpdate({_id: ObjectId(questionId)}, { $pull : { downVotes: req.loggedUser.id } })
        } else {
          return Question.findOneAndUpdate({_id: ObjectId(questionId)}, { $push: { downVotes: req.loggedUser.id } })
        }
      })
      .then(question=>{
        return Question.findOneAndUpdate({_id: ObjectId(questionId)}, { $pull : { upVotes: req.loggedUser.id } }, { new: true })        
      })
      .then(question=>{
        res.status(200).json({ message: 'Successfully downvote', question})
      })
      .catch(next)
  }
}

module.exports = QuestionController