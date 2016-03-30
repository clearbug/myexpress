module.exports = Layer;

var pathToRegexp = require('path-to-regexp');

function Layer(path, middleware){
  this.path = path;
  this.handle = middleware;
}
Layer.prototype.match = function(path){
  var result;
  var keys = [];
  var _path = this.prePath?(this.prePath+this.path):this.path;
  if(_path[_path.length-1] === '/'){
    _path = _path.slice(0, -1);
  }
  var pathRegexp = pathToRegexp(_path, keys, {end: false});
  path = unescape(path);
  var pathArr = pathRegexp.exec(path);
  if(pathArr === null){
    result = undefined;
  }else{
    result = {};
    result.path = pathArr[0];
    result.params = {};
    for(var i=0; i<keys.length; i++){
      result.params[keys[i].name] = pathArr[i+1];
    }
  }
  return result;
};