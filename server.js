require('./config/config');
const express = require('express');
const app = express();
const passport = require('passport');
 //passsport config
require('./config/passport.js')(passport);

const hbs = require('hbs');
const bodyParser = require('body-parser');//without this req.body is unavailable
const _ = require('lodash');
const {mongoose} = require('./config/db/mongoose.js');
const flash = require('connect-flash');
const session = require('express-session');
//session
app.use(session({
  secret:'shristi',
  resave: true,
  saveUninitalized: true
  // cookie: {session: true}  not needed
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false}));//this should put before routes

//connect-flash
app.use(flash());

//gloabal vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})
// Handlebars.registerHelper("message", ())
//Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/user'));

app.set('view engine', 'hbs');// this is separate hbs and need to assign to render hbs file type
//middlewares




app.use(express.static(__dirname + '/public'));//in my point of view dirname is parent dir and public contains all static files like js css and html
hbs.registerPartials(__dirname + '/views/partials');
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`started at ${port}`)
});
