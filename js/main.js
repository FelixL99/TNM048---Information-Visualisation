d3.csv("./data/tmdb_5000_movies.csv", function (data) {
	// Read data
	console.log(data);

	// Go thru and change genre column from json to specific genre in string.
	extractGenres(data);

	// The different genres
	var genres = ["Action", "Adventure", "Comedy", "Crime",
		"Drama", "Family", "Fantasy", "Horror",
		"Mystery", "Romance", "Science Fiction", "Thriller"];


	// FOR RADARCHART: Calculate average for different attributes per genre
	var avrRevenueRC = [];
	var avrBudgetRC = [];
	avrRevenueRC = new calulateAveragePerGenre(data, genres, "revenue");
	avrBudgetRC = new calulateAveragePerGenre(data, genres, "budget");

	// Create subset with info needed for radar chart
	var radarchartData = []
	for (var i in genres) {
		radarchartData.push(
			{ "genre": genres[i], "avrRevenue": avrRevenueRC[i], "avrBudget": avrBudgetRC[i] }
		)
	}

	//FOR BARCHART: Create subset with info needed for a stacked bar chart
	genres.push("Other")
	
	var avrRuntimeBC = [];
	var avrRevenueBC = [];
	var avrBudgetBC = [];
	var avrRatingBC = [];
	
	avrRuntimeBC = new calculateAveragePerYearGenre(data, genres, "runtime");
	avrRevenueBC = new calculateAveragePerYearGenre(data, genres, "revenue");
	avrBudgetBC = new calculateAveragePerYearGenre(data, genres, "budget");
	avrRatingBC = new calculateAveragePerYearGenre(data, genres, "vote_average");

	// Instantiate the different graphs
	radar = new drawRadar(radarchartData);
	bar = new drawBar(avrBudgetBC, avrRevenueBC, avrRatingBC, avrRuntimeBC);
	scatter = new drawScatter(data);
})







