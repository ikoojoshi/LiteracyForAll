const express = require('express');
const path = require('path');

const readline = require('readline');
const fs = require('fs');


//Init app
const app = express();

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

    course = [];
    course.push({title: "English", path:"pictures/english_cover.JPG", description: "Improve your English Grammar, composition and writing skills with this beginner friendly course."});
    course.push({title: "Hindi", path:"pictures/hindi_cover.JPG", description: "A guide for beginners to effective communication and knowledge of Hindi"});
    course.push({title: "Maths", path:"pictures/maths_cover.JPG", description: "A course specially architectured for junior school students."});


    res.render('index',{
      courses: course
    });



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
  var path3;
  var course= [];
  async function processLineByLine() {
    let i = 0
    for await (const line of rl) {
      // var topic = [];
      if(i==0){
        description = line;
      }
      else if(i==1){
        path3 = line;
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
      path: path3,
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
