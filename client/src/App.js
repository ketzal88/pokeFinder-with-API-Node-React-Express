import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardColumns,
  InputGroupAddon,
  Button,
  InputGroup,
  Input,
  Jumbotron,
  Col,
} from "reactstrap";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      search: "",
    };
  }

  componentWillMount() {
    fetch("http://localhost:3001/")
      .then((response) => response.json())
      .then((data) => this.setState({ pokemons: data.results }))
      .catch(() => this.setState({}));
  }

  handleInput = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  handleSearch = (e) => {
    console.log(this.state.search);
    fetch("http://localhost:3001/search/" + this.state.search)
      .then((response) => response.json())
      .then((data) => this.setState({ pokemons: data.results }))
      .catch(() => this.setState({}));
  };

  render() {
    const { pokemons, search } = this.state;
    return (
      <div className="App">
        <div>
          <Jumbotron>
            <h1 className="display-3">Pokemon Finder</h1>
            <p className="lead">El que quiere Pokemons, que los busque.</p>
            <InputGroup>
              <InputGroupAddon>
                <Button
                  onClick={this.handleSearch}
                >
                  Buscar
                </Button>
              </InputGroupAddon>
              <Input
                addonType="prepend"
                type="text"
                placeholder="Search"
                onChange={this.handleInput}
                value={search}
                name="search"
              />
            </InputGroup>
          </Jumbotron>
        </div>

        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <CardColumns width="33%">
            {pokemons.map((pokemon, i) => (
              <Card body inverse color="danger">
                <CardImg top width="25%" src={pokemon.img} alt={pokemon.name} />
                <CardBody>
                  <CardTitle>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <strong>{pokemon.name.toUpperCase()}</strong>
                    </p>
                  </CardTitle>
                </CardBody>
              </Card>
            ))}
          </CardColumns>
        </Col>

        <Jumbotron>
          <a href="https://www.linkedin.com/in/gabrieluccello/">
            <p className="lead">Hecho por Gabriel Uccello</p>
          </a>
          <p className="lead">
            <Button href="https://github.com/ketzal88/pokeFinder" target="_blank" color="primary">Link al repo</Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}
