var popTops;


/* 
* accepts "config" for topping configurations or
* "topping" for individual toppings
*/
var pizzaInit = function(url, param){
	popTops = {};
	/*
	* js can't access local JSON files, so I'm grabbing it
	* from my github via ajax
	*/
	$.ajax({
		dataType: "json",
		url: url,
		success: function(data){
			pizzaSort(data, param)
		}
	});
}

var pizzaSort = function(json, param){
	for (i = 0; i < json.length; i++){
		if (param === "config"){
			/*
			* sort each toppings config array so that 
			* ["a", "b"] === ["b", "a"];
			*/
			var curTop = json[i].toppings.sort();
			compareToppings(curTop);
			var topsAsc = sortAsc();
		}
		else if (param === "topping"){
			var curTop = json[i].toppings
			for (j = 0; j < curTop.length; j++){
				var singleTop = curTop[j];
				compareToppings(singleTop);
				var topsAsc = sortAsc();
			}
		}
	}
	console.log(popTops);
	topTwenty(topsAsc, param);
}


var compareToppings = function(curTop){
	if (popTops[curTop] === undefined){
		//new topping found, add it to popTops
		popTops[curTop] = 1;
	}
	else{
		//we've seen this topping, increment it's counter
		popTops[curTop] = popTops[curTop] + 1;
	}
}

var sortAsc = function(){
	var asc = [];
	for (var topping in popTops) {
		asc.push([topping, popTops[topping]])
	}

	asc.sort(function(a, b){
		return a[1] - b[1];
	});

	return asc;
}

var topTwenty = function(tops, param){
	for (i = 0; i < 20; i++){	
		var nextTop = tops.pop();
		$('table.' + param).append("<tr><td>" + nextTop[0] + "</td><td>" + nextTop[1] + "</td></tr>");
	}
}


$(function(){

	$('.popular-configs').click(function() {
		pizzaInit("http://ahoy1.github.io/misc/pizzas.json", "config");
		//unbind click function 
		$(this).unbind("click");
	});

	$('.popular-toppings').click(function() {
		pizzaInit("http://ahoy1.github.io/misc/pizzas.json", "topping");
		//unbind click function 
		$(this).unbind("click");
	});
});


