const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

const httpServer = http.createServer(function(req, res) {
  var path = url.parse(req.url, true).pathname.replace(/^\/+|\/+$/g, "");
  var method = req.method.toLowerCase();

  var handler = null;
  if (
    typeof router[path] === "undefined" ||
    typeof router[path][method] === "undefined"
  ) {
    handler = handlers.notFound;
  } else {
    handler = handlers[path][method];
  }
  var data = {
    path: path,
    method: method
  };
  handler(data, function(statusCode, payload) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(statusCode);
    res.end(JSON.stringify(payload));
  });
});

httpServer.listen(3000, function() {
  console.log("Server is listening on port 3000");
});

const handlers = {
  hello: {
    //Http method check
    post: function(data, callback) {
      callback(200, data);
    }
  },
  notFound: function(data, callback) {
    callback(404);
  }
};

const router = {
  hello: handlers.hello
};
