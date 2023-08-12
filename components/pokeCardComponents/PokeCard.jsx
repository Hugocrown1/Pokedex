import Image from 'next/image'
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

import { pokemonTypes } from '@utils/pokeTypes';

import {Progress} from "@nextui-org/progress";

const PokeCard = ({pokemon, specie, weaknesses}) => {

  const weaknessProvider = (type) => {
    
    const multiplierMap = {
      1: { value: 1, style: 'type-fx-cell type-fx-100' },
      2: { value: 2, style: 'type-fx-cell type-fx-200' },
      4: { value: 4, style: 'type-fx-cell type-fx-400' },
      0.5: { value: '½', style: 'type-fx-cell type-fx-50' },
      0.25: { value: '¼', style: 'type-fx-cell type-fx-25' },
      0: { value: 0, style: 'type-fx-cell type-fx-0' }
    };
  
    const multiplier = type in weaknesses ? weaknesses[type] : 1;
  
    return multiplierMap[multiplier];
  };
  
    return (
      <div className="flex-1 break-inside-avoid rounded-lg border border-[#02010a] bg-[#f4effa] bg-clip-padding pt-2 pb-4 px-14 backdrop-blur-lg backdrop-filter w-full h-fit mt-10">
        <h1 className="text-center text-4xl font-inter font-semibold mb-5">{pokemon.name.toUpperCase()}</h1>

        <div className='flex justify-center gap-x-24 items-center'>
          <Image alt='official Pokémon artwork' src={pokemon.sprites.other['official-artwork'].front_default} width="350" height="350" quality={100}/>
          
          {/* Tabla de datos basicos */}
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
        <div className='flex gap-x-6 items-center'>

          <div className='w-4/6'>
            <h2 className='text-left text-2xl font-inter font-bold mb-2'>Estadísticas base</h2>
            <Table  className='w-full' aria-label="Example static collection table">
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
        <div className='w-auto'>
          <h2 className='text-left text-2xl font-inter font-bold mb-2'>Resistencias y debilidades</h2>

          <div className='flex justify-center items-center gap-x-4 bg-white py-5 rounded-lg shadow-2xl'>
            <table>
              <tbody>
                {pokemonTypes.firstBatch.map((type, index) =>{ 
                  const { style, value } = weaknessProvider(type)
                
                return <tr key={index}>
                <th>
                  <TypeIcon type={type}/>
                </th>
                <td className={style}><span className='font-thin text-xs'>x</span>{value}</td>
                </tr>})}
              </tbody>
            </table>

            <table>
              <tbody>
                {pokemonTypes.secondBatch.map((type, index) => {
                  const { style, value } = weaknessProvider(type)
                
                return <tr key={index}>
                <th>
                  <TypeIcon type={type}/>
                </th>
                <td className={style}><span className='font-thin text-xs'>x</span>{value}</td>
                </tr>})}
              </tbody>
            </table>
          </div>

        </div>

        </div>

      </div>
      
    );
}
  
  export default PokeCard