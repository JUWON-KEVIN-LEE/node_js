// db/index.js
// db CRUD
var mongo = require("mongodb").MongoClient;
var dbname = "bbsdb";
var url = "mongodb://localhost:27017/" + dbname;
var table = "bbs";


/*
	bbs = {
		no : 3 ,
		title : "제목" ,
		content : "내용" ,
		date : "2017/10/26 11:21:30" ,
		author : "root"
	}
	
	search = {
		type : "all" ,
		no : 12 ,
		title : "제목검색" ,
		content : "내용검색" ,
		date : "날짜검색" ,
		author : "사용자 아이디로 검색"
	}

exports.bbs = function(){
	no : -1,
	title : "",
	content : "",
	date : "" ,
	author : ""
	
	this.toQuery = function() {
		var bbs = {
			no : -1,
			title : "",
			content : "",
			date : "" ,
			author : ""};
			
		return bbs;
	}
}
*/

exports.create = function(bbs, callback) {
	mongo.connect(url, function(err, db) {
		db.collection(table).insert(bbs, function(error, inserted) {
			if(error) {
				callback(400);
			} else {
				callback(200);
			}
			db.close();
		});
	});
}

exports.read = function(search, callback) {
	mongo.connect(url, function(err, db) {
		var cursor = db.collection(table).find(search);
		cursor.toArray(function(err, doc) {
			if(err) {
				console.log(err);
			} else {
				callback(doc);
				console.log("read ok...");
			}
			db.close();
		});
	});
}

exports.update = function(bbs) {
	mongo.connect(url, function(err, db) {
		// 1. 수정대상 쿼리
		var query = {_id:-1};
		query._id = bbs._id;
		// 2. 데이터 수정명령 - 실제 변경될 컬럼 이름과 값
		var operator = bbs;
		delete operator._id;
		
		// 3. 수정옵션 - upsert ; update + insert( 없으면 )
		var option = { upsert:true }
		db.collection.update(query, operator, option, function(err, upserted) {
			if(err) {
				
			} else {
				// 정상 처리
			}
			db.close();
		});
	});
}

exports.delete = function(bbs) {
	mongo.connect(url, function(err, db) {
		// 1. 수정대상 쿼리
		var query = {no:137};
		
		db.collection(table).remove(query, function(err, removed) {
			if(err) {
				
			} else {
				
			}
		});
	});
}











