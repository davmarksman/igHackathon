var users = []


users = [ 
{
	userId: 1,
	name: "John Doe",
	image: "images/employees/01.png"
},
{
	userId: 3,
	name: "Nora Ghone",
	image: "images/employees/03.png"
},
{
	userId: 4,
	name: "Dibby Jones",
	image: "images/employees/04.png"
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
	        "name"
	    ]
	});
});