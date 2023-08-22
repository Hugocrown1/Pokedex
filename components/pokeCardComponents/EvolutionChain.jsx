import React, { useEffect, useState } from 'react'
import { IconArrowRight, IconLinkOff } from '@tabler/icons-react';

import pokemonServices from '@services/pokemon';
import {Image} from "@nextui-org/image";

const EvolutionDetails = ({details}) => {

  const relativeAttackMap = {
    '1': 'Ataque > Defensa',
    '-1': 'Ataque < Defensa',
    '0': 'Ataque = Defensa'
  }
  
    
    return (
        <div className='flex flex-col items-center'>
              <IconArrowRight />
              {details.trigger.name === 'level-up' ? 

              details.conditions.length === 0 ?
              <p>level up {details.location?.name}</p>

              :
              
              <p>{details.conditions.map((detail, index) => {
                if( detail.name === 'min_level'){
                  return <span key={index}>Nivel {detail.value} </span>

                } else if (detail.name === 'min_happiness'){
                  return <span key={index}> Felicidad {detail.value} </span>
                } else {
                  // Caso Hitmonlee
                  if(detail.name === 'relative_physical_stats'){
                    return <span key={index}> ( {relativeAttackMap[detail.value]} )</span>

                  } else
                  return <span key={index}> {detail.name} {detail.value} </span>
                }

                
              
              
            
              })}</p> 
              
              :  details.trigger.name === 'use-item' ?  <p>use {details.item.name}</p> 
              
              : <p> {details.trigger.name} {details.held_item?.name} {details.conditions.map((detail, index) => {
                <span key={index}>{detail.name}</span>
              })} </p>
              }

            
              
            </div>
    );
  };

export const EvolutionChain = ({chainData, getPokeInfo}) => {
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


        <button
        onClick={() => getPokeInfo(evolutionData.species.name)}
        >
          <div className='flex flex-col items-center'>
                {pokemonImages?.map(pokemon => {
          if (evolutionData && pokemon.name === evolutionData.species.name) {
              return (
              
                <Image
                    className='p-4'
                    key={pokemon.name}
                    alt='pokemon-image'
                    height={160}
                    width={160}
                    src={pokemon.image}
                    isZoomed

                  
                
                
                />
              
              );
          }
          return null;
          })}
          
              <p className='font-medium'>{formatName(evolutionData.species.name)}</p>
          </div>
        </button>

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
    <>
        
          
    <h2 className='text-left text-2xl font-inter font-bold mb-2'>Evoluciones</h2>
    
        <div className='justify-center my-8'>
          
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
    

   
  </>
  )
}


