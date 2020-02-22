const express = require('express');
const router = express.Router();
const {User} = require('../models/user.js');
const _ = require('lodash');
const passport = require('passport');
const {ensureAuthenticated} = require('../config/auth')

// <<signup>>
router.post('/singleSignup', async(req, res) => {
  console.log(req.body); //this is used  to debug this part of code.
  // let user = new User({
  //   email: req.body.email,
  //   password: req.body.password,
  //   confirmPassword:req.body.confirmPassword,
  //   birthDate: req.body.birthDate
  // });
  let {email, password, confirmPassword, birthDate} = req.body;
  let errors = [];
  if (password !== confirmPassword) {
     errors.push({msg:'password didnot match'});
   }
   if(errors.length > 0) {
     res.render('signUpByer', {
       errors, email, password, confirmPassword, birthDate
     });
   } else {
     let user = await User.findOne({email:email});
     if(user) {
       errors.push({msg:'user already exists'});
       res.render('signUpByer', {
         errors, email, password, confirmPassword, birthDate
       })
     }else{
       let user = new User({
         email, password, confirmPassword, birthDate
       });
       user.save().then(user => {
         req.flash('success_msg', 'you are now registerd and can log in');
         res.redirect('/login');
       })
       .catch(err => console.log(err));
}

     }

});

router.post('/login',(req, res, next) => {
   passport.authenticate('local', {
     successRedirect:'/userDashboard',
     failureRedirect:'/login',
     failureFlash: true,
   }) (req, res, next);
  // try {
  // let body = _.pick(req.body, ['email', 'password']);//error due to placement change , after including loadash it worked again
  // let user = await User.findByCredentials(body.email, body.password);
  // console.log(user);
  // // let token = await user.generateAuthToken();
  // if(user) {
  //   // res.redirect('userDashboard');
  //   res.redirect('userDashboard');
  //
  //
  // }
  // } catch (e) {
  //    res.status(400).send(e);
  //    console.log('error from catch');
  // }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'you are logged out');
  res.redirect('/login');
});

router.get('/userDashboard', ensureAuthenticated,(req, res) => {
  console.log(req);
  res.render('userDashboard', {email: req.user.email});
});

router.get('/singleSignup', (req, res) => {
  res.render('signUpByer');
});

router.get('/sellerSignup', (req, res) => {
  res.render('signup');
});

router.get('/registeredUser', (req, res) => {
   res.render('registeredUser');
 });

module.exports = router;
