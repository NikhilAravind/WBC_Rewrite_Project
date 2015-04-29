var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;

var predictionSchema = new mongoose.Schema({
  email: String,
  username: String,
  predictions: [{ type: String }]
    			
});

module.exports = mongoose.model('predictionSchema', predictionSchema, 'surveyUsers');