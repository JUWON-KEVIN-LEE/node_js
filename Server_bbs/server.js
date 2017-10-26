var http = require("http");
var route = require("./a_route");

var server = http.createServer(function(req, res) {
	route.process(req, res);
});

server.listen(8090, function() {
	console.log("server is running...");
});

// C:\Users\quf93\Desktop\NODE\Server_bbs