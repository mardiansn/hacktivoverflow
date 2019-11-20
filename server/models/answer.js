const mongoose = require('mongoose')
const { Schema, model } = mongoose
const Question = require('./question')

const answerSchema = new Schema({
  content : {
    type: String, 
    required: [true, 'Content is required']},
  upVotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downVotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: [true, 'Question id is required'],
    validate: {
      validator: function (value) {
        return Question.findById(value)
          .then(question => {
            if(!question) {
              return false
            }
          })
      }, message: props => 'Question not found'
    }
  }
}, {
  timestamps: true,
  versionKey: false
})

const Answer = model('Answer', answerSchema)

module.exports = Answer