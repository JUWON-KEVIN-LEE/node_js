var a = 11;
console.log(a);

for(var i=0; i<10; i++){
	console.log(i);
}

if(a > 10) {
	console.log("a > 10");
}

var a = 10;
var b = 5;

function sum(param1, param2) {
	console.log( param1 + param2 );
}

var sum = function(param1, param2) {
	return param1 + param2;
};

sum(a, b);

function Num(param1, param2) {
	var a = 10; // private
	this.b = 10; // public
	
	this.c = function(param1, param2) {
		
	}
}

var num = new Num("Hello", "World"); // code 를 num 에 담아준다

num.b = 500;
num.c("a", 100);