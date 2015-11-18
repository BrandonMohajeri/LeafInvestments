//WHEN YOU ADD A NEW USER
function getElements(){
// Create SocketIO instance, connect

    var socket = io.connect('http://localhost:8080', {transports: ['websocket', 'polling', 'flashsocket']});

    // socket.connect('http://localhost:8080');
    var firstName = document.getElementById("first_name").value;
    var lastName = document.getElementById("last_name").value;
    var emailAddress = document.getElementById("email_address").value;
    var password = document.getElementById("password").value;
    var newUser = [firstName, lastName, emailAddress, password, 10000, 10000, 0];

    // Add a connect listener
    socket.on('connect',function() {
      console.log('Client has connected to the server!')

    });
    // Add a connect listener
    socket.on('message',function(data) {
      console.log('Received a message from the server!',data);
    });
    // Add a disconnect listener
    socket.on('disconnect',function() {
      console.log('The client has disconnected!');
    });


    sendMessageToServer(newUser);

    // Sends a message to the server via sockets
    function sendMessageToServer(message) {
      socket.send(message);
    };
}

  function userLogin(){
    var socket = io.connect('http://localhost:8080', {transports: ['websocket', 'polling', 'flashsocket']});


    var email = document.getElementById("userEmail").value;
    var password = document.getElementById("userPassword").value;

    var credentials = [email, password];

    sendMessageToServer(credentials);

     // Add a connect listener
    socket.on('connect',function() {
      console.log('Client has connected to the server!')

    });
    // Add a connect listener
    socket.on('message',function(data) {
      console.log('Received a message from the server!',data);
    });
    // Add a disconnect listener
    socket.on('disconnect',function() {
      console.log('The client has disconnected!');
    });

     // Sends a message to the server via sockets
    function sendMessageToServer(message) {
      socket.send(message);
    };
  }