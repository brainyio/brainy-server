define([
  'http',
  'express',
  'backbone',
  'brainy-sync',
  'brainy-sync-api',
  //'socket.io',
  //'brainy-subscribe',
  //'brainy-subscribe-api'
], function(http, express, Backbone, Sync, SyncApi/*, socketio, Subscribe, SubscribeApi,*/) {

  return function(static_conf, sync_api_conf, sync_conf, resources) {

    // create static file server
    var static_app = express(),
      static_server = http.createServer(static_app);

    static_app.use(express.static(static_conf.src));
    static_server.listen(static_conf.port);
    console.log('started static server at port ' + static_conf.port + '...');

    // create REST api
    var rest_app = express(),
      rest_server = http.createServer(rest_app);

    Backbone.sync = Sync(sync_conf.adapter, sync_conf.options);
    SyncApi(rest_app, resources);
    rest_server.listen(sync_api_conf.port);
    console.log('started rest server at port ' + sync_api_conf.port + '...');

    // server WS api
    // var io = socketio.listen(static_server);
    //Backbone.subscribe = Subscribe(sync);
    //Backbone.Model.prototype.subscribe = Backbone.subscribe;
    //Backbone.Collection.prototype.subscribe = Backbone.subscribe;
    //SubscribeApi(io, resources);

    return static_server;
  };

});