var dao = require("../c_dao/bbs");

exports.read = function(req, res, search) {
	var query = {};
	if( search.type === "all" ) {
		query = {};
	} else if( search.type === "no" ) {
		query = {no : -1};
		query.no = parseInt(search.no);
	}
	
	dao.read(query, function(dataset) {
		console.log(dataset);
		res.end("");
	})
}

exports.create = function(req, res, bbs) {
	dao.create(bbs, function(result_code) {
		
		var message = "";
		if(result_code == 400) {
			message = "Error...";
		} else if(result_code == 200) {
			message = "insert ok...";
		}
		
		var result = {
			code : result_code,
			msg : message
		};
		
		res.end(result);
	});
}

exports.update = function(req, res, bbs) {
	
}

exports.delete = function(req, res, bbs) {
	
}