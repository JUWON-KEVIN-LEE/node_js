// 1. 서버 모듈(라이브러리)을 import
var http = require('http');

// favicon 때문에 2번 호출
var server = http.createServer(function(request, response) {
	
	var array = request.url.split("/");
	response.writeHead(200, {'Content-Type':'text/html'});
	
	if(array.length < 3) {
		response.end("<h>wrong request</h>");
	} else {
		if(array[1] == "fibonacci") {
			if(!isNaN(array[2]))
				response.end(get(array[2]));
			else
				response.end("<h>enter number</h>");
		} else if(array[1] == "anagram") {
			
		} else {
			response.end("<h>No service here</h>");
		}
	}
	
});

server.listen(8089);
console.log('Server running');

function get(param) {
	var result = "";
	
	var tmp1 = 0;
	var tmp2 = 0;
	var tmp3 = 1;
	
	for(var i=0; i<param; i++) {
		if(i == 0) {
			result += 0+"</br>";
			continue;
		} else if(i == 1) {
			result += 1+"</br>";
			continue;
		}
		
		tmp1 = tmp2;
		tmp2 = tmp3;
		tmp3 = tmp1 + tmp2;
		
		result += tmp3 + "</br>"
	}
	return result;
}