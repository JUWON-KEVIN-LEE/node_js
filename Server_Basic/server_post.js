var http = require('http');
var u = require('url');
var fs = require('fs');

var server = http.createServer(function(req, res) {
	var url = u.parse(req.url);
	var path = url.pathname;
	
	res.writeHead(200, {'Content-Type':'text/html'});
	// 첫 글자를 제외시켜야한다        encoding type      call back function
	fs.readFile(path.substring(1), 'utf-8', function(error, data) {
		if(error) {
			res.end("<html><meta charset='utf-8'/><body> 서버 에러 : " + error +"</body></html>");
		} else {
			res.end(data);
		}
	});
});

server.listen(8090, function() {
	
});