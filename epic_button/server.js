var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var server = app.listen(6789, function() {
 console.log("listening on port 6789");
});

var io = require('socket.io').listen(server)
	var num_clicks = 0;
	io.sockets.on('connection', function (socket) {
		socket.on('button_clicked', function(data){
			num_clicks ++ ;
		io.emit('server_button_response', {res: num_clicks}); // Full BroadCast(in REAL-Time)
		})
		socket.on('reset_button_clicked', function(data){
			num_clicks = 0;
		io.emit('server_reset_response', {res: num_clicks});
		})

	})
	app.get('/', function(req, res) {
 		res.render("index", {title: 'The great Button Game'});
	})