function findMovies(theUrl, callback){
	xmlhttp = new XMLHttpRequest();
	var url = "https://www.reddit.com/r/movies/comments/31obue/i_averaged_out_movie_ratings_from_imdb_rotten/.json?raw_json=1";
	
	httpGetMovies(url);
}


function httpGetMovies(theUrl, callback){
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

				getImdbMovies(list);
	        }
	} 
	xmlHttp.open("GET", theUrl, true);
	xmlHttp.send(null);
}


function getImdbMovies(list){
	var count = 0;
	var movieList = [];

	for(var i = 3; i<=list.length-2;i++){
		var movieTitle = list[i];
		var split = movieTitle.replace(/ /g, "+");
		var url = "http://www.omdbapi.com/?t=" + split + "&y=&plot=short&r=json";
		//console.log(url);
		
		var xmlHttp = new XMLHttpRequest();
		

		xmlHttp.onreadystatechange = function() { 
		    if (xmlHttp.readyState == 4 && xmlHttp.status == 200){

				var answer = xmlHttp.responseText;
				var json = JSON.parse(answer);
	   		    var title = json.Title;
				var year =  "("+json.Released+")";
				var rated = json.Rated;
				var genre = json.Genre;
				var director = "Directed By: " + json.Director;
				var plot = json.Plot;
				var rating = json.imdbRating;
				var actors = "Cast: " + json.Actors;
				var poster = json.Poster;
				
				console.log(title);


				var image =  "<img src='" + poster + "'style='width:100%;height:100%;'>";
				var finalRating = rating + " / 10";

			 	if(json.Response == "False"){
			 		// data.innerHTML = "Sorry," + movieTitle + " was not found in our database";

			 	}
			 	else if(json.Response!="False"){
				 	var addMovie = {
							mTitle: movieTitle,
							mReleaseDate: year,
							mMPAARating: rated,
							mGenre: genre,
							mDirectors: director,
							mActors: actors,
							mPlot: plot,
							//mImage: image,
							mRating: finalRating
				 		}
			 		count++;
			 		movieList.push(addMovie);
			 		console.log(addMovie);

	   	   		}

			}
			 			// count++;

	
 		printMovieList(movieList);
			 					
		}


		xmlHttp.open("GET", url, true);
		xmlHttp.send(null);

	}	

}


function printMovieList(movieList){
	var result = document.getElementById('result');
	var movieTitle = document.getElementById('movieTitle');
	var movieImage = document.getElementById('movieImage');
	var movieMPAARating = document.getElementById('movieMPAARating');
	var moviePlot = document.getElementById('moviePlot');
	var movieRating = document.getElementById('movieRating');
	var movieReleaseDate = document.getElementById('movieReleaseDate');
	var movieGenre = document.getElementById('movieGenre');
	var movieDirector = document.getElementById('movieDirector');
	var movieActors = document.getElementById('movieActors');

		movieImage.innerHTML = movieList[0].mImage;
	  	movieTitle.innerHTML = movieList[0].mTitle;
	  	movieMPAARating.innerHTML = movieList[0].mMPAARating;
	  	moviePlot.innerHTML = movieList[0].mPlot;
	  	movieRating.innerHTML = movieList[0].mRating;
	  	movieReleaseDate.innerHTML = movieList[0].mReleaseDate
	  	movieGenre.innerHTML = movieList[0].mGenre;
	  	movieDirector.innerHTML = movieList[0].mDirectors;
	  	movieActors.innerHTML = movieList[0].mActors;

	  // var searchMovies = document.getElementById('searchMovies');
	  // searchMovies.innerHTML = movieList.length;





	var html="";
	for(var i = 0; i<30;i++){
		html += '<div id="result" class="result">'+ 
				'<div class="movieImage" id="movieImage">'+movieList[0].mImage+'</div>'+
				'<movieRating class="movieRating" id="movieRating">'+movieList[0].mRating+'</movieRating>'+
				'<movieTitle class="movieTitle" id="movieTitle">'+movieList[0].mTitle+'</movieTitle>'+
				'<movieMPAARating class="movieMPAARating" id="movieMPAARating">'+movieList[0].mMPAARating+'</movieMPAARating>'+
				'<movieGenre class="movieGenre" id="movieGenre">'+movieList[0].mGenre+'</movieGenre>'+
				'<movieDirector class="movieDirector" id="movieDirector">'+movieList[0].mDirectors+'</movieDirector>'+
				'<movieActors class="movieActors" id="movieActors">'+movieList[0].mActors+'</movieActors>'+
				'<movieReleaseDate class="movieReleaseDate" id="movieReleaseDate">'+movieList[0].mReleaseDate+'</movieReleaseDate>'+
				'<moviePlot class = "moviePlot" id = "moviePlot">'+movieList[0].mPlot+'</moviePlot>' + 
				'</div>';

				 html += '</br></br></br></br></br></br></br></br></br>';
// 
	}

	document.getElementById("main_page").innerHTML=html;

}







