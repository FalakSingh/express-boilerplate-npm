const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const { ErrorRes } = require("../api/utils/reponseHandler");
const { http_status, messages } = require("../api/constants/api.constants");
const { errorConvertor, errorHandler } = require("../api/middlewares/error");
const routes = require("../api/routes/v1");
const path = require("path");

const app = express();

// set security HTTP headers      
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

//serve a static folder on server
app.use(express.static(path.join(__dirname, "../../public")));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());

app.use("/api/v1", routes);

app.use(async (req, res, next) => {
  next(new ErrorRes(http_status.not_found, messages.not_found));
});

//Converts express error to ErrorRes
app.use(errorConvertor);

//Handles ErrorRes errors
app.use(errorHandler);

module.exports = app;