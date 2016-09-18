
$(function(){
	var i = 1;

	for(i = 0; i < 12; i++){
		$("#btn" + i).children(".poolname").html(dataArray[i].name);
		$("#btn" + i).children(".amount").html(dataArray[i].amount);
		$("#btn" + i).children(".investors").html(dataArray[i].investors);
		$("#btn" + i).children(".gain").html(dataArray[i].gain + "%");
	}

	setTimeout(function(){ 
		$("#myModal").modal("show");
	}, 2 * 1000);

	$('#market_up').click(function () {;
		showResultModal("Well done. +1 Rep!");
	});
	$('#market_ok').click(function () {;
		showResultModal("Safe bet. But wrong this time.");
	});
	$('#market_down').click(function () {;
		showResultModal("Sorry. Maybe next time.");
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

function showResultModal(text) {
		$("#myModal").modal("hide");
		$("#txtResult").html(text);
		$("#resultModal").modal("show");
	}
