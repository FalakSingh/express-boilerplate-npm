const router = require("express").Router();
const userRoutes = require("./userauth.routes");

const routes = [{ path: "/user/auth", route: userRoutes }];

routes?.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
