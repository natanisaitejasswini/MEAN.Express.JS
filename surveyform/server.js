var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render("index", {title: 'Survey Form'});
})


app.post('/result', function(req, res) {
 console.log("POST DATA", req.body);
 var data ={};
	data.name = req.body.name,
	data.location = req.body.location,
	data.language = req.body.language,
	data.comments = req.body.comments
 	res.render("results", {title: 'Survey Form',user:data});
})

// Other Approach
// app.post('/result', function(req, res) {
//  	res.render("results", {title: 'Survey Form',user: req.body});
// })

app.listen(8000, function() {
 console.log("listening on port 8000");
});

// Doubt if action and next page url are different
// var express = require("express");
// var path = require("path");
// var app = express();
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "./static")));
// app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'ejs');

// app.get('/', function(req, res) {
//  res.render("index", {title: 'Survey Form'});
// })


// app.post('/users', function(req, res) {
//  console.log("POST DATA", req.body);
//  var data ={};
// 	data.name = req.body.name,
// 	data.location = req.body.location,
// 	data.language = req.body.language,
// 	data.comments = req.body.comments
// 	res.send(data);
//  	res.redirect('/result')
// })

// app.get('/result', function(req, res) {
//  res.render("results", {title: 'Survey Form',user:data});
// })

// app.listen(8000, function() {
//  console.log("listening on port 8000");
// });