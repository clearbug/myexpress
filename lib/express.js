'use strict';
/**
 * Module dependencies.
 */
var http = require('http');
/*var EventEmitter = require('events').EventEmitter;
var mixin = require('merge-descriptions');*/
/**
 * Expose 'createApplication()'.
 */
exports = module.exports = createApplication;
/**
 * Create an express application.
 *
 * @return {Function}
 * @api public
 */
/*function createApplication(){
  var app = function(req, res, next){
    app.handle(req, res, next);
  };
}*/
function createApplication(){
  var app = function(req, res){
    next();
    function next(err){
      if(err){
        if(app.stack.length > 0){
          var fn = app.stack.shift();
          if(fn.length >= 4){
            fn(err, req, res, next);
          }else{
            next(err);
          }
        }else{
          res.writeHead(500);
          res.end('Unhandled error');
        }
      }else{
        if(app.stack.length > 0){
          var fn = app.stack.shift();
          if(fn.length < 4){
            try{
              fn(req, res, next);
            }catch(err){
              //console.log(err);
            }finally{
              res.writeHead(500);
              res.end('Uncaught error');
            }
          }else{
            next();
          }
        }else{
          res.writeHead(404);
          res.end('Not Found');
        }
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