//Imports
const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const { ErrorRes } = require("../api/utils/reponseHandler");
const { http_status, messages } = require("../api/constants/api.constants");
const { errorConvertor, errorHandler } = require("../api/middlewares/error.middleware");
const path = require("path");
const { env } = require("./envVars");
const morgan = require("morgan");

//Application Initialization
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
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());

//logs api calls
app.use(morgan("dev"))

//Routes
app.use(require("../api/routes"));


//Converts express error to ErrorRes
app.use(errorConvertor);

//Handles ErrorRes errors
app.use(errorHandler);

//export
module.exports = app;
