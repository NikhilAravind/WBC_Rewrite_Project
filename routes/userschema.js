var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var userSchema = new mongoose.Schema({
  user_email: String,
  organization: String,
  states: [{ type: String }]
    			
});

module.exports = mongoose.model('userSchema', userSchema, 'surveyUsers');