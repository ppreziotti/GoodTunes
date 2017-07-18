var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  // name: {
  //   type: String,
  //   required: true
  // },
  // username: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  email: {
  	type: String,
  	required: true,
  	unique: true
  },
  password: {
  	type: String,
  	required: true
  },
});

UserSchema.methods.encryptPassword = function(password) {
  console.log(password);
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model("User", UserSchema);

module.exports = User;