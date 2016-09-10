// var express = require('express'); 
// var app = express(); 

// 	app.use(express.static(__dirname + "/static"));

// app.listen(8000, function(){
// 	console.log('listening on 8000')
// })

// Navigate to localhost:8000/main.html


// Practising Ejs

var express = require('express'); 
var app = express(); 

	app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are 
// using ejs as opposed to another templating engine like jade
	app.set('view engine', 'ejs');
	
app.get("/users", function (request, response){
    // hard-coded user data
    var users_array = [
        {name: "Michael", email: "michael@codingdojo.com"}, 
        {name: "Jay", email: "jay@codingdojo.com"}, 
        {name: "Brendan", email: "brendan@codingdojo.com"}, 
        {name: "Andrew", email: "andrew@codingdojo.com"}
    ];
    response.render('users', {users: users_array});
})
app.listen(8000, function(){
	console.log('listening on 8000')
})