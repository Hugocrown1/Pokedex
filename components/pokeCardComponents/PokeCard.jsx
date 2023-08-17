// import Image from 'next/image'
import TypeIcon from './TypeIcon';
import { statTranslations, eggGroupTranslations, growthRateTranslations } from '@utils/translator';
import statRanker from '@utils/statRanker';
import captureRate from '@utils/captureRate';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";

import {Tabs, Tab} from "@nextui-org/tabs";
import {Image} from "@nextui-org/image";

import { pokemonTypes } from '@utils/pokeTypes';
import { cardStyleMapping } from '@utils/pokeTypes';
import {CircularProgress} from "@nextui-org/progress";

import {Progress} from "@nextui-org/progress";
import {Chip} from "@nextui-org/chip";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
// import {Image} from "@nextui-org/image";
import { DefensesTable } from './DefensesTable';

const PokeCard = ({pokemon, specie, weaknesses}) => {
  


  const pokeNumber =`#${pokemon.id.toString().padStart(4, '0')}`

  const cardStyle = cardStyleMapping[pokemon.types[0].type.name];

  let captureProb = captureRate(pokemon.stats[0].base_stat, specie.capture_rate)

  
  
  
    return (
      <div className="flex-1 break-inside-avoid rounded-lg border border-[#02010a] bg-[#e9e7e7] bg-clip-padding pt-4 pb-4 px-14 backdrop-blur-lg backdrop-filter w-full h-fit mt-10 dark:bg-[#202020]">
        
        <h1 className="italic text-center text-5xl font-inter font-semibold mb-5">{pokeNumber}</h1>

        <div className='flex  justify-start gap-x-8 items-center  h-full'>
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

            {/* cambia estilo */}
            <Card className={cardStyle.border}>
            
              <CardBody className="overflow-visible justify-end items-center py-8">

              
                <h3 className='font-semibold text-3xl tracking-wider text-center' >{pokemon.species.name.toUpperCase()}</h3>
                
                {/* cambia estilo */}
                <Divider className={cardStyle.divider}/>

                <h3 className='font-semibold'>{specie.genera[5].genus}</h3>
              
              
              </CardBody>
              <CardFooter className='justify-center'>
                <div className='flex flex-row'>

                  <div className='flex flex-col items-center'>
    
                    <h3 className='font-semibold'>{(pokemon.height * 0.1).toFixed(1)} m</h3>

                      {/* cambia estilo */}
                    <Chip className={cardStyle.chip} variant="shadow"><span className='font-semibold'>Altura</span></Chip>
                  </div>

                  <Divider orientation="vertical" className='mx-2  h-auto bg-gray-600'/>

  
                  <div className='flex flex-col items-center'>
    
                    <div className='flex flex-row mb-1'>{pokemon.types.map((type, index) => <TypeIcon key={index} type={type.type.name}/>)}</div>

                      {/* cambia estilo */}
                    <Chip className={cardStyle.chip} variant="shadow"><span className='font-semibold'>Tipo</span></Chip>
                  </div>

                  <Divider orientation="vertical" className='mx-2  h-auto bg-gray-600'/>
    
                  <div className='flex flex-col items-center'>
    
                    <h3 className='font-semibold'>{(pokemon.weight * 0.1).toFixed(1)} kg</h3>

                    {/* cambia estilo */}
                    <Chip className={cardStyle.chip} variant="shadow"><span className='font-semibold'>Peso</span></Chip>
                  </div>

                </div>


              </CardFooter>
            </Card>

          </div>

          <div className='flex flex-col'>
            <div className='flex flex-row gap-x-4 items-center'>
              <div className='flex flex-col font-semibold'>
              <h2 className=' text-left text-2xl font-inter pl-2 font-bold mb-2'>Datos</h2>
                  <Table isSticky isStriped className='text-left w-full font-semibold' hideHeader aria-label="Misc table">
                      <TableHeader>
                        <TableColumn>DATO</TableColumn>
                        <TableColumn>INFO</TableColumn>
                      </TableHeader>
                    <TableBody >
                    <TableRow key="1">
                        <TableCell className='font-semibold'>Habilidades: </TableCell>
                        <TableCell>
                        {pokemon.abilities.map((ability, index) => (
                      <span key={ability.ability.url}>
                        {ability.is_hidden ? (
                          <>
                            {ability.ability.name} (oculta)
                            {index !== pokemon.abilities.length - 1 && <br/>}
                          </>
                        ) : (
                          <>
                             {index+1}. {ability.ability.name}
                            {index !== pokemon.abilities.length - 1 && <br/>}
                          </>
                        )}
                      </span>
                    ))}
                        </TableCell>
                      </TableRow>
            
                      <TableRow key='2'>
                          <TableCell className='font-semibold'>Exp. Base: </TableCell>
                          <TableCell>{pokemon.base_experience}</TableCell>
                      </TableRow>
                      <TableRow key='3'>
                          <TableCell className='font-semibold'>Amistad: </TableCell>
                          <TableCell>{specie.base_happiness}</TableCell>
                      </TableRow>
            
                      <TableRow key='4'>
                          <TableCell className='font-semibold'>Crecimiento: </TableCell>
                          <TableCell>{ growthRateTranslations[specie.growth_rate.name]}</TableCell>
                      </TableRow>
            
                      <TableRow key='5' >
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
              <div>
                <h2 className=' text-left text-2xl pl-2 font-inter font-bold mb-2'>Prob. de captura</h2>
            
                    <Card className="w-[200px] h-[200px] border-none ">
                <CardBody className="justify-center items-center pb-0">
                  <CircularProgress
                    size='sm'
                    color={captureProb < 20 ? (captureProb < 10 ? 'danger' : 'warning') : 'success'}
                    classNames={{
                      svg: "w-32 h-32 drop-shadow-md",
            
                      track: "stroke-white/10",
            
            
            
                      value: "text-3xl font-semibold text-white",
                    }}
                    // Se manda la vida y la tasa de captura del pokemon
                    value={captureProb}
            
            
                    formatOptions= {{style: 'unit', unit: 'percent'}}
                    strokeWidth={4}
                    showValueLabel={true}
                  />
                </CardBody>
                <CardFooter className="justify-center items-center pt-0">
                  <Chip
                    classNames={{
                      base: "border-1 border-white/30",
                      content: "text-white/90 text-small font-semibold",
                    }}
                    variant="bordered"
                  >
                    Tasa de captura: {specie.capture_rate}
                  </Chip>
                </CardFooter>
                        </Card>
                        <h3 className='text-sm font-medium mt-2 pl-2 text-[#9e9e9e] italic'>Vida llena y usando PokeBall</h3>
            
              </div>
              </div>
              {/* Tabla de crianza */}
              <div className='w-fit'>
              <h2 className=' text-left text-2xl pl-2 font-inter font-bold mb-2'>Crianza</h2>
                    <Table hideHeader aria-label="Example static collection table">
                  <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell>Grupos huevo: </TableCell>
                      <TableCell className='text-left'>
                        {specie.egg_groups.map((group, index) => (
                          index === (specie.egg_groups.length - 1) ?  <span key={index}>{eggGroupTranslations[group.name]}</span> : <span key={index}>{eggGroupTranslations[group.name]}, </span>
                        ))}
                      </TableCell>
                    </TableRow>
                    <TableRow key="2">
                      <TableCell >Genero: </TableCell>
                      <TableCell >
                      
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
          </div>



          

         

        </div>
        <div className='flex gap-x-6 items-start mt-4'>

          {/* Tabla de estadísticas */}
          <div className='w-4/6'>
            <h2 className='text-left text-2xl font-inter font-bold mb-2'>Estadísticas base</h2>
            <Table  className='w-full h-full' aria-label="Example static collection table">
                  <TableHeader>
            <TableColumn width={15}>STAT</TableColumn>
            <TableColumn width={20}>VALOR</TableColumn>
            <TableColumn align='center'>GRÁFICO</TableColumn>
                  </TableHeader>
                  <TableBody>
            { pokemon.stats.map((stat, index) => <TableRow key={index}>
              <TableCell >{statTranslations[stat.stat.name]}</TableCell>
              <TableCell className='text-right'>{stat.base_stat}</TableCell>
            
              <TableCell>
              <Progress
              size='lg'
              radius='sm'
              aria-label="Stat graphic"
              value={stat.base_stat}
              maxValue={180}
               className="max-w "
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
          </div>
        
        {/* Tabla de debilidades */}
        <div className='w-2/6'>
          
            <h2 className='static text-left text-2xl font-inter font-bold mb-2'>Resistencias y debilidades</h2>
            
            {Array.isArray(weaknesses) ? (
              weaknesses.length === 1 ? (
                <DefensesTable weaknesses={weaknesses[0].ability.multipliers} />
              ) : (
                
                  <Tabs size='sm' className='w-fit' variant='bordered' aria-label='Defense Tables'>
                    {weaknesses.map((ability) => (
                      <Tab key={ability.ability.name} title={ability.ability.name + ' ability'}>
                        <DefensesTable weaknesses={ability.ability.multipliers} />
                      </Tab>
                    ))}
                  </Tabs>
                
              )
            ) : (
              typeof weaknesses === 'object' && <DefensesTable weaknesses={weaknesses} />
            )}
            
          

        </div>

        </div>

      </div>
      
    );
}
  
  export default PokeCard