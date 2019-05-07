const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  birthDate: {
    type: Number,
    required: true,
    trim: true
  },
  tokens: [{
    access:{
      type: String,
      required: false
    },
    token: {
      type:String,
      required: false
    }
  }]

});
UserSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user.id.toHexString(), access}, 'shristi').toString();
  user.tokens.push({access, token});

  return user.save().then(() => {
   return token;
  });

};

UserSchema.statics.findByCredentials = function (email, password) {
let User = this;
return new Promise((resolve, reject) => {
User.findOne({email}).then((user) => {
if (!user)
return reject("User was not found");

bcrypt.compare(password, user.password, (err, res) => {
if (res) {
  resolve(user);

} return reject("Password did not match");
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
          // user.confirmPassword = hash;//I am just using the hashed value because I have already validated the passwoed in post route
          next();
        });
      });
  } else {
    next();
  }
});
var User = mongoose.model('user', UserSchema);//this should be defined at last otherwise ins not a function could occur

module.exports = {User};
