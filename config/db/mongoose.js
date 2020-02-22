const mongoose = require('mongoose');

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser :true})
.then()
.catch(err => console.log(err));

module.exports =  {mongoose};
