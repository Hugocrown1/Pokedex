'use client'

import { useState } from "react";

const Searcher = ({getPokeInfo, pokemonList}) => {

  
    

    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        
        getPokeInfo(inputValue.toLowerCase())
      }
    };

    const filteredPokemon = pokemonList.filter(pokemon =>
      pokemon.pokemon_species.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    
    
    
  
  
    return (
      <>
        <input
          className="w-full h-9 border px-4 py-2 text-xl rounded-md focus:ring-blue-500 focus:border-blue-500"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar Pokémon..."
        />
      {inputValue.length >= 2 && (
        <ul className="bg-black w-full text-white">
          {filteredPokemon
            .slice(0, filteredPokemon.length > 12 ? 12 : undefined)
            .map(pokemon => (
              <li key={pokemon.entry_number}>
                <button className="w-full " onClick={() => setInputValue(pokemon.pokemon_species.name)}>
                  {pokemon.pokemon_species.name}
                </button>
              </li>
            ))}
        </ul>
      )}
      </>
    );
}
  
  export default Searcher