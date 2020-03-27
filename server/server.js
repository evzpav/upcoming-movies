const express = require("express");

const app = express();
const cors = require("cors");
const config = require("./config/config");
const router = require("./router/router");

app.use(cors());
app.use((req, res, next) => {
  res.header("X-XSS-Protection", "0");
  res.header("X-Content-Type-Options", "nosniff");
  res.header("X-Frame-Options", "SAMEORIGIN");
  next();
});

if (!config.moviesApiToken) {
  console.error("TMBD_API_TOKEN env var is required");
  process.exit(1);
}

const TMDbClient = require("./clients/TMDb.client")(config.moviesApiToken);
const MovieService = require("./services/movie.service")(TMDbClient);
const MovieController = require("./controllers/movie.controller")(MovieService);

router(app, MovieController);

const server = app.listen(config.port, err => {
  if (err) {
    console.error("Could not initiate express server: ", err);
    process.exit(1);
  }
  console.info(`App listening on port ${config.port}; http://localhost:${config.port}`);
});

process.on("SIGINT", () => {
  console.info("Closing server...");

  server.close(() => {
    console.info("Server closed");
    process.exit();
  });

  // Force close server after 5 secs
  setTimeout(e => {
    console.warn("Forcing server close", e);
    process.exit(1);
  }, 5001);
});
