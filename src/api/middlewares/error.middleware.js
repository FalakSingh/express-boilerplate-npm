const { env } = require("../../config/envVars");
const logger = require("../../config/logger");
const { http_status, messages } = require("../constants/api.constants");
const { ErrorRes } = require("../utils/reponseHandler");

const errorConvertor = async (err, req, res, next) => {
  if (env === "development") {
    logger.error({ status: err.status, message: err.message });
  }

  let error = err;
  if (!(error instanceof ErrorRes)) {
    error = new ErrorRes(http_status.server_error, messages.server_error);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  return res
    .status(err.status)
    .json({ success: false, status_code: err.status, message: err.message });
};

module.exports = { errorConvertor, errorHandler };
