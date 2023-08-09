'use client'

import { useState, useRef, useEffect } from "react";

import { SearchIcon } from "./SearchIcon";
import {Spinner} from "@nextui-org/react";
import {Input} from "@nextui-org/react";

const Searcher = ({getPokeInfo, pokemonList}) => {
  
    const resultContainer = useRef(null)
  
    const [results, setResults] = useState([])
    const [focusedIndex, setFocusedIndex] = useState(-1)
    const [inputValue, setInputValue] = useState('');
    const [showResults, setShowResults] = useState(false)

    useEffect(() => {
      if (!resultContainer.current) return;

    
      resultContainer.current.scrollIntoView({
        block: 'center',
      })

    }, [focusedIndex])

    useEffect(() => {
      if(results.length > 0 && !showResults ) setShowResults(true)

      if(results.length <= 0) setShowResults(false)
    
      
    }, [results])
    
    

    const handleKeyDown = (e) => {
      const { key } = e
      let nextIndexCount = 0
      
      if(key === 'ArrowDown')
        nextIndexCount = (focusedIndex + 1) % results.length;

      if(key === 'ArrowUp')
        nextIndexCount = (focusedIndex - 1) % results.length;

      if (key === 'Enter') {
        

        getPokeInfo(inputValue.toLowerCase())
      }

      setFocusedIndex(nextIndexCount)

    };

    const handleChange = (e) => {
      setInputValue(e.target.value)

      if(!e.target.value.trim()) return setResults([])

      const filteredPokemon = pokemonList.filter(pokemon =>
        pokemon.pokemon_species.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      setResults(filteredPokemon)

    }


    // format pokemon entry number
    const formatNumber = (number) => {
      return `#${number.toString().padStart(4, '0')}`
    }
    
  
    return (
      <div className="w-3/4 h-3/4 items-center justify-center">
      <div tabIndex={1} onKeyDown={handleKeyDown} className="relative">
        <Input
        
        type="text"
          onChange={handleChange}
          value={inputValue}
          onKeyDown={handleKeyDown}
          aria-describedby="search-input"
          id="search-input"
          isClearable
          radius="sm"
          
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Buscar Pokémon..."
          startContent={
            <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
        {/* Search result container */}
         { showResults && (<div className="  w-full absolute mt-2 p-2 text-white font-medium bg-black shadow-lg rounded-lg rounded-br max-h-56 overflow-y-auto ">
        {results.map((pokemon, index) => {
          const pokeName = pokemon.pokemon_species.name
          const pokeNumber = pokemon.entry_number

          return <div 
          ref={index === focusedIndex ? resultContainer : null} 
          key={index}
          style={{
            backgroundColor:
            index === focusedIndex ? "rgba(230, 230, 230, 0.1)" : "",
          }} 
          className="cursor-pointer flex-between rounded-md border-b-1 border-zinc-700 hover:bg-zinc-700 hover:bg.opacity-10  p-2">
            <span>{pokeName.charAt(0).toUpperCase() + pokeName.slice(1)}</span>
            <span className="text-yellow-600/80">{formatNumber(pokeNumber)}</span>
            

          </div>
        })}

      </div>)}
      </div>



      {/* Old search results version */}
      {/* {inputValue.length >= 2 && (
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
      )} */}
      
      </div>
    );
}
  
  export default Searcher