'use client'

import logo from '../public/assets/images/pokefondo.png'
import pikachu from '../public/assets/images/pikachu.gif'
import arcanine from '../public/assets/images/arcanine.gif'
import Image from 'next/image'
import Searcher from '@components/Searcher'
import pokedexService from '@services/pokedex'
import pokemonService from '@services/pokemon'
import evolutionService from '@services/evolutionChain'
import PokeCard from '@components/pokeCardComponents/PokeCard'
import getWeaknesses from '@utils/getWeaknesses'
import { useEffect, useState } from 'react'


import {Input} from "@nextui-org/input";






const Home = () => {
  
  const [pokemonList, setPokemonList] = useState([])
  const [pokemon, setPokemon] = useState(null)
  const [pokeSpecie, setPokeSpecie] = useState(null)
  const [results, setResults] = useState([])
  const [weaknesses, setWeaknesses] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  

  const [evolutionChain, setEvolutionChain] = useState(null)

  useEffect(() => {
    pokedexService.getAll().then(pokemon => {
      setPokemonList(pokemon)
      
    })
    
  }, [])

  const handleChange = (e) => {
    

    if(!e.target.value.trim()) return setResults([])

    const filteredPokemon = pokemonList.filter(pokemon =>
      pokemon.pokemon_species.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setResults(filteredPokemon)

  }

  const getPokeInfo = async (name) => {
    try {
        setIsLoaded(false);

        const [pokemonData, pokemonSpecie] = await Promise.all([
            pokemonService.getByName(name),
            pokemonService.getSpecie(name)
        ]);

        const [pokemonWeaknesses, evolutionChain] = await Promise.all([
            getWeaknesses(pokemonData.types, pokemonData.abilities),
            evolutionService.getChain(pokemonSpecie.evolution_chain.url)
        ]);

        setPokemon(pokemonData);
        setPokeSpecie(pokemonSpecie);
        setWeaknesses(pokemonWeaknesses);
        setEvolutionChain(evolutionChain);

        setIsLoaded(true);
    } catch (error) {
        console.error("Error obteniendo información del Pokémon:", error);
    }
};




  
  return (
    
    
    <div className='flex flex-col items-center justify-center'>
      <div className="flex items-center justify-center mt-10 mb-10">
        <Image className="w-20 h-1/2" alt="Pikachu" src={pikachu} />
        <Image prority="true" className='w-1/2' alt="Pokelogo" src={logo} />
        <Image className="w-20 h-20" alt="Arcanine" src={arcanine} />
    
      </div>
          

      {pokemonList && (<Searcher getPokeInfo={getPokeInfo} results={results} onChange={handleChange}/>)}
      {pokemon && 
        <PokeCard getPokeInfo={getPokeInfo} pokemon={pokemon} specie={pokeSpecie} weaknesses={weaknesses} evolutionChain={evolutionChain} isLoaded={isLoaded}/>
     }
      
    </div>
    
    
  )
}

export default Home