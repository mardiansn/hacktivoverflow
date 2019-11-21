const User = require('../models/user')
const Question = require('../models/question')
const { comparePass } = require('../helpers/bcrypt')
const { verifyToken, genToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

class UserController {
  static register (req, res, next) {
    const { username, email, password } = req.body
    User.create({ username, email, password})
      .then(user => {
        res.status(201).json({ message: 'Successfully registered', user })
      })
      .catch(next)
  }
  static login (req, res, next) {
    const { email,  password } = req.body
    User.findOne({ email })
      .then(user => {
        if(user && comparePass(password, user.password)){
          const token = genToken({ id: user._id, role: user.role })
          res.status(200).json({ message: 'Welcome back!', token, id: user._id })
        } else {
          next({ status: 400, message: { message: 'Invalid email/password'}})
        }
      })
      .catch(next)
  }
  static gLogin (req, res, next) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

    const { id_token } = req.body
    let userData

    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket => {
      const gPayload = ticket.getPayload()
      const { email, name } = gPayload
      userData = { email, username:name }
      return User.findOne({ email })
    })
    .then(user => {
      if(user){
        const token = genToken({id: user._id, role: user.role })
        res.status(200).json({ token })
      } else {
        userData.password = 'password123'
        return User.create(userData)
        .then(user=> {
          const token = genToken({id: user._id, role: user.role})
          res.status(200).json({ token, message: 'Welcome back!' })
        })
      }
    })
    .catch(next)
  }
  static verify (req, res, next) {
    try {
      verifyToken(req.headers.token)
      res.status(200).json({ message: 'User verified' })
    }
    catch(err) {
      next(err)
    }
  }
  static addTag (req, res, next) {
    const { tag } = req.params
    const { id } = req.loggedUser

    User.findById(id)
      .then(user => {
        if(!user){
          next({ status: 404, message: 'Not found'})
        } else {
          if(user.watchedTags.includes(tag)) {
            next({ status: 400, message: 'tag is already being watched'})
          } else {
            user.watchedTags.push(tag)
            return user.save({ validateBeforeSave: false })
              .then(user => {
                res.status(200).json({ message: 'successfully add tag to watchlist'})
              })
              .catch(next)
          }
        }
      })
      .catch(next)
  }
  static removeTag (req, res, next) {
    const { tag } = req.params
    const { id } = req.loggedUser
    User.findById(id)
      .then(user => {
        if(!user) {
          next({ status: 404, message: 'Not found'})
        } else {
          if(!user.watchedTags.includes(tag)){
            next({ status: 400, message: 'the tag is not in your watchlist'})
          } else {
            return User.findByIdAndUpdate(id, { $pull: { watchedTags: tag }})
              .then(user => {
                res.status(200).json({ message: 'successfully remove tag from your watchlist'})
              })
              .catch(next)
          }
        }
      })
      .catch(next)
  }
  static findTags (req, res, next) {
    const { tag } = req.params
    let result = { name: tag }
    Question.find({ tags: tag })
      .then(questions => {
        result.questions = questions
        return User.find({ watchedTags: tag })
      })
      .then(users => {
        result.users = users
        res.status(200).json(result)
      })
      .catch(next)
  }
  static async findAllTag (req, res, next) {
      try{
        const data = await Question.find()
        let countData = []
        for(let i = 0; i < data.length; i++){
          for(let j = 0; j < data[i].tags.length; j++){
            if(countData.length === 0){
              countData.push({
                name: data[i].tags[j],
                count: 1
              })
            }
            else{
              for(let k = 0; k < countData.length; k++){
                if(data[i].tags[j] == countData[k].name){
                  countData[k].count += 1
                }
                else{
                  let duplicate = false
                  for(let l = 0; l < countData.length; l++){
                    if(data[i].tags[j] === countData[l].name){
                      duplicate = true
                    }
                  }
                  if(duplicate == false){
                    countData.push({
                      name: data[i].tags[j],
                      count: 0
                    })
                  }
                }
              }
            }
          }
        }
        res.status(200).json(countData)
      }
      catch(err){
        next(err)
      }
    }
    static watchedTags (req, res, next ){
      const { id } = req.loggedUser
      User.findById(id)
        .then(user => {
          const tags = user.watchedTags
          res.status(200).json(tags)
        })
        .catch(next)
    }
}

module.exports = UserController