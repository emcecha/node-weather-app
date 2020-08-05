const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

// Paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "emcecha",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "emcecha",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "emcecha",
    message: "My secret, but not secret, message!",
  });
});

app.get("/weather", (req, res) => {
  const location = req.query.location;

  if (!location) {
    res.send({
      error: "Location must be provided",
    });
    return;
  }

  geocode(location, (err, { lat, lng, placeName } = {}) => {
    if (err) {
      res.send({
        error: err,
      });
      return;
    }

    forecast(lat, lng, (err, data) => {
      if (err) {
        res.send({
          error: err,
        });
        return;
      }

      res.send({
        forecast: data,
        placeName,
        location,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found.",
    name: "emcecha",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found.",
    name: "emcecha",
  });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
