// 1. Have the server render views/index.ejs that has the form for the user to fill out
// 2. The user fills out the form and submits
// 3. The form information is EMITTED to the server with 
// the event name "posting_form"
// 4. The server listens for an event 'posting_form' 
	// and when this event gets triggered, organizes all the emitted 
	// information to form a single message and sends this single message 
	// with the event called 'updated_message'. It also EMITs an event 
	// called 'random_number' with random number between 1-1000.
// 5. The client listens for an event called 'random_number' and 
	// when this event gets triggered, shows the number in the HTML.
// 6. The client listens for an event called 'updated_message' and 
// when this event gets triggered, displays the message somewhere in the HTML



module.exports = function Route(app,server){
	// Server socket logic
	var io = require('socket.io').listen(server)

	app.get('/', function(req, res) {
 		res.render("index", {title: 'Survey Form'});
	})

	// Connection event from client side
	io.sockets.on('connection', function (socket) {
		//  server listening to posting_form event
		socket.on('posting_form', function(data){
			// console.log(data);
			var random_number = Math.floor((Math.random() * 1000) + 1);
			socket.emit("updated_message", {res: data});
			socket.emit("random_number", {res: random_number});
		})
	})

}