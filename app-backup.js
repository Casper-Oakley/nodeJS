var express = require('express')
, http = require('http')
, app = express()
, socket = require('socket.io-client')
, mongoose = require('mongoose')
, color = require('colors')
, $ = require('jquery').create()
, routes = require('./routes');
app.set('view engine', 'ejs');
//mongoose.connect('mongodb://heroku:herPass@paulo.mongohq.com:10021/app19280570');
mongoose.connect('mongodb://localhost/mydb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongodb connected successfully".red)});
var testSchema = mongoose.Schema({
	url: String,
	num: Number
});
testSchema.methods.speak = function(){
	var name1 = this.url;
	console.log(name1+" has connected");
};
var test = mongoose.model('Test1',testSchema)
var joe = new test({ url: 'YPXCcZgDQgk', num: 1 })
var joe2 = new test({ url: 'asd', num: 2})
var current = joe.url;
var patt1=/duration='[0-9]'/;
joe.save(function (err,joe){
	if(err)
		joe.speak();
});
app.set('views', __dirname + '/views');
app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.get('/', routes.index(current));

server = http.createServer(app);
var port = process.env.PORT || 5000;
var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function(socket) {
	socket.emit('message', { message: current });
	socket.on('send', function(data){
		io.sockets.emit('message',data);
		current = data.message;
	});
});
console.log('Express server started'.rainbow);
