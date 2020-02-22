const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('Dream project(mpasal)v1.1.hbs');
});
router.post('/search/:query', (req, res) => {

});

router.get('/contacts', (req, res) => {
  res.render('contacts us & About');
});
//<<<login>>

//<<<>>>>//
router.get('/about', (req, res) => {
  res.render('mpasal refrence');
});

router.get('/cart', (req, res) => {
  res.send('still in development.Thanks for the patience');
});

router.get('/sellers', (req, res) => {
  res.render('our sellers');
});
router.get('/search/:query', (req, res) => {
 res.send('still figuring out the solution');
});

//terms and conditon page needs to be created
router.get('/terms&condition', (req, res) => {
  res.send('still in development.Thanks for the patience');

});

module.exports = router;
