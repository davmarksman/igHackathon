var users = []

users = [ 
{
	userId: 1,
	name: "John Doe",
	image: "/images/employees/01.png"
},
{
	userId: 3,
	name: "Nora Ghone",
	image: "/images/employees/03.png"
},
{
	userId: 4,
	name: "Dibby Jones",
	image: "/images/employees/04.png"
}];

$("#gridContainer").dxDataGrid({
    dataSource: gridDataSource,
    columns: ["name", "instrument.expiry", "snapshot.bid", "snapshot.offer",
        {
            dataField: "instrument",
            name: "trade",
            cellTemplate: function (container, options) {
                createPopupLink(container, "Trade", options.data);
            }
        }
    ]
});