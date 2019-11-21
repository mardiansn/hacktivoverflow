const nodecron = require('node-cron')
const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
const User = require('../models/user')
const Question = require('../models/question')

require('dotenv').config()

const uri = process.env.MONGO_URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true })
  .then(() => console.log('cron connected to database'))
  .catch(err => console.log('failed to connect to database\n', err))

// let transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.GMAIL_ADDRESS,
//     pass: process.env.GMAIL_PASSWORD
//   }
// })
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'audreanne.marvin42@ethereal.email',
      pass: 'BbaaF7UNqZy5RRtNjM'
  }
});

nodecron.schedule( '0 10 * * *' , function () {
  let usersEmail = []
  User.find()
    .then(users => {
      users.forEach(user => {
        usersEmail.push(user.email)
      })
      return Question.find().sort({ upVotes: 'desc'}).limit(3)
    })
    .then(questions => {
      let mailOptions = {
        from: 'audreanne.marvin42@ethereal.email',
        to: usersEmail,
        subject: 'Popular Questions of The Day',
        text: `Good morning, 
        


        1. ${questions[0].title}: ${questions[0].answers.length} answers
        2. ${questions[1].title}: ${questions[1].answers.length} answers
        3. ${questions[2].title}: ${questions[2].answers.length} answers
        


        You're all set up!
        
        Have a nice day!
        
        Regards,
        
        TejeTanyaJawab`
      }
      transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
          console.log(err)
        } else {
          console.log('Successfully sent email')
        }
      })
    })
    .catch(console.log)
  
  
})