const express = require('express');
const path = require('path');

//Init app
const app = express();

//Load View Engine
app.set('path', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Home Route
app.get('/', function(req, res){
  res.render('index',{
    title: 'Articles'
  });
});

//English course
app.get('/courses', function(req,res){
  res.render('courses',{
    title: 'English'
  });
});

//Start Server
app.listen(3000, function(){
  console.log("server started on port 3000");
});
