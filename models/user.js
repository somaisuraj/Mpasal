const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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


// UserSchema.pre('save', function (next) {
//    var user = this;
//    if(user.isModified('password')) {//password is key so when its key value is modeified then this function runs
//      let hash = bcrypt.hashSync(user.password, 10);
//           user.password = hash;
//           next();
//    }
//     next();
//      });
// UserSchema.statics.findByCredentials = function (email, password) {
//     let User = this;
//     return User.findOne({email}).then((user) => {
//     //   if (!user) {
//     //     return Promise.reject();// this need more clarification
//     //   }
//     //   return new Promise((resolve, reject) => {
//     //     bcrypt.compare(password, user.password, (err, res) => {
//     //          if (res) {
//     //            resolve(user);
//     //          }else {
//     //            reject();
//     //          }
//     //     });
//     //   });
//       //<<<
//       if (user) {
//         return bcrypt.compare(password, user.password, (err, res) => {
//           if (err) {
//              return err;
//           } return user;
//         });
//       }  return Promise.reject();
//       // //>>>>>>>
//       });
// };
//<<<<<>>>>>>
UserSchema.statics.findByCredentials = function (email, password) {
let User = this;
return User.findOne({ email }).then((user) => {
if (!user) {
return Promise.reject("User was not found");
}
bcrypt.compare(password, user.password, (err, res) => {
if (err) {
return Promise.reject("Password did not match");
} else {
return Promise.resolve(user);
}
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
          user.confirmPassword = hash;//I am just using the hashed value because I have already validated the passwoed in post route
          next();
        });
      });
  } else {
    next();
  }
});
var User = mongoose.model('user', UserSchema);//this should be defined at last otherwise ins not a function could occur

module.exports = {User};
