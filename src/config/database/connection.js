const mongoose = require("mongoose");
const logger = require("../logger");
const { env, mongoURI } = require("../envVars");


// Exit application on error
mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === "development") {
  mongoose.set("debug", true);
}

module.exports = mongoose
  .connect(mongoURI)
  .then(() => logger.info("MongoDB Connection Established"));
