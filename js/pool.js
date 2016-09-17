

var gridDataSource = new DevExpress.data.ArrayStore({
	data: dataArray
})

$(function(){


	$("#gridContainer").dxDataGrid({
	    dataSource: gridDataSource,
	    paging: {
	        pageSize: 20
	    },
	    pager: {
	        showPageSizeSelector: true,
	        allowedPageSizes: [5, 10, 20],
	        showInfo: true
	    },
	    columns: [
	    	"name", 
            {
                dataField: "poolId",
                name: "Join",
                cellTemplate: function (container, options) {
                    createLink(container, "Join " + options.data.name, "/join?pool=" + options.data.poolId);
                }
            }
	    ]
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
	dataArray.length =0;
	dataArray.push.apply(dataArray, data);

	$("#gridContainer").dxDataGrid("instance").refresh();
	console.log(data);
}
