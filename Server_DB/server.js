var http = require('http');
var mongo = require('mongodb').MongoClient;
var u = require('url');
var qs = require('querystring');

var server = http.createServer(function(req, res) {
	var url = u.parse(req.url);
	var cmd = url.pathname.substring(1);
	
	if(cmd == "sign_in") {
		// post 로 넘어온 데이터를 읽는다
		var postdata = "";
		req.on('data', function(data) {
			postdata += data;
		});
		
		// 모두 읽으면 변수와 값을 분리해서 처리한다
		req.on('end', function() {
			var query = JSON.parse(postdata); // postdata = id : "xxx", pw : "12312", ...
			// var query = qs.parse(postdata); // postdata = id=xxx&pw=12312, ...
			console.log("[query]");
			console.log(query);
			/*
			query = {
				id : "xxx",
				pw : "12312"
				...
			}
			*/
			if(!query.id || !query.pw) {
				console.log("no id and pw");
			} else {
				// mongo db 주소 구조 = 프로토콜://주소:포트/데이터베이스 이름 > db 변수에 전달
				mongo.connect("mongodb://localhost:27017/testdb", function(error, db) {
					if(error) {
						res.write(error);
					} else {
						// db 검색
						// json <<<>>> javascript 일대일 매칭 구조
						var result = "";
						var cursor = db.collection('users').find(query);
						// forEach : 동기 / each : 비동기
						cursor.toArray(function(err, dataset) {
							if(dataset.length > 0) {
								result = "OK";
							}
						});
						
						
						// db.collection('users').insert({name:"hong", age:19});
					}
					res.end("");
				})
			}
		});
	} else {
		res.end("page not found");
	}
})

server.listen(8090, function() {
	console.log("server is running...");
})