
$(function(){
	var i = 1;

	for(i = 0; i < 12; i++){
		$("#btn" + i).children(".poolname").html(dataArray[i].name)
		$("#btn" + i).children(".amount").html(dataArray[i].amount)
		$("#btn" + i).children(".investors").html(dataArray[i].investors)
		$("#btn" + i).children(".gain").html(dataArray[i].gain + "%")
	}
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
