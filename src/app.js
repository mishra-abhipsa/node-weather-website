const path = require("path");
const express = require("express");
const hbs = require("hbs");

//wiring up geocode and forecast
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

console.log(__dirname);
// console.log(__filename);
console.log(path.join(__dirname, "../public"));

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Abhipsa Mishra",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Abhipsa Mishra",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "For any help contact-coolapp@gmail.com",
    title: "Help",
    name: "Abhipsa Mishra",
  });
});
//app.com
//app.com/help
//app.com/about
//app.com/weather

// app.get("/", (req, res) => {
//   // res.send("Hello Express from root!");
//   res.send("<h1>Hello Express</h1>");
// });

// app.get("/help", (req, res) => {
//   // res.send("Help page");
//   res.send([{ name: "Megha" }, { name: "Ilu" }]);
// });

// app.get("/help/email", (req, res) => {
//   res.send("Email us at coolapp@gmail.com");
// });

// app.get("/about", (req, res) => {
//   // res.send("About page");
//   res.send("<h1>About</h1>");
// });

app.get("/weather", (req, res) => {
  // res.send("Weather page");
  // res.send({ location: "Talcher", foreacst: "39 deg celsius" });
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        // res.send({ error: error });
        return res.send({ error }); //object shorthand notation
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location, //object shorthand notation
          address: req.query.address,
        });
      });
    }
  );
});
//   console.log(req.query.address);
//   res.send({
//     // location: "Hyderabad",
//     address: req.query.address,
//     forecast: "It is sunny now.",
//   });
// });

//learning accessing api from browser-query strings
app.get("/products", (req, res) => {
  //if we want key - search to be mandatory
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }
  // console.log(req.query); //req.query ->gives an object that contains all our searches
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

//404 other example
app.get("/help/*", (req, res) => {
  //same 404 hbs view used
  res.render("404", {
    title: "404 Help",
    name: "Abhipsa Mishra",
    errorMessage: "Help article not found",
  });
});

//404 page setup
//* - wild card character express provides- to match all the other conditions apart from the ones mentioned above
app.get("*", (req, res) => {
  // res.send("My 404 page");
  res.render("404", {
    title: "404",
    name: "Abhipsa Mishra",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
