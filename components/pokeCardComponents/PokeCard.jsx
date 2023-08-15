// import Image from 'next/image'
import TypeIcon from './TypeIcon';
import { statTranslations } from '@utils/translator';
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
import {Image} from "@nextui-org/image";

import { pokemonTypes } from '@utils/pokeTypes';
import { cardStyleMapping } from '@utils/pokeTypes';

import {Progress} from "@nextui-org/progress";
import {Chip} from "@nextui-org/chip";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
// import {Image} from "@nextui-org/image";
import { DefensesTable } from './DefensesTable';

const PokeCard = ({pokemon, specie, weaknesses}) => {


  const pokeNumber =`#${pokemon.id.toString().padStart(4, '0')}`

  const cardStyle = cardStyleMapping[pokemon.types[0].type.name];

  
  
  
    return (
      <div className="flex-1 break-inside-avoid rounded-lg border border-[#02010a] bg-[#e9e7e7] bg-clip-padding pt-4 pb-4 px-14 backdrop-blur-lg backdrop-filter w-full h-fit mt-10 dark:bg-[#202020]">
        
        <h1 className="italic text-center text-5xl font-inter font-semibold mb-5">{pokeNumber}</h1>

        <div className='flex  justify-start gap-x-20 items-center  h-full'>
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
          
          
          {/* Tabla de datos básicos */}
          <div>
            <h2 className=' text-left text-2xl font-inter font-bold mb-2'>Datos básicos</h2>
            <table className='text-left border-collapse border-y border-gray-300 w-full'>
            <tbody className='divide-y divide-gray-300' >
              <tr>
                <th>Tipo: </th>
                <td className='type-icon-cell' > 
                  {pokemon.types.map((type, index) => <TypeIcon key={index} type={type.type.name}/>)}
                </td>
              </tr>
              <tr>
                <th>Especie: </th>
                <td>{specie.genera[5].genus}</td>
              </tr>
              <tr>
                <th>Altura: </th>
                <td>{(pokemon.height * 0.1).toFixed(1)} m</td>
              </tr>
              <tr >
                <th >Peso: </th>
                <td>{(pokemon.weight * 0.1).toFixed(1)} kg</td>
              </tr>
              <tr>
                <th className='pr-3'>Habilidades: </th>
                <td>
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
                </td>
              </tr>
              <tr>
                <th>Nombres: </th>
                <td>
    
                    
                    <div className="flex items-center space-x-2">
                      <Image className='drop-shadow-sm'  width={20} height={20} alt='viva México' src='/../public/assets/icons/mexico.png' />  {specie.names[6].name}
                    </div>
                <div className="flex items-center space-x-2">
                <Image className='drop-shadow-sm'  width={20} height={20} alt="french flag" src="/../public/assets/icons/french.png" />
                {specie.names[4].name}
                </div>
              
              <div className="flex items-center space-x-2">
                <Image className='drop-shadow-sm'   width={20} height={20} alt="german flag" src="/../public/assets/icons/german.png" />
                {specie.names[5].name}
              </div>

              <div className="flex items-center space-x-2">
                <Image className='drop-shadow-lg'  width={20} height={20} alt="japan flag" src="/../public/assets/icons/japan.png" />
                {specie.names[0].name}
              </div>
    
              <div className="flex items-center">
                <Image  className='drop-shadow-lg'  width={20} height={20} alt="japan flag" src="/../public/assets/icons/japan.png" />
                {specie.names[1].name}
              </div>
              
                </td>
              </tr>
            </tbody>
          </table>
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