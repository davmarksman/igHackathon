
$(function(){
	var i = 1;

	for(i = 0; i < 12; i++){
		$("#btn" + i).children(".poolname").html(dataArray[i].name);
		$("#btn" + i).children(".amount").html(dataArray[i].amount);
		$("#btn" + i).children(".investors").html(dataArray[i].investors);
		$("#btn" + i).children(".gain").html(dataArray[i].gain + "%");
	}

	$("#btn0").on("click", function(){
		window.location.href='PoolDetails.html?id=0';
	});
	$("#btn1").on("click", function(){
		window.location.href='PoolDetails.html?id=1';
	});
	$("#btn2").on("click", function(){
		window.location.href='PoolDetails.html?id=2';
	});
	$("#btn3").on("click", function(){
		window.location.href='PoolDetails.html?id=3';
	});
	$("#btn4").on("click", function(){
		window.location.href='PoolDetails.html?id=4';
	});
	$("#btn5").on("click", function(){
		window.location.href='PoolDetails.html?id=5';
	});
	$("#btn6").on("click", function(){
		window.location.href='PoolDetails.html?id=6';
	});
	$("#btn7").on("click", function(){
		window.location.href='PoolDetails.html?id=7';
	});
	$("#btn8").on("click", function(){
		window.location.href='PoolDetails.html?id=8';
	});
	$("#btn9").on("click", function(){
		window.location.href='PoolDetails.html?id=9';
	});
	$("#btn10").on("click", function(){
		window.location.href='PoolDetails.html?id=10';
	});
	$("#btn11").on("click", function(){
		window.location.href='PoolDetails.html?id=11';
	});
	$("#btnCreatePool").on("click", function(){
		showResultModal("Sorry this function is not yet here.");
	});
});

function createLink(container, text, hyperlink) {
    return $("<a/>")
        .addClass("dx-link")
        .text(text)
        .attr("href", hyperlink)
        .appendTo(container);
}

function callbackFn(data){
	dataArray.length = 0;
	dataArray.push.apply(dataArray, data);

	$("#gridContainer").dxDataGrid("instance").refresh();
	console.log(data);
}

