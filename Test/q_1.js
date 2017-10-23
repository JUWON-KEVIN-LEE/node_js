var limit = 100;

var temp = new Array(3);
temp[0] = 0;
temp[1] = 1;
temp[2] = temp[0] + temp[1];

console.log(0);
console.log(1);
for(var i=0; i<limit-2; i++) {
	console.log(temp[2]);
	temp[0] = temp[1];
	temp[1] = temp[2];
	temp[2] = temp[0] + temp[1];
}

/*
function f(param) {
	if(param == 0) {
		return 0;
	} else if(param == 1) {
		return 1;
	}
	
	return f(param-2) + f(param-1);
}
*/