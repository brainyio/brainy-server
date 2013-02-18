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
      port: 80
    },

    paths: {
      src: process.cwd(),
      resources: null
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
    resources = path_conf.resources,
    port = http_conf.port;

  function serve(resources) {
    var app = brainy(src, db_conf, resources);
    app.listen(port);
  }; 

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