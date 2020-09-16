# pokeFinder with ReactJS, NodeJS and Express
This is a web app that gets pokemons from the pokeApi

Welcome to PokeFinder

To build this WebAPP I used ReactJs with boostrap for the front and NodeJS with ExpressJS for the back and Mocha and Chai for testing.

/////////////
Installation

To start using the pokefinder we must open the client folder and on the other hand the server folder in two different IDE windows.
In both, we must write NPM install or Yarn install in the terminal so that all the necessary dependencies and modules are installed, for example: NodeModules.
Once finished we must write in both terminals NPM start or Yarn start to initialize the server and to build React.

The service should automatically start a tab in our browser on port 3000 in which we will be able to see a list of initial pokemon
and by typing one, two, three or more letters in the search bar and clicking on search will show the pokemon whose name corresponds to the search carried out.

/////////////
Testing

To run the tests you must do the following:
In the server terminal run the command yarn / npm test test and you should receive the following

/ pokemons
    / GET / search /: search
      when the pokemon api returns OK
        when the requested pokemon exists
          √ it should return an array of pokemons that match with the query params
        when the requested pokemon does not exist
          √ it should return an empty array
      when the pokemon api fails
        √ it should return a failed response

//////////////////////

General considerations:

Since the PokeApi does not have a search endpoint, I had to save the total of the pokemon in a variable so that I could later do a parental search on it.
I had to do this despite not being very perfontamante due to the limitations of the API.
