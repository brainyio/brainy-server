define([
  'http',
  'socket.io',
  'express',
  'backbone',
  'brainy-sync',
  'brainy-sync-api',
  //'brainy-subscribe',
  //'brainy-subscribe-api',
  'module',
  'path'
], function(http, socketio, express, Backbone, Sync, Api, /*Subscribe, SubscribeApi,*/ module, path) {

  return function(src_dir, db_conf, resources) {
    var app = express(),
      server = http.createServer(app),
      io = socketio.listen(server),
      filename = module.uri,
      dirname = path.dirname(filename),
      node_modules = dirname + '/../node_modules';

    // scaffold static application
    app.use(express.static(src_dir));

    // MongoDB Backbone persistence
    Backbone.sync = Sync(db_conf);

    // create REST endpoints
    Api(app, resources);

    // MongoDB subscription data
    //Backbone.subscribe = Subscribe(db_conf);
    //Backbone.Model.prototype.subscribe = Backbone.subscribe;
    //Backbone.Collection.prototype.subscribe = Backbone.subscribe;

    // create WS endpoints
    //SubscribeApi(io, resources);

    return server;
  };

});