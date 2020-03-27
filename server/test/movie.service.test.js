const { assert } = require("chai");
const { describe, it } = require("mocha");

const upcomingMovies = require("./TMDbData/upcomingMovies.json");
const genres = require("./TMDbData/genres.json");
const movieDetails = require("./TMDbData/movieDetails.json");

const TMDbClient = require("../clients/TMDb.client")();
const MovieService = require("../services/movie.service")(TMDbClient);

const { retrieveUpcomingMovies, resolveGenreMap, retrieveMovieDetails } = MovieService;

const detailsResult = require("./expectedResult/movieDetails.json");
const moviesListResult = require("./expectedResult/moviesList.json");
const genreMapExample = require("./expectedResult/genreMap.json");

TMDbClient.getUpcomingMovies = async () => {
  return JSON.parse(JSON.stringify(await upcomingMovies));
};

TMDbClient.getGenres = async () => {
  return JSON.parse(JSON.stringify(await genres));
};

TMDbClient.getMovieDetails = async () => {
  return JSON.parse(JSON.stringify(await movieDetails));
};

describe("Movie Service tests", () => {
  describe("Resolve Genre Map", () => {
    it("verify resolveGenreMap", async () => {
      const genreMap = await resolveGenreMap();
      assert.deepEqual(genreMap, genreMapExample);
    });
  });

  describe("Retrieve upcoming movies", async () => {
    const moviesResult = await retrieveUpcomingMovies();

    it("compare retrieved upcoming movies successfully", () => {
      moviesResult.results.forEach((movie, index) => {
        assert.deepEqual(movie, moviesListResult.results[index]);
      });
    });

    it("compare total_pages attribute successfully", () => {
      assert.strictEqual(moviesResult.total_pages, moviesListResult.total_pages);
    });
  });

  describe("Retrieve movie details", () => {
    it("compare retrieved movie details successfully", async () => {
      const details = await retrieveMovieDetails("489724");
      assert.deepEqual(details, detailsResult);
    });
  });
});
