require([
  'underscore',
  'nconf',
  'file',
  'src/index'
], function(_, nconf, file, brainy) {

  nconf.argv();
  nconf.env();

  nconf.defaults({

    'static': {
      src: process.cwd(),
      js: 'js',
      port: 8000
    },

    'rest': {
      port: 8080,
      resources: 'js/resources'
    },

    'sync': {
      adapter: 'mongodb',
      options: {
        host: '127.0.0.1',
        port: 27017,
        name: 'brainy-server'
      }
    }

  });

  var static_conf = nconf.get('static'),
    sync_conf = nconf.get('sync'),
    rest_conf = nconf.get('rest'),
    http_conf = nconf.get('http');

  // assume all modules we load from now on
  // are in project-land (this allows resources to resolve dependencies
  // relative to the project src) ... (removing the /#{js} will allow loading 
  // relative to the file, but not relative to the src dir.. dunno how to get both)
  require.config({
    baseUrl: static_conf.src + '/' + static_conf.js
  });

  // load all resources and start brainy
  file.walk(rest_conf.resources, function(n, p, d, files) {
    require(files, function() {
      brainy(static_conf, rest_conf, sync_conf, _.values(arguments));
    });
  });

});