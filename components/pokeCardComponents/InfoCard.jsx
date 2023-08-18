import React from 'react'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Chip} from "@nextui-org/chip";
import {Divider} from "@nextui-org/divider";
import {Image} from "@nextui-org/image";
import TypeIcon from './TypeIcon';
import { cardStyleMapping } from '@utils/pokeTypes';

export const InfoCard = ({pokemon, specie}) => {

    const cardStyle = cardStyleMapping[pokemon.types[0].type.name];
  return (
    <>
          {/* Carta de pokemon */}

          <div className='relative items-start w-fit mr-20'>
            <Image
            isBlurred={true}
              className='absolute z-10'
              alt='official Pokémon artwork'
              src={pokemon.sprites.other['official-artwork'].front_default}
              width="380"
              height="380"
              quality={100}
              style={{ transform: 'translate(-6%, -10%)', maxWidth: 'none' }}
            />

            
            <Card className={cardStyle.border}>
            
              <CardBody className="overflow-visible justify-end items-center py-8">

              
                <h3 className='font-semibold text-3xl tracking-wider text-center' >{pokemon.species.name.toUpperCase()}</h3>
                
                <Divider className={cardStyle.divider}/>

                <h3 className='font-semibold'>{specie.genera[5].genus}</h3>
              
              
              </CardBody>
              <CardFooter className='justify-center'>
                <div className='flex flex-row'>

                  <div className='flex flex-col items-center'>
    
                    <h3 className='font-semibold'>{(pokemon.height * 0.1).toFixed(1)} m</h3>

                      
                    <Chip className={cardStyle.chip} variant="shadow"><span className='font-semibold'>Altura</span></Chip>
                  </div>

                  <Divider orientation="vertical" className='mx-2  h-auto bg-gray-600'/>

  
                  <div className='flex flex-col items-center'>
    
                    <div className='flex flex-row mb-1'>{pokemon.types.map((type, index) => <TypeIcon key={index} type={type.type.name}/>)}</div>

                      
                    <Chip className={cardStyle.chip} variant="shadow"><span className='font-semibold'>Tipo</span></Chip>
                  </div>

                  <Divider orientation="vertical" className='mx-2  h-auto bg-gray-600'/>
    
                  <div className='flex flex-col items-center'>
    
                    <h3 className='font-semibold'>{(pokemon.weight * 0.1).toFixed(1)} kg</h3>

                    
                    <Chip className={cardStyle.chip} variant="shadow"><span className='font-semibold'>Peso</span></Chip>
                  </div>

                </div>


              </CardFooter>
            </Card>

          </div>
        </>
  )
}
