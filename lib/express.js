'use strict';
/**
 * Module dependencies.
 */
var http = require('http');
var Layer = require('./layer');
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
  var app = function(req, res, next){
    app.handle(req, res, next);
  };
  app.stack = [];
  app.listen = function(port, done){
    var server = http.createServer(this);
    return server.listen.apply(server, arguments);
  };
  app.use = function(path, argFun){
    var layer;
    if(typeof path === 'function'){
      layer = new Layer('/', path);
    }else if(typeof path === 'string' && typeof argFun === 'function'){
      layer = new Layer(path, argFun);
    }
    this.stack.push(layer);
  };
  app.handle = function(req, res, next){
    var _this = this;
    innerNext();
    function innerNext(err){
      if(err){
        if(_this.stack.length > 0){
          var layer = _this.stack.shift();
          var fn = layer.handle;
          var matchResult = layer.match(req.url);
          req.params = matchResult?matchResult.params:{};
          if(matchResult && fn.length >= 4){
            fn.call(_this, err, req, res, innerNext);
          }else{
            innerNext(err);
          }
        }else if(next){
          next(err);
        }else{
          res.writeHead(500);
          res.end('Unhandled error');
        }
      }else{
        if(_this.stack.length > 0){
          var layer = _this.stack.shift();
          var fn = layer.handle;
          var matchResult = layer.match(req.url);
          req.params = matchResult?matchResult.params:{};
          if(matchResult && fn.length < 4){
            try{
              fn.call(_this, req, res, innerNext);
            }catch(err){
              innerNext(err);
              /*res.writeHead(500);
              res.end('Uncaught error');*/
            }
          }else{
            innerNext();
          }
        }else if(next){
          next();
        }else{
          res.writeHead(404);
          res.end('Not Found');
        }
      }
    }
  };
  return app;
};