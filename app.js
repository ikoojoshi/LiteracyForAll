const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const readline = require('readline');
const fs = require('fs');

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

  // function indexpage(course){
  //   res.render('index',{
  //     courses: course,
  //   });
  // }
  const directoryPath = path.join(__dirname, 'public/data');
  var course= [];

  async function finaltry() {
  fs.readdir(directoryPath, function getData(err, files) {
      //handling error
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      }
      //listing all files using forEach
      var description;
      var path2;
      var title;
      files.forEach(function (file) {
          // Do whatever you want to do with the file

          const fileStream = fs.createReadStream('public/data/'+file);
          const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
          });
          let i = 0
          title = file.substring(0, file.length - 4);
          console.log(title);

          async function processLineByLine() {
            for await (const line of rl) {
              if(i==0){
                description = line;
              }
              else if(i==1){
                path2 = line;
                course.push([{title: title, description: description, path: path2}]);
              }
              else
                break;

              i = i + 1;
            }
          }
          processLineByLine();
      });
      // res.render('index',{
      //   courses: course,
      // });

  });
  console.log(course);
  return course;
}
//second async function
async function second(){
  let course = await finaltry();
  console.log(course);
  res.render('index',{
    courses: course
  });
}



  });

  // Course.find({}, function(err, courses){
  //   if(err){
  //     console.log(err);
  //   }
  //   else {
  //     res.render('index',{
  //       courses : courses
  //     });
  //   }
  // });
//});

// for various courses
app.get('/course/:title', function(req,res){
  const fileStream = fs.createReadStream('public/data/'+req.params.title+'.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  let i = 0
  var description;
  var path;
  var course= [];
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
      }
      else{
        var v = line;
        course.push({content: c, videos: v});
      }
        i = i + 1;

    }

    res.render('content',{
      description: description,
      path: path,
      course: course,
      title: req.params.title
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
