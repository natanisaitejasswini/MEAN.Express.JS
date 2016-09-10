var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views')); // it concatinates all files and ends up in v
app.set('view engine', 'ejs');

var server = app.listen(6789, function() {
	console.log("listening on port 6789");
});

var io = require('socket.io').listen(server)
	var users =[]; // all users
	var prev = [
	];
	io.sockets.on('connection', function (socket) { // server side connection
		var user = {}; // current user
		var is_user = function(user){
			for(var i = 0; i < users.length; i++){
				if(user == users[i].name){
					return true;
				}
			}
				return false;
		}
		socket.on('new_user', function(data){
			console.log(data.name) // This is current user name
			if(is_user(data.name) === true){
				socket.emit('existing_user',{error: "This user already existed"})
			}
			else{
				data.id = socket.id
				users.push(data);
				// data.id = socket.id // FOR dISCONNECT TO WORK
				user = data ;
				console.log(user)
				socket.emit('appear',data)
				socket.broadcast.emit('someone_joined', data)
				socket.emit('all_prev', prev) 
			}
		})

		socket.on('new_message', function(data){
			data.name = user.name;
			prev.push(data)
			console.log(prev)
			io.emit('display_current_message', data);
		})

		socket.on('disconnect', function(){
			for(var j = 0; j< users.length; j++){
				if(socket.id == users[j].id){
					console.log('user disconnected', users[j].name)
					io.emit('disconnect_user',users[j].name)
					users.splice(j,1)
					console.log('user disconnected', users[j])
				}
			}
		})

	})
	app.get('/', function(req, res) {
 		res.render("index", {title: 'Group Chat'});
	})