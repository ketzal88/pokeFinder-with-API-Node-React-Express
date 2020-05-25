# pokeFinder
This is a web app that gets pokemons from the pokeApi


Bienvenidos al PokeFinder

Para construir esta WebAPP utilicé ReactJs con boostrap para el front y NodeJS con ExpressJS para el back y Mocha y Chai para el testing.


/////////////
Instalación

Para comenzar a utilizar el pokefinder debemos abrir en dos ventanas de IDE diferentes la carpeta de client y por otro lado la carpeta de server. 
En ambas debemos escribir en la terminal NPM install o Yarn install para que se instalen todas las dependencias y módulos necesarios, por ejemplo: NodeModules.
Una vez finalizado debemos escribir en ambas terminales NPM start o Yarn start para inicializar el servidor y para buildear React.

El servicio debería iniciar automaticamente una pestaña en nuestro navegador en el puerto 3000 en el cual vamos a poder ver una lista de pokemones iniciales 
y al escribir en la barra de búsqueda una, dos, tres o varias letras y al hacer click en buscar se mostrará los pokemones que su nombre corresponde a la búsqueda realizada.

/////////////
Testing

Para ejecutar los testing se debe hacer lo siguiente:
En la terminal del server ejecutar el comando yarn/npm test test y debería recibir lo siguiente

/pokemons
    /GET /search/:search
      when the pokemon api returns OK
        when the requested pokemon exists
          √ it should return an array of pokemons that match with the query params
        when the requested pokemon does not exist
          √ it should return an empty array
      when the pokemon api fails
        √ it should return a failed response


//////////////////////

Consideraciones generales:

Debido a que la PokeApi no tiene un endpoint de búsqueda tuve que guardar en una variable el total de los pokemones para luego poder hacer una búsqueda por parementros en ella.
Tuve que realizar esto a pesar de no ser muy perfontamante por las limitaciones de la API.
