const { port } = require("./config/envVars");
require("./config/mongoConfig");
const app = require("./config/app");
const logger = require("./config/logger");

app.listen(port, () =>
  logger.info("Server is up and running on PORT: " + port)
);
