// 1. 서버 모듈 가져오기
var http = require('http');
var url = require('url');
var qs = require("querystring");

// 2. 서버 생성하기
var server = http.createServer(function(req, res) {
	var parsedUrl = url.parse(req.url);
	console.log(parsedUrl);
	
	var parsedQuery = qs.parse(parsedUrl.query);
	console.log(parsedQuery);
	
	res.end("value of 'aaa' is "+parsedQuery.aaa);
});

// 3. 서버 실행하기
server.listen(8089, function() {
	console.log("server is running...");
});

/*

// javascript 의 object
var request = {
	one : 157,
	two : "hello",
	three : 5,
	
	sum : function() {
		return this.one + this.three;
	}
};

console.log(request.one);
console.log(request.two);
console.log(request.sum());

var fibonacci = {
	count : 2,
	run : function() {
		result = "";
		prev = 0;
		result += prev + ",";
		next = 1;
		result += next + ",";
		for(var i=0; i<this.count; i++) {
			sum = prev + next;
			result += sum + ",";
			prev = next;
			next = sum;
		}
		
		return result;
	}
}

*/