require("./config/pre-start");

const Server = require("./config/server");

const server = new Server();

server.start();
