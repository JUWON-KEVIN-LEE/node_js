//외부 파일 사용하기
var db = require("./db")
/*
var bbs = {
	no : 1 ,
	title : "제목" ,
	content : "내용" ,
	date : "2017/10/26 12:11:23" ,
	author : "me"
};

db.create(bbs, function(answer) {
	console.log(answer);
});
*/

var search = {
	type : "no" ,
	no : 1
}

db.read(search, function(dataset) {
	console.log("[for]");
	for(key in dataset) {
		console.log(dataset[key]);
	}
	
	console.log(" ");
	
	console.log("[forEach]");
	dataset.forEach(function(item) {
		console.log(item);
	});
})

db.readOne(search, function(dataset) {
	if(dataset.length > 0) {
		// 서버에서 수정할 데이터 조회
		var bbs = dataset[0];
		var jsonString = JSON.stringify(bbs);
		
		// ... networking
		
		// ---------- 안드로이드 ----------
		var json = JSON.parse(jsonString);
		json.title = "수정했습니다";
		var jsonStringForNetworking = JSON.stringify(json);
		// ---------- 안드로이드 ----------
		
		// ... networking
		
		// > 서버
		var completed = JSON.parse(jsonStringForNetworking);
		db.update(completed);
	}
});