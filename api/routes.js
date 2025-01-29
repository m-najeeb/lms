const bookRoutes = require("./routers/bookRoutes");

function setup(app) {
  app.use("/api/books", bookRoutes);
}

module.exports = setup;
