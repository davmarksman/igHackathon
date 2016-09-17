
var urlRoot = "https://web-api.ig.com/gateway/deal";
var apiKey = "162d2c801b4583e76cee168cfda2ba26df25e159";
var client_token ="7c68b6b7f0dc2cb544cbf7e61242431deb3083ed165a1501eb1722c2cc45095101111";
var account_token = "4e95a4423139c4b91e04180d24a90496ed079ac08ea7c705a612b183af08fb7d01111";

var dataArray = []

var gridDataSource = new DevExpress.data.ArrayStore({
	data: dataArray
})

$(function(){
	$("#myModal").modal("show");

	$('#place_trade_button').click(function () {
	   placeTrade();
	});


	$('#sell_button').click(function () {
	   $('#sell_button').addClass("glowing-border-on");
	   $('#sell_button').removeClass("glowing-border-off");
	   $('#buy_button').addClass("glowing-border-off");
	   $('#buy_button').removeClass("glowing-border-on");

	   $('#trade_direction').val("-");
	});

	$('#buy_button').click(function () {
	   $('#buy_button').addClass("glowing-border-on");
	   $('#buy_button').removeClass("glowing-border-off");
	   $('#sell_button').addClass("glowing-border-off");
	   $('#sell_button').removeClass("glowing-border-on");

	   $('#trade_direction').val("+");
	});

//	$.ajax({
//	    url: url
//
//	    // The name of the callback parameter, as specified by the YQL service
//	    jsonp: "callbackFn",
//	 
//	    // Tell jQuery we're expecting JSONP
//	    dataType: "jsonp",
//	 
//	    // Work with the response
//	    success: function( response ) {
//	        console.log( response ); // server response
//	    }
//	});

//
//	   expiry : $('#trade_expiry').val(),
//	   size : $('#trade_size').val(),
//	   tradeBid : $('#trade_bid').val(),
//	   tradeOffer:  $('#trade_offer').val(),
//	   direction: $('#trade_direction').val(),

	$("#gridContainer").dxDataGrid({
	    dataSource: gridDataSource,
	    paging: {
	        pageSize: 10
	    },
	    pager: {
	        showPageSizeSelector: true,
	        allowedPageSizes: [5, 10, 20],
	        showInfo: true
	    },
	    columns: ["instrument.name", "instrument.expiry", "snapshot.bid", "snapshot.offer",
            {
                dataField: "instrument",
                name: "trade",
                cellTemplate: function (container, options) {
                    createPopupLink(container, "Trade", options.data);
                }
            }

	    ]
	});

	getTrades();
});

function updateTable(data){
	dataArray.length =0;
	dataArray.push.apply(dataArray, data);

	$("#gridContainer").dxDataGrid("instance").refresh();
	console.log(data);
}

function getTrades(){

   var req = {};
   req.method = "GET";
   req.url = urlRoot + "/markets?epics=CS.D.BITCOIN.TODAY.IP%2CCS.D.EURGBP.TODAY.IP%2CCS.D.USCGC.TODAY.IP%2CEN.D.LCO.Month2.IP%2CMT.D.SI.Month1.IP%2CCS.D.COPPER.TODAY.IP%2CCS.D.GBPUSD.TODAY.IP%2CCS.D.AUDUSD.TODAY.IP";

   // Set up the request headers, i.e. the api key, the account security session token, the client security token, 
   // the request content type (JSON), and the expected response content type (JSON)      
   req.headers = {
      "X-IG-API-KEY": apiKey,
      "X-SECURITY-TOKEN": account_token,
      "CST": client_token,
      "Content-Type": "application/json; charset=UTF-8",
      "Accept": "application/json; charset=UTF-8"
   };

    try {
      $.ajax({
         type: req.method,
         url: req.url,
         data: req.body,
         headers: req.headers,
         async: false,
         mimeType: req.binary ? 'text/plain; charset=x-user-defined' : null,
         error: function (response, status, error) {
            // Something went wrong
            handleHTTPError(response);
         },
         success: function (response, status, data) {
         	console.log(response);
			updateTable(response.marketDetails);
         }
      });
   } catch (e) {
      handleException(e);
   }
}

function createPopupLink(container, text, row) {
	// "instrument.name", "instrument.expiry", "snapshot.bid", "snapshot.offer",
    var element = $("<a/>")
        .addClass("dx-link")
        .text(text)
        .appendTo(container);

    element.on("click", function(){
	   	$('#dealTicket').modal('show');
		$('#trade_epic').val(row.instrument.epic);
		$('#trade_expiry').val(row.instrument.expiry);
		//$('#trade_size').val();
		$('#trade_bid').val(row.snapshot.bid);
		$('#trade_offer').val(row.snapshot.offer);
		$('#ticket_buy_price').text(row.snapshot.offer);
   		$('#ticket_sell_price').text(row.snapshot.bid);
		//$('#trade_direction').val("-");
    })

    return element;
}

// Using YQL and JSONP
//function jasonp(){
//	$.ajax({
//	    url: "http://globalmaster.xignite.com/xglobalmaster.json/GetMasterByExchange?Exchange=XNAS&StartSymbol=A&EndSymbol=B&InstrumentClass=Stock&AsOfDate=9/15/2016&_callback=callbackFn",
//	 
//	    // The name of the callback parameter, as specified by the YQL service
//	    jsonp: "callbackFn",
//	 
//	    // Tell jQuery we're expecting JSONP
//	    dataType: "jsonp",
//	 
//	    // Work with the response
//	    success: function( response ) {
//	        console.log( response ); // server response
//	    }
//	});
//}

/*
 * Function to create an OTC position
 */
function placeTrade() {

   // Hide the deal ticket as it's no longer required
   $('#dealTicket').modal('hide');

   // Get the market, deal size, and direction from the deal ticket
   // TODO remove bid and offer from the API
   var trade = {
	   epic : $('#trade_epic').val(),
	   expiry : $('#trade_expiry').val(),
	   size : $('#trade_size').val(),
	   tradeBid : $('#trade_bid').val(),
	   tradeOffer:  $('#trade_offer').val(),
	   direction: $('#trade_direction').val(),
	}

   var trade2 = {
	    "epic": "CS.D.BITCOIN.TODAY.IP",
	    "expiry": "DFB",
	    "direction": "BUY",
	    "size": "0.005",
	    "orderType": "MARKET",
	    "timeInForce": null,
	    "level": null,
	    "guaranteedStop": "false",
	    "stopLevel": null,
	    "stopDistance": null,
	    "trailingStop": null,
	    "trailingStopIncrement": null,
	    "forceOpen": "false",
	    "limitLevel": null,
	    "limitDistance": null,
	    "quoteId": null,
	    "currencyCode": "GBP"
	}

   // Create a POST request to /positions/otc

   var req = {};
   req.method = "POST";
   req.url = urlRoot + "/positions/otc";

   // Set up the request headers, i.e. the api key, the account security session token, the client security token, 
   // the request content type (JSON), and the expected response content type (JSON)      
   req.headers = {
      "X-IG-API-KEY": apiKey,
      "X-SECURITY-TOKEN": account_token,
      "CST": client_token,
      "Content-Type": "application/json; charset=UTF-8",
      "Accept": "application/json; charset=UTF-8",
      "Version": "1"
   };

   // Set up the request body
   var bodyParams = {};
   bodyParams["currencyCode"] = "GBP";
   bodyParams["epic"] = trade2.epic;
   bodyParams["expiry"] = trade2.expiry;
   bodyParams["direction"] = trade2.direction; //(direction == "+" ? "BUY" : "SELL");
   bodyParams["size"] = trade2.size;
   bodyParams["forceOpen"] = false;
   bodyParams["guaranteedStop"] = false;
   bodyParams["orderType"] = "MARKET";
//
   req.body = JSON.stringify(bodyParams);
   //req.body = trade2;

   // Prettify the request for display purposes only
   //$("#request_data").text(js_beautify(req.body) || "");

   // Send the request via a Javascript AJAX call
   var resultData;
   try {
      $.ajax({
         type: req.method,
         url: req.url,
         data: req.body,
         headers: req.headers,
         async: false,
         mimeType: req.binary ? 'text/plain; charset=x-user-defined' : null,
         error: function (response, status, error) {
            // Something went wrong
            handleHTTPError(response);
         },
         success: function (response, status, data) {
            // The order was created
            // Prettify and log the response
            //$("#response_data").text(js_beautify(data.responseText) || "");
            console.log("order placed");
            alert("order placed: " + response.dealReference);
            resultData = response;
         }
      });
   } catch (e) {
      handleException(e);
   }

   // If the deal was placed, wait for the deal confirmation
   if (resultData) {
      console.log(resultData);
   }
}


