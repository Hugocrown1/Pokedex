// import Image from 'next/image'

import { statTranslations, generationTranslate, habitatTranslate } from '@utils/translator';
import statRanker from '@utils/statRanker';

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";

import {Tabs, Tab} from "@nextui-org/tabs";


import {Progress} from "@nextui-org/progress";
import {Image} from "@nextui-org/image";

import { DefensesTable } from './DefensesTable';
import { InfoCard } from './InfoCard';
import { TrainingTable } from './TrainingTable';
import { CatchRateTable } from './CatchRateTable';
import { HatchTable } from './HatchTable';

import { EvolutionChain } from './EvolutionChain';

import {Skeleton} from "@nextui-org/skeleton";

const PokeCard = ({pokemon, specie, weaknesses, evolutionChain, getPokeInfo, isLoaded}) => {
  


  const pokeNumber =`#${pokemon.id.toString().padStart(4, '0')}`

  
    return (
      <div className="flex-1 w-full rounded-lg border border-[#02010a] bg-[#e9e7e7]  pt-4 pb-4 px-2 sm:px-7 md:px-14 backdrop-blur-lg backdrop-filter sm:w-full h-fit mt-10 dark:bg-[#202020] ">
        
       
        <Skeleton className='rounded-lg w-56 mx-auto  dark:bg-transparent' isLoaded={isLoaded}>
    
      <h1 className="italic text-center text-5xl font-inter font-semibold mb-8 xl:mb-5">{pokeNumber}</h1>
    
  </Skeleton>
       

        <div className='flex w-auto  sm:gap-y-4 flex-col md:justify-center md:items-center mb-2 h-full justify-start    xl:flex-row xl:gap-x-10 '>
          
          {/* Carta de pokemon */}
          
            
            
              
                <InfoCard pokemon={pokemon} specie={specie} isLoaded={isLoaded}/>
              
            
          

          <div className=' w-full items-center mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 sm:items-start justify-center md:w-full'>
            
              
              {/* Tabla de datos de entrenamiento */}

              
              
                <Skeleton className='rounded-lg dark:bg-transparent' isLoaded={isLoaded}>
                  <TrainingTable pokemon={pokemon} specie={specie}/>
                </Skeleton>
              

              {/* Tabla de misc */}
              <Skeleton className='rounded-lg dark:bg-transparent' isLoaded={isLoaded}>

                <div className='w-full h-full'>
                <h2 className=' text-left text-2xl font-inter pl-2 font-bold mb-2'>Miscelánea</h2>
                  <Table className='mt-4' isStriped hideHeader aria-label="Example static collection table">
                    <TableHeader>
                      <TableColumn>NAME</TableColumn>
                      <TableColumn>ROLE</TableColumn>
                
                    </TableHeader>
                    <TableBody>
                    <TableRow key='1' >
                            <TableCell className='font-semibold'>Introducido en: </TableCell>
                            <TableCell >{generationTranslate[specie.generation.name]} </TableCell>
                        </TableRow>
                        <TableRow key='2' >
                            <TableCell className='font-semibold'>Habitat: </TableCell>
                            <TableCell >{specie.habitat !== null ?  <span>{habitatTranslate[specie.habitat?.name]}</span> : <span>Desconocido</span>} </TableCell>
                        </TableRow>
                    <TableRow key='3' >
                            <TableCell className='font-semibold'>Nombres: </TableCell>
                            <TableCell>
                              <ul>
                                  <li className='flex items-center gap-x-1'>
                                        <Image width={20} alt='viva México' src="https://img.icons8.com/?size=512&id=22439&format=png" /> {specie.names[6].name}
                                  </li>
                                  <li className='flex items-center gap-x-1'>
                                  <Image   width={20} height={20} alt="french flag" src="https://img.icons8.com/?size=512&id=15497&format=png" /> {specie.names[4].name}
                                  </li>
                                  <li className='flex items-center gap-x-1'>
                                  <Image   width={20} height={20} alt="german flag" src="https://img.icons8.com/?size=512&id=15502&format=png" /> {specie.names[5].name}
                                  </li>
                                  
                                  
                                  <li className='flex items-center gap-x-1'>
                                  <Image  width={20} height={20} alt="japan flag" src="https://img.icons8.com/?size=512&id=22435&format=png" /> {specie.names[0].name}
                                  </li>
                                  <li className='flex items-center gap-x-1'>
                                  <Image   width={20} height={20} alt="japan flag" src="https://img.icons8.com/?size=512&id=22435&format=png" /> {specie.names[1].name}
                                  </li>
                                  
                              </ul>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                  </Table>
                </div>

              </Skeleton>

              {/* Tabla de crianza */}
              <Skeleton className='rounded-lg dark:bg-transparent' isLoaded={isLoaded}>
                <HatchTable specie={specie}/>
              </Skeleton>

              {/* Componente de probabilidad de captura */}
              <Skeleton className='rounded-lg dark:bg-transparent' isLoaded={isLoaded}>
                <CatchRateTable pokemonHP={pokemon.stats[0].base_stat} captureRate={specie.capture_rate}/>
              </Skeleton>

              



          </div>

         

        </div>

        <div className='flex flex-col items-center gap-y-4 lg:flex-row gap-x-6 lg:items-start justify-center mt-4'>

          {/* Tabla de estadísticas */}

          

            <div className=' w-full sm:w-full lg:w-4/6'>

              <Skeleton className='rounded-lg dark:bg-transparent' isLoaded={isLoaded}>

                <h2 className='text-left text-2xl font-inter font-bold mb-2'>Estadísticas base</h2>
                <Table  className='w-full h-full' aria-label="Example static collection table">
                      <TableHeader>
                <TableColumn  className='w-1'>STAT</TableColumn>
                <TableColumn className='w-1'>VALOR</TableColumn>
                <TableColumn  align='center'>GRÁFICO</TableColumn>
                      </TableHeader>
                      <TableBody>
                { pokemon.stats.map((stat, index) => <TableRow key={index}>
                  <TableCell  >{statTranslations[stat.stat.name]}</TableCell>
                  <TableCell className='text-right'>{stat.base_stat}</TableCell>
                  <TableCell>
                  <Progress
                  size='lg'
                  radius='sm'
                  aria-label="Stat graphic"
                  value={stat.base_stat}
                  maxValue={180}
                   className="w-full"
                   classNames={{
                    indicator: statRanker(stat.base_stat),
                    }}/>
                   </TableCell>
                </TableRow>)}
                <TableRow>
                  <TableCell><strong>Total</strong></TableCell>
                  <TableCell className='text-right'> <strong>{pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}</strong> </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                      </TableBody>
                    </Table>

              </Skeleton>

            </div>

          
        
        {/* Tabla de debilidades */}
        <div className='items-center justify-center w-fit lg:w-2/6 xl:w-2/6'>
          
            <Skeleton className='rounded-lg dark:bg-transparent' isLoaded={isLoaded}>
              <h2 className='static text-left text-2xl font-inter font-bold mb-2'>Resistencias y debilidades</h2>
              
              {Array.isArray(weaknesses) ? (
                weaknesses.length === 1 ? (
                  <DefensesTable weaknesses={weaknesses[0].ability.multipliers} />
                ) : (
              
                    <Tabs fullWidth size='sm' className='w-full' variant='bordered' aria-label='Defense Tables'>
                      {weaknesses.map((ability) => (
                        <Tab key={ability.ability.name} title={ability.ability.name}>
                          <DefensesTable weaknesses={ability.ability.multipliers} />
                        </Tab>
                      ))}
                    </Tabs>
              
                )
              ) : (
                typeof weaknesses === 'object' && <DefensesTable weaknesses={weaknesses} />
              )}
            </Skeleton>
            
          

        </div>
        

        </div>

        <div className='w-auto my-4'>
          
            <Skeleton className='rounded-lg dark:bg-transparent' isLoaded={isLoaded}>
              <EvolutionChain chainData={evolutionChain} getPokeInfo={getPokeInfo}/>
            </Skeleton>
          
        </div>

      </div>
      
    );
}
  
  export default PokeCard