process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server.js");
let should = chai.should();
let nock = require("nock");

chai.use(chaiHttp);

describe('/', () => {
  describe('/GET /', () => {
    it('it returns pokemon data when requested', () => {
      chai
        .request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.results.should.a('array')
          res.body.results.length.should.be.greater(1)
          done()
        })
    })
  })
})

describe("/pokemons", () => {
  describe("/GET /search/:search", () => {
    context("when the pokemon api returns OK", () => {
      beforeEach(function () {
        nock("https://pokeapi.co/api/v2/")
          .get("/pokemon?limit=500")
          .reply(200, {
            results: [
              {
                name: "pikachu",
                url: "https://pokeapi.co/api/v2/pokemon/1/",
                img:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
              },
              {
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/2/",
                img:
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
              },
            ],
          });
      });
      context("when the requested pokemon exists", () => {
        const searchQuery = "pika";
        it("it should return an array of pokemons that match with the query params", (done) => {
          chai
            .request(server)
            .get(`/search/${searchQuery}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a("array");
              res.body.results.length.should.be.eql(1);
              done();
            });
        });
      });

      context("when the requested pokemon does not exist", () => {
        const searchQuery = "chari";
        it("it should return an empty array", (done) => {
          chai
            .request(server)
            .get(`/search/${searchQuery}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.results.should.be.a("array");
              res.body.results.length.should.be.eql(0);
              done();
            });
        });
      });
    });

    context("when the pokemon api fails", () => {
      beforeEach(function () {
        nock("https://pokeapi.co/api/v2/")
          .get("/pokemon?limit=500")
          .reply(500, {
            error: "Our API is down :(",
          });
      });

      const searchQuery = "chari";
      it("it should return a failed response", (done) => {
        chai
          .request(server)
          .get(`/search/${searchQuery}`)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.error.should.be.eql("Our API is down :(");
            done();
          });
      });
    });
  });
});