import React, { useEffect, useState } from 'react'
import { IconArrowRight, IconLinkOff } from '@tabler/icons-react';

import pokemonServices from '@services/pokemon';
import {Image} from "@nextui-org/image";

const EvolutionDetails = ({details}) => {
    
    return (
        <div className='flex flex-col items-center'>
              <IconArrowRight />
              {details.trigger.name === 'level-up' ? <p>Nivel {details.conditions.map((detail, index) => <span key={index}>{detail.value} </span>)}</p> : <p>{details.trigger.name}</p>}

            
              
            </div>
    );
  };

export const EvolutionChain = ({chainData}) => {
    const [pokemonNames, setPokemonNames] = useState([]);
    const [pokemonImages, setPokemonImages] = useState(null)

    useEffect(() => {
      setPokemonNames([])
      if(chainData.chain.evolves_to.length > 0){
      extractNamesFromEvolutions(chainData.chain);
      }
    }, [chainData]);
    
    useEffect(() => {
      if (pokemonNames.length > 1) {
        fetchPokemonImages();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemonNames]);

    const formatName = name => name.charAt(0).toUpperCase() + name.slice(1)

    const fetchPokemonImages = async () => {
        const imagePromises = pokemonNames.map(async (pokemon) => {
          const pokeName = pokemon
            
          const response = await pokemonServices.getByName(pokemon);
          
          if(response.sprites.other.home.front_default !== null){
          return  {name: pokeName, image: response.sprites.other.home.front_default };
          } else {
            return {name: pokeName, image: response.sprites.front_default };
          }
        });
      
        const images = await Promise.all(imagePromises);
        setPokemonImages(images);
      };


    
    const extractNamesFromEvolutions = (evolutions) => {
      const names = [];
    
      const recursiveExtraction = (evolution) => {
        const speciesName = evolution.species.name;
        names.push(speciesName);
    
        if (evolution.evolves_to && evolution.evolves_to.length > 0) {
          evolution.evolves_to.forEach(subEvolution => recursiveExtraction(subEvolution));
        }
      };
    
      recursiveExtraction(evolutions);
      setPokemonNames(names);
    };
      
    
    


    const findDetails = (data) => {
        const foundDetails = { conditions: [] };
    
        for (const property in data) {
            if (data[property] !== null && data[property] !== false && data[property] !== '') {
                if (typeof data[property] === 'object' && data[property].hasOwnProperty('name')) {

                    foundDetails[property] = {name: data[property].name }

                    

                    


                } else {
                    foundDetails.conditions.push({ name: property, value: data[property] });
                }
            }
        }
    
        
        return foundDetails;
    };
     

    const renderEvolutions = (evolutionData) => {
  
    

    const details = findDetails(evolutionData.evolution_details[0])
    return(
        <div className='flex flex-row justify-center items-center gap-x-14'>
        {evolutionData.evolution_details.length !== 0 && 
            
              
            <EvolutionDetails details={details}/>
       
      
        
        }


        <div className='flex flex-col items-center'>
              {pokemonImages?.map(pokemon => {
        if (evolutionData && pokemon.name === evolutionData.species.name) {
            return (
            <Image
                key={pokemon.name}
                alt='pokemon-image'
                height={150}
                width={150}
                src={pokemon.image}
            />
            );
        }
        return null;
        })}
            
            <p>{formatName(evolutionData.species.name)}</p>
        </div>

        {evolutionData.hasOwnProperty('evolves_to') &&
            <div>
                {evolutionData.evolves_to.map((evolvesTo, index) => (
            <React.Fragment key={index}>
            {renderEvolutions(evolvesTo)}
            </React.Fragment>
        ))}
            </div>
        }
        </div>
    )
    }
    

  return (
    <div className='mt-4'>
        
          
    <h2 className='text-left text-2xl font-inter font-bold mb-2'>Evoluciones</h2>
    
        <div className='justify-center my-10'>
          
          {pokemonNames.length === 0 ? 
            <div className='flex flex-col items-center'>
              <IconLinkOff
              color='gray'
              height={40}
              width={40}
              
              />
              <p className='italic text-lg text-gray-400'>{formatName(chainData.chain.species.name)} no evoluciona</p>
            </div>
          : 
          renderEvolutions(chainData.chain) }
        </div>
    

   
  </div>
  )
}


