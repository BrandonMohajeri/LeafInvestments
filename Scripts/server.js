// Funtion to scrape stock information
function httpGetAsync() {
    var symbol = document.getElementById("symbol").value;
    var url = 'http://query.yahooapis.com/v1/public/yql';
    var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");

    $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
        .done(function (data) {
            var companyName = data.query.results.quote.Name;
            var openPrice = data.query.results.quote.LastTradePriceOnly;
            var percentChange = data.query.results.quote.PercentChange;
            var dailyLow = data.query.results.quote.DaysLow;
            var dailyHigh = data.query.results.quote.DaysHigh;
            var yearLow = data.query.results.quote.YearLow;
            var yearHigh = data.query.results.quote.YearHigh;
            var volume = data.query.results.quote.Volume;
            var averageVolume = data.query.results.quote.AverageDailyVolume;
            var marketCapital = data.query.results.quote.MarketCapitalization;
            var peRatio = data.query.results.quote.PERatio;
            var dividendShare = data.query.results.quote.DividendShare;
            var dividendYield = data.query.results.quote.DividendYield;
            var divYield = dividendShare + ' (' + dividendYield + ")"

             if(volume != null && averageVolume != null){
                    volume=parseInt(volume,10)
                    volume=nFormatter(volume,1);
                    averageVolume=parseInt(volume,10)
                    averageVolume=nFormatter(volume,1);
                }

            // Display stocks on HTML page
            $("#statistics").html(companyName);    
            $("#company_name").html(companyName);    
            $("#stock_price").html(openPrice);    
            $("#day_high").html(dailyHigh);    
            $("#day_low").html(dailyLow);   
            $("#year_high").html(yearHigh);   
            $("#year_low").html(yearLow);  
            $("#volume").html(volume);  
            $("#average_volume").html(averageVolume);  
            $("#market_capital").html(marketCapital);  
            $("#pe_ratio").html(peRatio);  
            $("#div_yield").html(divYield);  

        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log('Request failed: ' + err);
        });
}

// Function to shorten larger numbers
function nFormatter(num, digits) {
  var si = [
    { value: 1E18, symbol: "E" },
    { value: 1E15, symbol: "P" },
    { value: 1E12, symbol: "T" },
    { value: 1E9,  symbol: "G" },
    { value: 1E6,  symbol: "M" },
    { value: 1E3,  symbol: "k" }
  ], i;

  for (i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.?0+$/, "") + si[i].symbol;
    }
  }
  
  return num;
}