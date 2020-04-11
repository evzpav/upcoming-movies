const Movie = require("../models/Movie");

function MovieService(TMDbClient) {
  const resolveGenreMap = async () => {
    const result = await TMDbClient.getGenres();

    const genreMap = {};
    if (result.genres) {
      result.genres.forEach(g => {
        genreMap[g.id] = g.name;
      });
    }

    return genreMap;
  };

  const retrieveUpcomingMovies = async page => {
    const genreObj = await resolveGenreMap();
    const moviesResp = await TMDbClient.getUpcomingMovies(page);
    const imageBaseUrl = TMDbClient.resolveImageBaseUrl("w300");
    const moviesList = {};
    moviesList.results = moviesResp.results.map(m => new Movie(m, imageBaseUrl, genreObj));
    moviesList.total_pages = moviesResp.total_pages;
    return moviesList;
  };

  const retrieveMovieDetails = async id => {
    const detailsResp = await TMDbClient.getMovieDetails(id);
    const imageBaseUrl = TMDbClient.resolveImageBaseUrl("w500");
    return new Movie(detailsResp, imageBaseUrl);
  };

  return {
    retrieveUpcomingMovies,
    retrieveMovieDetails,
    resolveGenreMap,
  };
}

module.exports = MovieService;
