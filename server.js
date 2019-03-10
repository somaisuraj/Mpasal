const express = require('express');
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser');//without this req.body is unavailable


const {mongoose} = require('./db/mongoose.js');
const {User} = require('./models/user.js');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');// this is separate hbs and need to assign to render hbs file type
app.use(express.static(__dirname + '/public'));//in my point of view dirname is parent dir and public contains all static files like js css and html
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
  res.render('Dream project(mpasal)v1.1.hbs');
});

app.get('/contacts', (req, res) => {
  res.render('contacts us & About');
});

//<<<login>>
app.post('/login', (req, res) => {
  // User.findOne({email:req.body.email}).then((user) => {//when using findOne parameter should be object
  //   res.render('user', user);
  //
  // })
  User.findByCredentials(req.body.email,req.body.password).then((user) => {//this return variable is object and has all access to key and values--
     res.render('user', user);//--as a result it is loading its name value inside browser.
     console.log(user);
     console.log(user.password);
  }).catch((e) => {
    res.send(e);
  });
});
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/logout', (req, res) => {
  res.render('logout');
});
//<<<>>>>//
app.get('/about', (req, res) => {
  res.render('mpasal refrence');
});

app.get('/cart', (req, res) => {
  res.send('still in development.Thanks for the patience');
});

app.get('/sellers', (req, res) => {
  res.render('our sellers');
});

// <<signup>>
app.post('/singleSignup', (req, res) => {
  console.log(req.body); //this is used  to debug this part of code.
  let user = new User({
    email: req.body.email,
    name:  req.body.name,
    password: req.body.password,
    confirmPassword:req.body.confirmPassword,
    gender: req.body.gender,
    birthDate: req.body.birthDate
  });
  if (req.body.password === req.body.confirmPassword) {
    user.save().then((user) => {
      res.render('registeredUser', {
        name: user.name,
        email: user.email
      });
      res.redirect('Dream project(mpasal)v1.1', 200);
    }).catch ((e) => {
      res.send(e);
    });
  } else {
      return res.status(400).send('password didnot match');
  };





});
app.get('/singleSignup', (req, res) => {
  res.render('signUpByer');
});
//<<>>
app.get('/sellerSignup', (req, res) => {
  res.render('signup');
});

//terms and conditon page needs to be created
app.get('/terms&condition', (req, res) => {
  res.send('still in development.Thanks for the patience');

});


app.listen(port, () => {
  console.log(`started at ${port}`)
});
