var express = require("express");
var app = express();
var axios = require("axios");
var cors = require("cors");
var bodyParser = require("body-parser");

const port = 3001;

app.listen(port);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function createImgLink(allPokemons) {
  allPokemons.forEach(function (el, i) {
    let index = i + 1;
    el.img =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
      index +
      ".png";
  });
  return allPokemons;
}

function findPokemons(inputValue, allPokemons) {
  return allPokemons.filter(function (el, i) {
    return el.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  });
}

app.get("/search/:search", function (req, res) {
  axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=525")
    .then((response) => {
      let allPokemons = response.data.results;
      let inputValue = req.params.search;

      let searchResultWithImg = createImgLink(allPokemons);
      let searchResult = findPokemons(inputValue, searchResultWithImg);
      res.send({ results: searchResult });
    })
    .catch((error) => {
      return res.status(400).send({
        error: error.response.data.error,
      });
    });
});

app.get("/", function (req, res) {
  axios
    .get("https://pokeapi.co/api/v2/pokemon")
    .then((response) => {
      let allPokemonsWithImg = createImgLink(response.data.results);
      res.send({ results: allPokemonsWithImg });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = app; // for testing
