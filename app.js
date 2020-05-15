const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

//connect to database
mongoose.connect("mongodb://localhost/literacyforall", {useNewUrlParser:true, useUnifiedTopology: true});
let db = mongoose.connection;

//check for db errors
db.on("error", function(err){
  console.log(err);
});
//check
//check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
})
//Init app
const app = express();

//Bringe in models
let Course = require('./models/course');

//body parser
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Load View Engine
app.set('path', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//Home Routes
app.get('/', function(req, res){
  Course.find({}, function(err, courses){
    if(err){
      console.log(err);
    }
    else {
      res.render('index',{
        courses : courses
      });
    }
  });
});

// for various courses
app.get('/course/:id', function(req,res){
  Course.findById(req.params.id, function(err,course){
    // console.log(courses);
    res.render('course',{
      course: course
    });
  });
});


//English course
// app.get('/course', function(req,res){
//   res.render('courses',{
//     title: 'English'
//   });
// });

//Start Server
app.listen(3000, function(){
  console.log("server started on port 3000");
});

// to change to new page - res.redirect('/')
