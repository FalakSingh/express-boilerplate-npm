const router = require("express").Router();
const { env } = require("../../config/envVars");
const { http_status, messages } = require("../constants/api.constants");
const { ErrorRes } = require("../utils/reponseHandler");
const userRoutes = require("./user.routes");

const routes = [{ path: "/api/user", route: userRoutes }];

routes?.forEach((route) => {
  router.use(route.path, route.route);
});

router.route("/").get((req, res) => {
  const uptime = process.uptime();
  res.send(`Server is up and running in ${env} environment <br/>
  Server Time: ${new Date()} <br />
  UpTime in seconds:${Math.floor(uptime)} <br />
  UpTime in minutes:${Math.floor(uptime / 60)} <br />
  UpTime in hours:${Math.floor(uptime / 3600)} <br />
  `);
});

router.use(async (req, res, next) => {
  next(new ErrorRes(http_status.not_found, messages.not_found));
});

module.exports = router;
