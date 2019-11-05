const express = require('express');
const router = express.Router();
const signUpValidation = require('./utils/signUpValidation');
const userController = require('./controllers/userController')
const passport = require('passport');


/* GET users listing. */
router.get('/', (req, res) => {
  res.send('hit USERS')
})

router.get('/signup', (req, res) => {
  if (req.isAuthenticated()) return res.render('home/home')

  res.render('user/signup')
})

router.post('/signup', signUpValidation, userController.signup)

router.get('/signin', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/')
  res.render('user/signin')
})

router.post('/signin', passport.authenticate('local-login', {
  successRedirect: '/home',
  failureRedirect: '/user/signin',
  failureFlash: true
}))

router.get('/logout', (req, res) => {
  req.logout();

  res.redirect('/home');
})

router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('user/profile')
  } else {
    res.redirect('/home')
  }
})

router.post('/profile', userController.updateProfile)


router.get('/passwordrecovery', (req, res) => {
  res.render('user/password-recovery')
})

module.exports = router;
