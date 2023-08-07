import Image from 'next/image'
import TypeIcon from './TypeIcon';

const PokeCard = ({pokemon, specie}) => {
  
    return (
      <div className="flex-1 break-inside-avoid rounded-lg border border-[#02010a] bg-[#f4effa] bg-clip-padding pt-2 p-6 pb-4 backdrop-blur-lg backdrop-filter w-3/4 h-fit mt-10">
        <h1 className="text-center text-4xl font-inter font-semibold mb-5">{pokemon.name.toUpperCase()}</h1>

        <div className='flex-between items-center justify-center pr-40'>
          <Image alt='official pokemon artwork' src={pokemon.sprites.other['official-artwork'].front_default} width="350" height="350" quality={100}/>
          <div>
            <h2 className='text-left text-lg font-inter font-bold mb-2'>Datos básicos</h2>
            <table className='text-left border-collapse border-y border-gray-300 '>
            <tbody className='divide-y divide-gray-300' >
              <tr>
                <th>Tipo: </th>
                <td > 
                  {pokemon.types.map((type, index) => <TypeIcon key={index} type={type}/>)}
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
                      <Image className='drop-shadow-sm'  width={20} height={20} alt='spain flag' src='/../public/assets/icons/spain-flag.png' />  {specie.names[6].name}
                    </div>
                <div className="flex items-center space-x-2">
                <Image className='drop-shadow-sm'  width={20} height={20} alt="french flag" src="/../public/assets/icons/french-flag.png" />
                {specie.names[4].name}
                </div>
              
              <div className="flex items-center space-x-2">
                <Image className='drop-shadow-sm'  width={20} height={20} alt="german flag" src="/../public/assets/icons/german-flag.png" />
                {specie.names[5].name}
              </div>

              <div className="flex items-center space-x-2">
                <Image className='drop-shadow-lg' width={20} height={20} alt="japan flag" src="/../public/assets/icons/japan-flag.png" />
                {specie.names[0].name}
              </div>
              
              <div className="flex items-center space-x-2">
                <Image className='drop-shadow-lg'  width={20} height={20} alt="japan flag" src="/../public/assets/icons/japan-flag.png" />
                {specie.names[1].name}
              </div>
              
                </td>
              </tr>
            </tbody>
          </table>

          </div>

        </div>
      </div>
      
    );
}
  
  export default PokeCard