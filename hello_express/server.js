var express = require('express'); // express is a node module
var app = express(); // now app has ability to run get and post methods
app.get('/', function(request,response){   // let us consrtuct base get url to handle index url, and this is a callback function as soon as it hits '/' it runs the CB function 
	response.send('Hello Express');
})
app.listen(8000, function(){
	console.log('listening on 8000')
})