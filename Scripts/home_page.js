// Function to close 'purchase' popup
function exitPopup(){
		var theDiv = document.getElementById('popup'); 
		theDiv.style.display="none";
}

// Function to close 'review order' popup
function exitReviewOrder(){
        var theDiv = document.getElementById('review_order'); 
        theDiv.style.display="none";
}


//Function to show 'purchase stock' popup
function showHide(){
	var buyingPower = document.getElementById("buying_power").innerHTML;
    var stockPrice = document.getElementById("stock_price").innerHTML;

	var theDiv = document.getElementById('popup'); 
    if(theDiv.style.display=="block"){
        theDiv.style.display="none";
    }
    else{
        theDiv.style.display="block";
        document.getElementById("popup_buying_power").innerHTML = buyingPower;
        document.getElementById("popup_stock_price").innerHTML = "$ "+stockPrice;
    }    
}

//Function to displsy the 'review order' popup
function reviewOrder(){

    var companyName = document.getElementById("company_name").innerHTML;
    var shares = document.getElementById("shares").value;
    var price = document.getElementById("stock_price").innerHTML;
    var total = parseInt(price) * parseInt(shares);

    var theDiv=document.getElementById("review_order");

     if(theDiv.style.display=="block"){
        theDiv.style.display="none";
    }
    else{
        theDiv.style.display="block";
        document.getElementById("review_order_company_name").innerHTML = companyName;
        document.getElementById("review_order_shares").innerHTML = shares;
        document.getElementById("review_order_price").innerHTML = price;
        document.getElementById("total").innerHTML = "Total: $" + total;
    }    
}

function getSignUpInformation(){Request();}