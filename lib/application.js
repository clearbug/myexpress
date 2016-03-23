'use strict';

/**
 * Module dependencies.
 * @private
 */
var Router = require('./router');
var query = require('.middleware/query');
/**
 * Application prototype.
 */

var app = exports = module.exports = {};

/**
 * Initiallize the server.
 *
 *    --setup default configuration
 *    --setup default middleware
 *    --setup route reflection methods
 *
 * @private
 */

app.init = function init(){
  this.cache = {};
  this.engines = {};
  this.settings = {};

  this.defaultConfiguration();
}

/**
 * Initialize application configuration.
 * @private
 */
app.defaultConfiguration = function defaultConfiguration(){

}

/**
 * lazily adds the base router if it has not yet been added.
 *
 * We cannot add the base router in the defaultConfiguration because
 * it reads app settings which might be set after that has run.
 *
 * @private
 */
app.lazyrouter = function lazyrouter(){
  if(!this._router){
    this._router = new Router({
      caseSensitive: this.enabled('case sensitive routing'),
      strict: this.enabled('strict routing')
    });

    this._router.use(query(this.get('query parser fn')));
    this._router.use(middleware.init(this));
  }
};
/**
 * Dispatch a req, res pair into the application. Starts pipeline processing.
 *
 * If no callback is provided, then default error handlers will respond 
 * in the event of an error bubbling through the stack.
 *
 * @private 
 */

app.handle = function handle(req, res, callback){

};