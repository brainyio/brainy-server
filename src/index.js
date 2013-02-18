define([
  'express',
  'backbone',
  'brainy-sync',
  'brainy-api',
  'module',
  'path'
], function(express, Backbone, Sync, Api, module, path) {

  return function(src_dir, db_conf, resources) {
    var app = express(),
      filename = module.uri,
      dirname = path.dirname(filename),
      node_modules = dirname + '/../node_modules';

    // scaffold static application
    app.use(express.static(src_dir));
    app.use(express.static(node_modules + '/brainy-boilerplate/src'));

    // MongoDB Backbone persistence
    Backbone.sync = Sync(db_conf);

    // create REST endpoints
    Api(app, resources);

    return app;
  };

});