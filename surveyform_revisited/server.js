var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});

var io = require('socket.io').listen(server)

	app.get('/', function(req, res) {
 		res.render("index", {title: 'Survey Form'});
	})

	// Connection event from client side
	io.sockets.on('connection', function (socket) {
		//  server listening to posting_form event
		socket.on('posting_form', function(data){
			console.log(data);
			var random_number = Math.floor((Math.random() * 1000) + 1);
			socket.emit("updated_message", {res: data});
			socket.emit("random_number", {res: random_number});
		})
	})

// var route = require('./routes/index.js')(app,server)