// ******************************************************************
//                Server Communication w/ User Sign Up
// ******************************************************************
 

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
      console.log('Received a message from the server: ',data);
      if (data == 1){
        alert("User Already Exists");
      }

    });
    // Add a disconnect listener
    socket.on('disconnect',function() {
      console.log('The client has disconnected!');
    });

    // Check values for user login. 
    var invalidField = 1;
    var invalidEmail = 1;
    var invalidPassword = 1;

    if(firstName != '' || lastName != '' || emailAddress != '' || password != ''){invalidField = 0;}
    if(emailAddress.includes("@")){invalidEmail = 0;}

    if(password.length >= 8){invalidPassword = 0}
   
    if(invalidField == 1 || invalidPassword == 1 || invalidEmail == 1){
      if(invalidField == 1){alert("Error: Missing Fields")}
      else if(invalidPassword == 1){alert("Error: Password Must Be at Least 8 Characters")}
      else if(invalidEmail == 1){alert("Error: Invalid Email Address")}
    }
    else{sendMessageToServer(newUser)};

    // Sends a message to the server via sockets
    function sendMessageToServer(message) {
      socket.send(message);
    };
}


// ******************************************************************
//                    Server Communication w/ Login
// ******************************************************************
function userLogin(){
    var socket = io.connect('http://localhost:8080', {transports: ['websocket', 'polling', 'flashsocket']});


    var email = document.getElementById("userEmail").value;
    var password = document.getElementById("userPassword").value;
    console.log(email);
    var credentials = [email, password];

    sendMessageToServer(credentials);

    socket.on('connect',function() {
      console.log('Client has connected to the server!')

    });

    socket.on('message',function(data) {
      console.log('Received a message from the server  :  ',data);

      if(data == 0){alert("Invalid Login");}
      else{
        data = JSON.stringify(data, null, 4);
        window.open("home_page.html" ,"_self");
        sessionStorage.setItem("sent", data); 
        sessionStorage.setItem("email", email);  
      }
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





