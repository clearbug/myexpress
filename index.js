module.exports = myexpress;
var http = require('http');
function myexpress(){
	var app = function(req, res){
		res.writeHead(404);
		res.end('Not Found');
	};
	app.listen = function(port, done){
		var server = http.createServer(this);
		return server.listen.apply(server, arguments);
	};
	return app;
};
