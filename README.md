# brainy-server

brainy-server is a server side and client side framework for Backbone. the end goal is a "holy grail" application where any application specific code is shared between the client and the server.

brainy does the work of inferring  server specific handlers from your client Backbone code. this means you can write code once for the client, and brainy takes the responsibility of creating a compatible server for you.

## use

### using the built-in server

brainy-server includes a built in server which can:

- create a static file server for your application
- scaffold boilerplate files for your application, voiding the drudgery of adding libraries and linking files
- create a RESTful API from directory of Backbone models and collections

to create a brainy sever, simply invoke the `brainy-server` command and tell it where your webroot is (`process.cwd()` by default), and where your models and collections are contained:

```
$ brainy-server --paths.resources=js/resources
```

this will start an application server and API on [http://localhost/](http://localhost/).