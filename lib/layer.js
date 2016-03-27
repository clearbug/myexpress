module.exports = Layer;
function Layer(path, middleware){
  this.path = path;
  this.handle = middleware;
}
Layer.prototype.match = function(path){
  if(path === this.path || path.indexOf(this.path) === 0){
    return {path: this.path};
  }else{
    return undefined;
  }
};