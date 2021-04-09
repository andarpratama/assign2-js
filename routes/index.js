const routes = require("express").Router()
const authRoutes = require("./auth.route");
const userRoutes = require("./users.route");
const marketRoutes = require("./markets.route");
const farmRoutes = require("./farms.route");
const barrackRoutes = require("./barracks.route");

const errHanddler = require('../middlewares/errorHanddler');

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/markets", marketRoutes);
routes.use("/farms", farmRoutes);
routes.use("/barracks", barrackRoutes);

routes.use(errHanddler)

module.exports = routes;