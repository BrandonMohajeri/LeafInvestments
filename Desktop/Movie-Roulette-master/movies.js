
function findMovie(theUrl, callback){
	xmlhttp = new XMLHttpRequest();
	var url = "https://www.reddit.com/r/movies/comments/31obue/i_averaged_out_movie_ratings_from_imdb_rotten/.json?raw_json=1";
	httpGet(url);
}

function httpGet(theUrl, callback){
	var xmlHttp = new XMLHttpRequest();
	var list = [];

	xmlHttp.onreadystatechange = function() { 
	    if (xmlHttp.readyState == 4 && xmlHttp.status == 200){

				  var answer = xmlHttp.responseText;
	   			  var str = JSON.stringify(answer);
	   			  var jsonResponse = JSON.parse(str);
	   			  var array = JSON.parse("[" + jsonResponse + "]");
	   			  var json = array[0][0].data.children[0].data.selftext_html;

				    var el = document.createElement( 'html' );
				    el.innerHTML = json;
					  var item = el.getElementsByTagName( 'li' );

				   for(var i = 0; i < 249; i++){
				   		var movie = item[i].innerHTML;
				   		var split = movie.split("-");
				   		var split2 = split[0];
				   		var movie2 = split2.substring(split2.indexOf('.')+1)

				   		var errorMovies;
				   		if(movie2[0] == "5"){
				   			errorMovies = movie2;
				   			errorMovies = errorMovies.split(".")[1];
				   			//console.log(errorMovies);
				   			list.push(errorMovies);
				   		}
				   		else{
				   			list.push(movie2);
				   		}
				   }
				  x =  Math.floor(Math.random() * (249 - 0 + 1) + 0);
				r = list[x];
				
				getImdb(r);
	    }
	} 
xmlHttp.open("GET", theUrl, true);
xmlHttp.send(null);
}

function getImdb(movieTitle){
var myTitle = document.getElementById('title');
var myReleaseDate = document.getElementById('releaseDate');
var myMPAARating = document.getElementById('mpaaRating');
var myGenre = document.getElementById('genre');
var myDirector = document.getElementById('director');
var myActors = document.getElementById('actors');
var myPlot = document.getElementById('plot');
var image = document.getElementById('image');
var myRating = document.getElementById('rating');



var split = movieTitle.replace(/ /g, "+");
var url = "http://www.omdbapi.com/?t=" + split + "&y=&plot=short&r=json"
var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			var answer = xmlHttp.responseText;
			var json = JSON.parse(answer);
   			var title = json.Title;
			  var year =  json.Released;
			  var rated = json.Rated;
			  var genre = json.Genre;
			  var director = json.Director;
			  var plot = json.Plot;
			  var rating = json.imdbRating;
			  var actors = json.Actors;
			  var poster = json.Poster;
			 	var data = document.getElementsByClassName("data")[0];

			 	

			 	if(json.Response == "False"){
			 		data.innerHTML = "Sorry," + movieTitle + " was not found in our database";
			 	}
			 	else{

			 		myTitle.innerHTML = movieTitle;
			 		myReleaseDate.innerHTML = "Release Date : " + year;
			 		myMPAARating.innerHTML = "Rating: " + rated;
			 		myGenre.innerHTML = "Genre: " + genre;
			 		myDirector.innerHTML = "Director: " + director;
			 		myActors.innerHTML = "Actors: " + actors;
			 		myPlot.innerHTML = "Plot: " + plot;
			 		myRating.innerHTML = rating + " / 10";
			 		image.innerHTML = "<br>" + "<img src='" + poster + "'>";



			 		// data.innerHTML = "Titles: " + movieTitle + "<br>" + "Release Date: " + year + "<br>" + "MPAA Rating: " + rated + "<br>"
			  	// 	+ "Genre: " + genre + "<br>" + "Directed by: " + director +  "<br>"  + "Actors: " + actors + "<br>"+ "Plot: " + plot + "<br>" + "Rating: " + rating + "<br>" + "<img src='" + poster + "'>";
			  }					
			}
		}
xmlHttp.open("GET", url, true);
xmlHttp.send(null);
}










