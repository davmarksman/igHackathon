var dataArray = [
	{
		poolId: 1,
		name: "IG",
		users: [ 
			{
				userId: 1,
				userName: "John Doe",
				image: "/images/employees"
			},
			{
				userId: 2,
				userName: "James Fickle",
				image: "/images/employees/02.png"
			}
		]
	},
	{
		poolId: 2,
		name: "Hello World",
		users: [ 
			{
				userId: 1,
				userName: "John Doe",
				image: "/images/employees/01.png"
			},
			{
				userId: 3,
				userName: "Nora Ghone",
				image: "/images/employees/03.png"
			},
			{
				userId: 4,
				userName: "Dibby Jones",
				image: "/images/employees/04.png"
			}
		]
	}
]

var gridDataSource = new DevExpress.data.ArrayStore({
	data: dataArray
})

$(function(){

//	$.ajax({
//	    url: "/pools",
	 
	    // The name of the callback parameter, as specified by the YQL service
//	    jsonp: "callbackFn",
	 
	    // Tell jQuery we're expecting JSONP
//	    dataType: "jsonp",
	 
	    // Work with the response
//	    success: function( response ) {
//	        console.log( response ); // server response
//	    }
//	});

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


function jasonp(){
	$.ajax({
	    url: "http://globalmaster.xignite.com/xglobalmaster.json/GetMasterByExchange?Exchange=XNAS&StartSymbol=A&EndSymbol=B&InstrumentClass=Stock&AsOfDate=9/15/2016&_callback=callbackFn",
	 
	    // The name of the callback parameter, as specified by the YQL service
	    jsonp: "callbackFn",
	 
	    // Tell jQuery we're expecting JSONP
	    dataType: "jsonp",
	 
	    // Work with the response
	    success: function( response ) {
	        console.log( response ); // server response
	    }
	});
}
