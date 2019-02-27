const express = require('express');
const app = express();
const hbs = require('hbs');


const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');// this is separate hbs and need to assign to render hbs file type
app.use(express.static(__dirname + '/public'));//in my point of view dirname is parent dir and public contains all static files like js css and html
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
  res.render('Dream project(mpasal)v1.1.hbs');
});

app.get('/contacts', (req, res) => {
  res.render('contacts us & About');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/about', (req, res) => {
  res.render('mpasal refrence');
});

app.get('/cart', (req, res) => {
  res.send('still in development.Thanks for the patience');
});

app.get('/sellers', (req, res) => {
  res.render('our sellers');
});

app.get('/singleSignup', (req, res) => {
  res.render('sign up form for individual');
});

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
