module.exports = myexpress;
var http = require('http');
function myexpress(){
	var app = function(req, res){
		next();
		function next(){
			if(app.stack.length > 0){
				app.stack.shift()(req, res, next);
			}else{
				res.writeHead(404);
				res.end('Not Found');
			}
		};
	};
	app.stack = [];
	app.listen = function(port, done){
		var server = http.createServer(this);
		return server.listen.apply(server, arguments);
	};
	app.use = function(argFun){
		this.stack.push(argFun);
	};
	return app;
};
