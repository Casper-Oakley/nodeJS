var express = require('express')
, http = require('http')
, app = express()
, mongoose = require('mongoose')
, color = require('colors')
, routes = require('./routes');
app.set('view engine', 'ejs');
mongoose.connect('mongodb://heroku:herPass@paulo.mongohq.com:10021/app19280570');
//mongoose.connect('mongodb://localhost/mydb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongodb connected successfully".red)
	var testSchema = mongoose.Schema({
		name: String
	})
	testSchema.methods.speak = function(){
		var name1 = this.name;
		console.log(name1);
	}
	var test = mongoose.model('Test1',testSchema)
	var joe = new test({ name: 'yoyoyo' })
	joe.save(function (err,joe){
		if(err)
			joe.speak();
	});
});
app.set('views', __dirname + '/views');
app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.get('/', routes.index);

app.get('/chocolates', routes.chocolates);

var repeat = 4;
app.get('/open', routes.open(repeat));

server = http.createServer(app);
var port = process.env.PORT || 5000;
server.listen(port);
console.log('Express server started'.rainbow);
