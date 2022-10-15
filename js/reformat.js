// Workaround for finding main genre of all the movies
function extractGenres(data) {

	//var genres = [];
	var temp;

	for (var i in data) {

		if (data[i].genres == null) {
			data[i].genres = "No data";
		}
		else {
			temp = data[i].genres;
			temp = temp.split('"');

			data[i].genres = temp[5];
		}
	}
}

// Calculate average for a specified attribute, per genre
function calulateAveragePerGenre(data, genres, type) {

	var count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var average = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	for (var i in data) {
		switch (data[i].genres) {
			case genres[0]:
				count[0] = count[0] + 1;
				average[0] = average[0] + parseFloat(data[i][type]);
			case genres[1]:
				count[1] = count[1] + 1;
				average[1] = average[1] + parseFloat(data[i][type]);
			case genres[2]:
				count[2] = count[2] + 1;
				average[2] = average[2] + parseFloat(data[i][type]);
			case genres[3]:
				count[3] = count[3] + 1;
				average[3] = average[3] + parseFloat(data[i][type]);
			case genres[4]:
				count[4] = count[4] + 1;
				average[4] = average[4] + parseFloat(data[i][type]);
			case genres[5]:
				count[5] = count[5] + 1;
				average[5] = average[5] + parseFloat(data[i][type]);
			case genres[6]:
				count[6] = count[6] + 1;
				average[6] = average[6] + parseFloat(data[i][type]);
			case genres[7]:
				count[7] = count[7] + 1;
				average[7] = average[7] + parseFloat(data[i][type]);
			case genres[8]:
				count[8] = count[8] + 1;
				average[8] = average[8] + parseFloat(data[i][type]);
			case genres[9]:
				count[9] = count[9] + 1;
				average[9] = average[9] + parseFloat(data[i][type]);
			case genres[10]:
				count[10] = count[10] + 1;
				average[10] = average[10] + parseFloat(data[i][type]);
			case genres[11]:
				count[11] = count[11] + 1;
				average[11] = average[11] + parseFloat(data[i][type]);
		}
	}

	for (var k in count) {
		average[k] = Math.round(average[k] / count[k])
	}
	return average;
}

// Calculate average for a specified attribute, per genre, per year
// OBS. FUNKAR JUST NU BARA SOM COUNTER FÖR ANTAL FILMER PER GENRE PER ÅR
function calculateAveragePerYearGenre(data, genres, type) {

	// Parse release_date and get the min and max year
	var parseDate = d3.timeParse("%Y-%m-%d");

	var maxDate = d3.max(data, function (d) { return parseDate(d.release_date); });
	var minDate = d3.min(data, function (d) { return parseDate(d.release_date); });

	var minYear = parseInt(minDate.getFullYear());
	var maxYear = parseInt(maxDate.getFullYear());

	var genreCount = [];
	var avr = [];

	// Create dataset for storing average per year per genre, one row per year in the dataset and columns for each genre
	for (var i = minYear; i <= maxYear; i++) {
		genreCount.push(
			{
				"year": i, "Action": 0, "Adventure": 0, "Comedy": 0, "Crime": 0,
				"Drama": 0, "Family": 0, "Fantasy": 0, "Horror": 0, "Mystery": 0,
				"Romance": 0, "ScienceFiction": 0, "Thriller": 0, "Other": 0
			}
		)
		avr.push(
			{
				"year": i, "Action": 0, "Adventure": 0, "Comedy": 0, "Crime": 0,
				"Drama": 0, "Family": 0, "Fantasy": 0, "Horror": 0, "Mystery": 0,
				"Romance": 0, "ScienceFiction": 0, "Thriller": 0, "Other": 0,
			}
		)
	}

	var date;

	// Go thru the data and check what year and genre the specific movie has, save info to dataset
	for (var i in data) {
		date = parseDate(data[i].release_date);

		if (date != null) {
			date = parseInt(date.getFullYear());
		}

		//console.log(date);

		for (var j in genreCount) {
			if (date == genreCount[j].year) {
				if (data[i].genres == genres[0]) { 
				genreCount[j][genres[0]] += 1; 
				avr[j][genres[0]] = avr[j][genres[0]] + parseFloat(data[i][type]);
				}
				else if (data[i].genres == genres[1]) { 
				genreCount[j][genres[1]] += 1; 
				avr[j][genres[1]] = avr[j][genres[1]] + parseFloat(data[i][type]);
				}
				else if (data[i].genres == genres[2]) { 
				genreCount[j][genres[2]] += 1; 
				avr[j][genres[2]] = avr[j][genres[2]] + parseFloat(data[i][type]);
				}
				else if (data[i].genres == genres[3]) { 
				genreCount[j][genres[3]] += 1; 
				avr[j][genres[3]] = avr[j][genres[3]] + parseFloat(data[i][type]);
				}
				else if (data[i].genres == genres[4]) { 
				genreCount[j][genres[4]] += 1; 
				avr[j][genres[4]] = avr[j][genres[4]] + parseFloat(data[i][type]);
				}
				else if (data[i].genres == genres[5]) { 
				genreCount[j][genres[5]] += 1; 
				avr[j][genres[5]] = avr[j][genres[5]] + parseFloat(data[i][type]);
				}
				else if (data[i].genres == genres[6]) { 
				genreCount[j][genres[6]] += 1; 
				avr[j][genres[6]] = avr[j][genres[6]] + parseFloat(data[i][type]);
				}
				else if (data[i].genres == genres[7]) { 
				genreCount[j][genres[7]] += 1; 
				avr[j][genres[7]] = avr[j][genres[7]] + parseFloat(data[i][type]);
				}
				else if (data[i].genres == genres[8]) { 
				genreCount[j][genres[8]] += 1;
				avr[j][genres[8]] = avr[j][genres[8]] + parseFloat(data[i][type]);				
				}
				else if (data[i].genres == genres[9]) { 
				genreCount[j][genres[9]] += 1; 
				avr[j][genres[9]] = avr[j][genres[9]] + parseFloat(data[i][type]);
				}
				else if (data[i].genres == genres[10]) { 
				genreCount[j][genres[10]] += 1; 
				avr[j][genres[10]] = avr[j][genres[10]] + parseFloat(data[i][type]);
				}
				else if (data[i].genres == genres[11]) { 
				genreCount[j][genres[11]] += 1; 
				avr[j][genres[11]] = avr[j][genres[11]] + parseFloat(data[i][type]);
				}
				else {genreCount[j][genres[12]] += 1; 
				avr[j][genres[12]] = avr[j][genres[12]] + parseFloat(data[i][type]);}
			}
		}
	}

	for (var k in avr) {
		for (var l in genres) {
			if (genreCount[k][genres[l]] != 0) {
				if (type == "vote_average") {
					avr[k][genres[l]] = Math.round(avr[k][genres[l]]/genreCount[k][genres[l]] * 10)/10;
				}
				else { 
					avr[k][genres[l]] = Math.round(avr[k][genres[l]]/genreCount[k][genres[l]]);
				}
			}
		}
	}

	return avr;
}