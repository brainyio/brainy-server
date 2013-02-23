require([
  'underscore',
  'nconf',
  'file',
  'src/index'
], function(_, nconf, file, brainy) {

  nconf.argv();
  nconf.env();

  nconf.defaults({

    http: {
      port: 8000
    },

    paths: {
      src: process.cwd(),
      js: 'js',
      resources: 'js/resources'
    },

    db: {
      host: '127.0.0.1',
      port: 27017,
      name: 'brainy-server'
    }

  });

  var path_conf = nconf.get('paths'),
    db_conf = nconf.get('db'),
    http_conf = nconf.get('http'),
    src = path_conf.src,
    js = path_conf.js,
    resources = path_conf.resources,
    port = http_conf.port;

  function serve(resources) {
    var app = brainy(src, db_conf, resources);
    app.listen(port);
  };

  // assume all modules we load from now on
  // are in project-land (this allows resources to resolve dependencies
  // relative to the project src) ... (removing the /#{js} will allow loading 
  // relative to the file, but not relative to the src dir.. dunno how to get both)
  require.config({
    baseUrl: src + '/' + js
  });

  if (resources) {
    file.walk(resources, function(n, p, d, files) {
      require(files, function() {
        serve(_.values(arguments));
      });
    });
  } else {
    serve();
  }

});