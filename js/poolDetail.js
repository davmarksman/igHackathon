var users = []

users = [ 
{
	userId: 1,
	name: "John Doe",
	image: "images/employees/01.png",
	rep: 100,
	tradingLimit: 15,
	gain: 2,
	invested: "£200"
},
{
	userId: 2,
	name: "Peter Rogers",
	image: "images/employees/02.png",
	rep: 31,
	tradingLimit: 10,
	gain: 6,
	invested: "£300"
},
{
	userId: 3,
	name: "Dibby Jones",
	image: "images/employees/03.png",
	rep: 149,
	tradingLimit: 40,
	gain: 20,
	invested: "£400"
},
{
	userId: 4,
	name: "Nora Ghone",
	image: "images/employees/04.png",
	rep: 290,
	tradingLimit: 35,
	gain: -2,
	invested: "£300"
}];


var gridDataSource = new DevExpress.data.ArrayStore({
	data: users
})

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
            },

	    ]
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