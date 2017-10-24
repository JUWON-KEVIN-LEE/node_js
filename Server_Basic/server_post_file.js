var http = require('http');
var u = require('url');
var fs = require('fs');
var qs = require('querystring');
var m = require('mime');

// 주소(Rest Api) 요청의 형태
// http://localhost:8090/localfile?filepath=/file/ref.png

var server = http.createServer(function(req, res) {
	var url = u.parse(req.url);
	console.log(url);
	// 주소에서 명령어 = 서버 자원의 id(uri) 를 먼저 꺼낸다
	var cmd = url.pathname;
	
	if(cmd == "/localfile") {
		if(req.method == "POST") {
			
		} else if(req.method == "GET") {
			var query = qs.parse(url.query);
			if(query.filepath) {
				var filepath = query.filepath;
				
				var mtype = m.getType(filepath);
				console.log("mtype ======= " + mtype);
				console.log("filepath ======= " + filepath);
				if(mtype == "video/mp4") {
					// 1. stream 생성
					var stream = fs.createReadStream();
					// 2. stream 전송 이벤트 등록
					var count = 0;
					stream.on('data', function(fragment) { // 데이터를 읽을 수 있는 최소 단위의 조각이 콜백함수를 통해 전달된다.
						count++;
						console.log("count = " + count);
						res.write(fragment);
					});
					// 3. stream 완료 이벤트 등록
					stream.on('end', function() {
						res.end();
					});
					// 4. stream 에러 이벤트 등록
					stream.on('error', function(error) {
						res.end(error);
					});
				} else {
					fs.readFile(filepath.substring(1), function(err, data) {
						if(err) {
							console.log("error ======= " + err);
							res.writeHead(500, {'Content-Type':'text/html'});
						} else {
							console.log("data ======= OK");
							res.writeHead(200, {'Content-Type':mtype});
							res.end(data);
						}
					});
				}
			}
		}
	} else if(cmd == "/html") {
		if(req.method == "POST") {
			
		} else if(req.method == "GET") {
			var query = qs.parse(url.query);
			if(query.filepath) {
				var filepath = query.filepath;
				
				var mtype = m.getType(filepath);
				console.log("mtype ======= " + mtype);
				console.log("filepath ======= " + filepath);
				fs.readFile(filepath.substring(1), function(err, data) {
					if(err) {
						console.log("error ======= " + err);
						res.writeHead(500, {'Content-Type':'text/html'});
					} else {
						console.log("data ======= OK");
						res.writeHead(200, {'Content-Type':mtype});
						res.end(data);
					}
				});
			}
		}
	}
});

var sendHttpResult = function() {
	
};

server.listen(8091, function() {
	console.log("server is running...");
});