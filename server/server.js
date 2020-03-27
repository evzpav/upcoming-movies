const express = require("express");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config/config");
const router = require("./router/router");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: "500kb" }));
app.use(bodyParser.json({ limit: "500kb" }));

app.use((req, res, next) => {
  res.header("X-XSS-Protection", "0");
  res.header("X-Content-Type-Options", "nosniff");
  res.header("X-Frame-Options", "SAMEORIGIN");
  next();
});

const Client = require("./clients/client")();
const Service = require("./services/service")(Client);
const Controller = require("./controllers/controller")(Service);

router(app, Controller);

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
