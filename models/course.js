let mongoose = require("mongoose");

//create a schema
//structure the database

let courseSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
},
  path:{
    type: String,
    required: true
},
  description:{
    type: String,
    required: false
  }
});

let Course = module.exports = mongoose.model('Course', courseSchema);
