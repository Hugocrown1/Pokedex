'use client'

import logo from '../public/assets/images/pokefondo.png'
import pikachu from '../public/assets/images/pikachu.gif'
import arcanine from '../public/assets/images/arcanine.gif'
import Image from 'next/image'
import Searcher from '@components/Searcher'
import pokedexService from '@services/pokedex'
import pokemonService from '@services/pokemon'
import PokeCard from '@components/PokeCard'
import { useEffect, useState } from 'react'


const Home = () => {
  //Utilizar la lista de pokemon para algo
  const [pokemonList, setPokemonList] = useState([])
  const [pokemon, setPokemon] = useState(null)
  const [pokeSpecie, setPokeSpecie] = useState(null)

  useEffect(() => {
    pokedexService.getAll().then(pokemon => {
      setPokemonList(pokemon)
      
    })
    
  }, [])

  const getPokeInfo = async (name) => {
    try {
        const pokemonData = await pokemonService.getByName(name);
        const pokemonSpecie = await pokemonService.getSpecie(name);

        setPokemon(pokemonData);
        setPokeSpecie(pokemonSpecie);
    } catch (error) {
        
        console.error("Error obteniendo información del Pokémon:", error);
       
    }
};

  
  return (
    <>
    
    <div className='flex flex-col items-center justify-center'>
      <div className="flex items-center justify-center mt-10 mb-10">
        <Image className="w-20 h-1/2" alt="Pikachu" src={pikachu} />
        <Image prority="true" className='w-1/2' alt="Pokelogo" src={logo} />
        <Image className="w-20 h-20" alt="Arcanine" src={arcanine} />
      </div>

      <div className='w-3/4'>
        <Searcher getPokeInfo={getPokeInfo} pokemonList={pokemonList}/>
      </div>
      {pokemon && <PokeCard pokemon={pokemon} specie={pokeSpecie}/>}
      
    </div>
    
    </>
  )
}

export default Home