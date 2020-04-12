const express = require("express");
const path = require("path");

module.exports = (app, Controller) => {
  app.use("/", express.static(path.join(__dirname, "../../vue-client/build")));
  app.get("/api/movie/upcoming", Controller.getUpcomingMovies);
  app.get("/api/movie/:id", Controller.getMovieDetails);
};
