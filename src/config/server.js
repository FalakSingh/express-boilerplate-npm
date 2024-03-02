const http = require("http");
const app = require("./app");
const { port } = require("./envVars");
const logger = require("./logger");

class Server {
  constructor() {
    this.server = http.createServer(app);
  }

  async start() {
    this.connectDB();
    this.server.listen(port, () =>
      logger.info(`Server is up and running on PORT: ${port}`)
    );
  }

  async connectDB() {
    await require("./database/connection");
  }
}

module.exports = Server;
