const express = require("express");
const path = require("path");

module.exports = (app, Controller) => {
  app.use("/", express.static(path.join(__dirname, "../../client/dist")));
  app.get("/api/posts", Controller.getPosts);
};
