const { assert } = require("chai");
const { describe, it } = require("mocha");

const upcomingMovies = require("./TMDbData/upcomingMovies.json");
const movieDetails = require("./TMDbData/movieDetails.json");
const genreMapExample = require("./expectedResult/genreMap.json");
const moviesListResult = require("./expectedResult/moviesList.json");

const Movie = require("../models/Movie");

describe("Movie Model tests", () => {
  describe("Movies list ", () => {
    const upcomingMoviesCopy = JSON.parse(JSON.stringify(upcomingMovies));

    upcomingMoviesCopy.results.forEach((m, index) => {
      const movie = new Movie(m, "https://image.tmdb.org/t/p/w300", genreMapExample);

      it("compare converted movie object for the list. Title: " + movie.title, () => {
        assert.deepEqual(movie, moviesListResult.results[index]);
      });
    });
  });

  describe("Movie details ", () => {
    const movieDetailsCopy = JSON.parse(JSON.stringify(movieDetails));
    const movie = new Movie(movieDetailsCopy, "imageurl");

    it("convert genres array of objects to string successfully", () => {
      assert.strictEqual(movie.genres, "Family, Fantasy");
    });

    it("format release date successfully", () => {
      assert.strictEqual(movie.release_date, "19 December 2019");
    });

    it("resolve image url to poster_path successfully", () => {
      assert.strictEqual(movie.poster_path, "imageurl/sxNgJIGT0z9DZgEaD29HFOQZcAG.jpg");
    });

    it("convert production countries to string successfully", () => {
      assert.strictEqual(movie.production_countries, "France, Italy, United Kingdom");
    });
  });
});
