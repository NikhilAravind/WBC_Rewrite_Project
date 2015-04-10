
var mongoose = require('mongoose');

module.exports = mongoose.model('login',{
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String
});