var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false}));

app.get('/', function(req,res){
	res.render('index');
})

app.get('/jukebox', function(req,res){
	res.render('jukebox');
})

io.on('connection', function(socket) {
	console.log('hi there');
    socket.on('chat message', function(msg) {
        io.emit('chat message', (`${msg.username}: ${msg.message}`));
        if(msg.message.match(/play\s(\s|\w)+/)){
        	io.emit('playlist update', msg.message.substring(5, msg.message.length))
        }
    });

});

http.listen(port, function(){
	console.log('connected');
})