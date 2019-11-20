const mongoose = require('mongoose')
const { Schema, model } = mongoose

const questionSchema = new Schema({
  title: { type: String, required: [true, 'title is required'] },
  description : { type: String, required: [true, 'description is required'] },
  upVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  tags: []
},
{
  timestamps: true, versionKey: false
})

const Question = model('Question ', questionSchema)

module.exports = Question