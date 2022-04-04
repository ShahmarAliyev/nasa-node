const http = require("http");
const app = require("./app");

require("dotenv").config;

const { mongoConnect } = require("./services/mongo.js");
const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchData } = require("./models/launches.model");
const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log("Server started at PORT N 8000");
  });
}

startServer();
