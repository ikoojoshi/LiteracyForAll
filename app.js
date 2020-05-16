const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const readline = require('readline');
const fs = require('fs');

// const lineByLine = require('n-readlines');

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


//REad files
// const readInterface = readline.createInterface({
//     input: fs.createReadStream('public/data/English.txt'),
//     output: process.stdout,
//     console: false
// });
//
// readInterface.on('line', function(line) {
//     console.log(line);
// });




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
  const fileStream = fs.createReadStream('public/data/English.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  let i = 0
  var description;
  var path;
  var content = [];
  var videos = [];
  var course = [];
  async function processLineByLine() {
    let i = 0
    for await (const line of rl) {
      // var topic = [];
      if(i==0){
        description = line;
      }
      else if(i==1){
        path = line;
      }
      else if(i%2==0){
        var c = line;
        content.push(line);
      }
      else{
        var v = line;
        course.push({content: c, videos: v});
        videos.push(line);
      }
        i = i + 1;

    }

    res.render('content',{
      description: description,
      path: path,
      content: content,
      videos: videos,
      course: course,
      i: 0
    });
  }
  processLineByLine();



  // Course.findById(req.params.id, function(err,course){
  //   // console.log(courses);
  //   res.render('course',{
  //     course: course
  //   });
  // });
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
