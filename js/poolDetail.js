var users = []

var url = window.location.href;
var index = getValueAtEnd(window.location.href);
if(!index){
	index = 0;
}
var users = dataArray[index].users;

var gridDataSource = new DevExpress.data.ArrayStore({
	data: users
})

function getValueAtEnd(str){
	var split = str.split("=")
    return split[split.length-1];
}

$(function(){
	$("#gridContainer").dxDataGrid({
	    dataSource: gridDataSource,
	    columns: [
	        {
	            dataField: "image",
	            width: 100,
	            allowFiltering: false,
	            allowSorting: false,
	            cellTemplate: function (container, options) {
	                container.addClass("img-container");
	                $("<img />")
	                    .attr("src", options.value)
	                    .appendTo(container);
	            }
	        },
	        "tradingLimit",
	        "name",
	        "invested",
	        {
                dataField: "rep",
                caption: "Reputation",
            },
	        {
                dataField: "gain",
                caption: "Pool Performance",
                cellTemplate: diffcellTemplate,
            }
	    ]
	});

	$("#btnJoin").click(function(){
		$("#joinModal").modal("show");
	});

	$("#btnModalTrade").click(function(){
		window.location.href='trade.html';
	});
	$("#btnTrade").click(function(){
		window.location.href='trade.html';
	});
});


function diffcellTemplate(container, options) {
    container.html(options.text);
    if (options.data.gain >= 0) {
        container.addClass("cell-green");
    } else {
        container.addClass("cell-red");
    }
}



