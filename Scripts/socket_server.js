var http = require('http');
var io = require('socket.io');
var port = 8080;

// Start the server at port 8080
var server = http.createServer(function(req, res){ 
    // Send HTML headers and message
    res.writeHead(200,{ 'Content-Type': 'text/html' }); 
    res.end('<h1>Hello Socket Lover!</h1>');
});

server.listen(port)
// Create a Socket.IO instance, passing it our server
var socket = io.listen(server);


// Add a connect listener
socket.on('connection', function(client){ 
    console.log('Connection to client established');

    // Success!  Now listen to messages to be received
    client.on('message',function(event){ 

    var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    assert = require('assert');

	var db = new Db('test', new Server('localhost', 27017));
	db.open(function(err, db) {
	var collection = db.collection("users");



	// ******************************************************************************
	// 									Confirm Login
	// ******************************************************************************
    if(event.length == 2){
    	setTimeout(function() {

		collection.find({emailAddress:event[0]}, {_id:0}).toArray(function(err, item) {
					

					item = JSON.stringify(item);
					console.log(item);

					var firstName = item.match('firstName":"(.*)","lastName');
					var lastName = item.match('lastName":"(.*)","emailAddress');
					var email = item.match('emailAddress":"(.*)","password');
					var password = item.match('password":"(.*)","totalPrice');
					var totalPrice = item.match('totalPrice":(.*),"buyingPower');
					var buyingPower = item.match('buyingPower":(.*),"liquidMoney');
					var liquidMoney = item.match('liquidMoney":(.*)}]');

					var userLogin = {
						firstName: firstName[1],
						lastName: lastName[1],
						email: email[1],
						password: password[1],
						totalPrice: totalPrice[1],
						buyingPower: buyingPower[1],
						liquidMoney: liquidMoney[1]
					};
					
					  // Successful Login Attempt
					  if(password[1] == event[1]){
					  	socket.emit("message",userLogin);
					  	console.log("*** SUCCESSFUL LOGIN ***");
					  }

					  // Failed Login Attempt
					  else{
					  	socket.emit("message","*** LOGIN FAILED ***");
					  	console.log("*** LOGIN FAILED ***")
					  }

				      db.close();
		})
	  }, 100);
    }


    // ******************************************************************************
	// 									Add New User
	// ******************************************************************************
    else if(event.length == 7){
    		collection.insert(
			  {
			  	firstName: event[0],
			  	lastName: event[1],
			  	emailAddress: event[2],
			  	password: event[3],
			  	totalPrice: event[4],
			  	buyingPower: event[5],
			  	liquidMoney: event[6]
			  })

					
				  console.log("******* USER DATABASE *********");
				  setTimeout(function() {

				      collection.find({}).toArray(function(err, item) {
				      console.log(item);
				      db.close();
				    })
	  }, 100);
    }

    else{
    	console.log("ERROR ERROR AWKWARD INPUT");
    }

    });

    console.log('Received message from client!',event);
    });

    // client.on('disconnect',function(){
    //     clearInterval(interval);
    //     console.log('Server has disconnected');
    // });
});

console.log('Server running at http://127.0.0.1:' + port + '/');