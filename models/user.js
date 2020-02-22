const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true
  },
  // name: {
  //   type: String,
  //   required: false,
  //   trim: true
  // },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  // gender: {
  //   type: String,
  //   required: false
  // },
  birthDate: {
    type: Number,
    trim: true}
  // },
  // tokens: [{
  //   access:{
  //     type: String,
  //     required: false
  //   },
  //   token: {
  //     type:String,
  //     required: false
  //   }
  // }]

});
// UserSchema.methods.generateAuthToken = function () {
//   let user = this;
//   let access = 'auth';
//   //jwt.sign({objectdata}, secretkey, {option object}); it is jwt syntax
//   let token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET,
//   {
//     expiresIn:"1hr"
//   }).toString();
//   user.tokens.push({access, token});
//
//   return user.save().then(() => {
//    return token;
//   });
//
// };
// UserSchema.methods.deleteAuthToken = function() {
//   let user = this;
//   user.token.delete({access, token});
//   return user.save();
// }

UserSchema.statics.findByCredentials = function (email, password) {
let User = this;
return new Promise((resolve, reject) => {
User.findOne({email}).then((user) => {
if (!user)
return reject("email not found");

bcrypt.compare(password, user.password, (err, res) => {
if (res) {
  resolve(user);

} return reject("check your password");
});
});
});
};


///<<<<<>>>>>

UserSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password' )) {
      bcrypt.genSalt(10, (err, salt) => {//here you write any numbers high number means more secure
        bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          user.confirmPassword = hash;//I am just using the hashed value because I have already validated the password in post route
          next();
        });
      });
  } else {
    next();
  }
});
let User = mongoose.model('user', UserSchema);//this should be defined at last otherwise ins not a function could occur

module.exports = {User};
