const app = require("./app");
const config = require("config");

const server = app.listen(config.port);

server.on("listening", () =>
  console.log("CRUD app. Running on port:", config.port)
);
