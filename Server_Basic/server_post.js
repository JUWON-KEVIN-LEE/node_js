var http = require('http');
var u = require('url');
var fs = require('fs');
var qs = require('querystring');

var server = http.createServer(function(req, res) {
	var url = u.parse(req.url);
	var path = url.pathname;
	
	if(path == "/post.html") {
		res.writeHead(200, {'Content-Type':'text/html'});
		// 첫 글자를 제외시켜야한다        encoding type      call back function
		fs.readFile(path.substring(1), 'utf-8', function(error, data) {
			if(error) {
				res.end("<html><meta charset='utf-8'/><body> 서버 에러 : " + error +"</body></html>");
			} else {
				res.end(data);
			}
		});
	} else if(path == "/sign_in") {
		var id = "root";
		var pw = "qwer1234";
		
		var sign;
		var post_data
		req.on('data', function(data) {
			post_data += data;
		});
		
		req.on('end', function() {
			if(sign.id == id && sign.pw == pw) {
			res.writeHead(200, {'Content-Type':'text/html'});
			res.end("SUCCESS");
			} else {
				res.writeHead(200, {'Content-Type':'text/html'});
				res.end("FAIL");
			}
		});
	} else {
		res.writeHead(404, {'Content-Type':'text/html'});
		res.end("<h1>NO PAGE HERE</h1>");
	}
});

server.listen(8090, function() {
	
});