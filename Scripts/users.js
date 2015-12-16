function test(item){
		item = item.split('\"');        

        var name = (item[4] + " " + item[8]).replace(/[^a-zA-Z\ ]/g,"");
        var email = (item[12]).substring(0,item[12].length - 1);
        var totalPrice = currencyFormat(item[20]);
        var buyingPower = currencyFormat(item[24]);
        var liquidMoney = currencyFormat(item[28]);

        var emailDiv = document.getElementById('userID'); 
        // emailDiv.style.display="none";


        document.getElementById("userID").innerHTML = email;
        document.getElementById("total_price").innerHTML = totalPrice;
        document.getElementById("buying_power").innerHTML = buyingPower;
        document.getElementById("liquid_money").innerHTML = liquidMoney;

  }



function purchaseStock(){

	

	var email = document.getElementById("userID").innerHTML;
	// var name = document.getElementById("")
	var symbol = document.getElementById("symbol").value;
	var purchasePrice = document.getElementById("review_order_price").innerHTML;
	var quantity = document.getElementById("review_order_shares").innerHTML;
	var total = (document.getElementById("total").innerHTML).replace("$","");
	var purchaseDate = getDate();
	
	console.log("SYMBOL: " + symbol); 
	var purchaseDetails = [email,symbol,purchasePrice,quantity,total,purchaseDate];
	console.log(purchaseDetails);

    var socket = io.connect('http://localhost:8080', {transports: ['websocket', 'polling', 'flashsocket']});
      


    sendMessageToServer(purchaseDetails);

     socket.on('message',function(data) {
      console.log('Recived Data' + data);
      
      if(data == 12){

      }
      if(data.length == 2){

      document.getElementById("buying_power").innerHTML = data[1];
      document.getElementById("liquid_money").innerHTML = data[0];

      }

      window.location.reload();
    });




	function sendMessageToServer(message) {
      socket.send(message);
    };
}


function getDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = mm+'/'+dd+'/'+yyyy;
	return today;
}



function currencyFormat (num) {
    return "$" + parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}


function loadPortfolio(item){
		item = item.split('\"');        
        var email = (item[12]).substring(0,item[12].length - 1);
		

        var socket = io.connect('http://localhost:8080', {transports: ['websocket', 'polling', 'flashsocket']});
         
       
      socket.on('connect',function() {
         console.log('LoadPortfolio() Connected');
                  console.log('LoadPortfolio() Connected');


      });

       socket.on('message1',function(data) {
       	console.log("HI: " + data);
    
      
        data = data.split(",");
        totalPrice = (data[0].substring(1,data[0].length));
        liquidMoney = (data[1]);
        buyingPower = data[2].substring(0, data[2].indexOf("]"));


        document.getElementById("total_price").innerHTML =  "$"+totalPrice;
       	document.getElementById("buying_power").innerHTML = "Buying Power: " + buyingPower;
        document.getElementById("liquid_money").innerHTML = "Liquid Money: " + liquidMoney;

       })

      socket.on('messages',function(data) {
	      	var html = "";
		      var initResult = data.split(':"')
		      var result = initResult[1];
		      result = result.substring(0, result.indexOf('"'));

			html = 	'<div class="portfolio_header">Portfolio</div>';
			var url = 'http://query.yahooapis.com/v1/public/yql';

		    for(var i = 1; i < initResult.length; i+=1){
				var result = initResult[i];
				var symbol = result.substring(0, result.indexOf('"'));
							console.log("RESULTS: " +symbol);

			   var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");
			    $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
			        .done(function (data) {
			        	// console.log("DATA: " + JSON.stringify(data));
			        	 var openPrice = data.query.results.quote.LastTradePriceOnly;
			        	  var percentChange = data.query.results.quote.PercentChange;
			        	  var mySymbol = data.query.results.quote.symbol;

			        	percentChange = parseFloat(percentChange);
			        	openPrice = parseFloat(openPrice);
			        	percentChange = parseFloat(Math.round(percentChange * 100) / 100).toFixed(2);
			        	openPrice = parseFloat(Math.round(openPrice * 100) / 100).toFixed(2);
			   
						html += '<div class="portfolio_element">' +
			      	    '<div class="portfolio_symbol">' + mySymbol.toUpperCase() + '</div>' +
			      	    '<div class="portfolio_cost">'+ "$" + openPrice +'</div><div class="portfolio_differential">'+ "% " +percentChange+'</div></div>';
			      	    document.getElementById("portfolio").innerHTML = html;
			    })	   
		    }  			
        });
    
       
        sendMessageToServer(email + "@@@");
        function sendMessageToServer(message) {
        socket.send(message);
        };
  }



