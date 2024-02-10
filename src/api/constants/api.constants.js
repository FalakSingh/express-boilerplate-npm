const http_status = {
  ok: 200,
  created: 201,
  bad_request: 400,
  unauthorize: 401,
  forbidden: 403,
  not_found: 404,
  server_error: 500,
};

const messages = {
  fetched: "Data fetched successfully",
  server_error: "Internal server error",
  not_found: "Not found",
  emailExists: "Email already exists",
  invalid_credentials: "Invalid Credentials",
  otp_not_verified: "Please Verifiy your account first",
  user_register: "User Registered Successfully",
  logged_in:"Logged in successfully"
};

module.exports = { http_status, messages };
