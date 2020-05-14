let mongoose = require("mongoose");

//create a schema
//structure the database

let courseSchema = mongoose.Schema({
  title:{
    type: String,
    required: false
},
id:{
  type: String,
  required: false
}
});

let Course = module.exports = mongoose.model('Course', courseSchema);
