const bookRoutes = require("./routers/bookRoutes");
const userRoutes = require("./routers/userRoutes");

function setup(app) {
  app.use("/api/books", bookRoutes);
  app.use("/api/users", userRoutes);
}

module.exports = setup;
