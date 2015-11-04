// Function which closes the purchase popup 
function exitPopup(){
		var theDiv = document.getElementById('popup'); 
		theDiv.style.display="none";
         document.getElementById("symbol").value = null;

}

//Show purchase stock popup
function showHide(){
	var buyingPower = document.getElementById("buying_power").innerHTML;
    var stockPrice = document.getElementById("stock_price").innerHTML;

	var theDiv = document.getElementById('popup'); 
    if(theDiv.style.display=="block"){
        theDiv.style.display="none";
        document.getElementById("symbol").value = null;
    }
    else{
        theDiv.style.display="block";
        document.getElementById("popup_buying_power").innerHTML = buyingPower;
        document.getElementById("popup_stock_price").innerHTML = "$ "+stockPrice;
    }    
}

function getSignUpInformation(){
    var firstName = document.getElementById("first_name").value;
    var lastName = document.getElementById("last_name").value;
    var emailAddress = document.getElementById("email_address").value;
    var password = document.getElementById("password").value;

    var xml = new XMLHttpRequest();

    var params = "?" + firstName + "?" + lastName + "?" + emailAddress + "?" + password;

    console.log("First Name: " + firstName);
    console.log("Last Name: " +lastName);
    console.log("Email Address: " + emailAddress);
    console.log("Password: " + password);
    console.log("Total Assets: " + "10,000");
    console.log("Buying Power: " + "10,000");
    console.log("Liquid Assets: " + "0");












    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
           // Action to be performed when the document is read;
        }
    xhttp.open("GET", "Scripts/user_accounts.js" + params, true);
    xhttp.send(params);
}

}
