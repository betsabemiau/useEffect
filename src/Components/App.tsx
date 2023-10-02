import { useState, useEffect } from 'react';


function PokemonInfo({pokemon}) {
  return (
    <div>
      <h2 className='pokemon'>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p className='type'>Type: <ul className='poktype'>{pokemon.types.map((type) => type.type.name).join(', ')}</ul></p>
      <p className='abilities'>Abilities: <ol className='pokabil'>{pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</ol></p>
    </div>
  );
}

function App() {
  const [pokemonActual, setPokemonActual] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const cambioPokemonIntervalo = 5000; 

  // Función para obtener un Pokemon aleatorio
  const obtenerPokemonAleatorio = async () => {
    setIsLoading(true);
    const numeroAleatorio = Math.floor(Math.random() * 898) + 1; 
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`);
      const data = await response.json();
      setPokemonActual(data);
    } catch (error) {
      console.error('Error al obtener el Pokémon:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    //código de inicialización
    obtenerPokemonAleatorio();
    const intervalo = setInterval(obtenerPokemonAleatorio, cambioPokemonIntervalo);

    return () => {
        //código de limpieza
      clearInterval(intervalo);
    };
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <p className='A'>AAAAAAAHHHHHHH</p>
      ) : (
        <PokemonInfo pokemon={pokemonActual} />
      )}
    </div>
  );
}

export default App;
