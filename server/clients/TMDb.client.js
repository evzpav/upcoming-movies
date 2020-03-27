const { baseRequest } = require("../utils");

function TMDbClient(apiToken) {
  let request;
  (token => {
    request = baseRequest("https://api.themoviedb.org/3", token);
  })(apiToken);

  const getUpcomingMovies = async (page = 1) => {
    const resp = await request("GET", "/movie/upcoming", `&page=${page}`);
    return resp.data;
  };

  const getGenres = async () => {
    const resp = await request("GET", "/genre/movie/list");
    return resp.data;
  };

  const resolveImageBaseUrl = (size = "w500") => {
    return `https://image.tmdb.org/t/p/${size}`;
  };

  const getMovieDetails = async id => {
    const resp = await request("GET", `/movie/${id}`);
    return resp.data;
  };

  return {
    getUpcomingMovies,
    getGenres,
    resolveImageBaseUrl,
    getMovieDetails,
  };
}

module.exports = TMDbClient;
