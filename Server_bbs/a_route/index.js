var u = require("url");
var qs = require("querystring");
var c = require("../b_controller");

exports.process = function(req, res) {
	var url = u.parse(req.url);
	var cmd = url.pathname.substring(1);
	var method = req.method.toLowerCase();
	
	if(cmd == "bbs") {
		if( method == "get") {
			var query = qs.parse(url.query);
			c.read(req, res, query);
		} else {
			var body = "";
			req.on("data", function(data) {
				body += data;
			});
			// 데이터 로딩이 완료되면 각 method 로 분기
			req.on("end", function() {
				var bbs = JSON.parse(body);
				if( method == "post" ) {
					c.create(req, res, bbs);
				} else if( method == "put" ) {
					c.update(req, res, bbs);
				} else if( method == "delete" ) {
					c.delete(req, res, bbs);
				}
			});
		}
	} else {
		
	}
}