'use strict';
/**
 * Module dependencies.
 * @private 
 */
var Route = require('./route');
var Layer = require('./layer');
/**
 * Module variables.
 * @private 
 */
var objectRegExp = /^\[object (\S+)\]$/;
var slice = Array.prototype.slice;
var toString = Object.prototype.toString;
/**
 * Initialize a new 'Router' with 'options'.
 *
 * @param {Object} options
 * @return {Router} which is an callable function
 * @public
 */
var proto = module.exports = function(options){
  var opts = options || {};
  function router(req, res, next){
    router.handler(req, res, next);
  };
  router.__proto__ = proto;
}