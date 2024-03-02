class ErrorRes extends Error {
  constructor(status, message) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

module.exports = {
  ErrorRes,
  successRes: (res, status, message, data = {}) =>
    res
      .status(status)
      .json({ success: true, status_code: status, message, data }),
};

