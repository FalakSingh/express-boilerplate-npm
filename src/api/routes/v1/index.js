const router = require("express").Router();
const userRoutes = require("./user.routes");

const routes = [{ path: "/user", route: userRoutes }];

routes?.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
