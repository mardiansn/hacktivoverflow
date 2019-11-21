const router = require('express').Router()
const userController = require('../controllers/user')
const { authenticate } = require('../middlewares/auth')

router.post('/register', userController.register)
router.get('/verify', userController.verify)
router.post('/login', userController.login)
router.post('/glogin', userController.gLogin)
router.get('/tags', userController.findAllTag)
router.get('/tags/my', authenticate, userController.watchedTags)
router.get('/tags/:tag', userController.findTags)
router.patch('/tags/:tag', authenticate, userController.addTag)
router.delete('/tags/:tag', authenticate, userController.removeTag)


module.exports = router
