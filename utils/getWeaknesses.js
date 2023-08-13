import typesService from '@services/types'
import { allPokemonTypes } from './pokeTypes';

const immunityAbilities = [
    'motor-drive', 'water-absorb', 'levitate', 'volt-absorb', 'flash-fire', 'storm-drain','lightning-rod', 'grass-pelt', 'dry-skin', 'wonder-guard'
]

// Función que determina la inmunidad a aplicar dependiendo de la habilidad
const getImmunity = (abilityName, multipliersObject) => {
      
  // Inmunidad a electricidad
  if (abilityName === 'motor-drive' || abilityName === 'lightning-rod' || abilityName === 'volt-absorb'){
    multipliersObject.electric = 0
    
    // Inmunidad al agua
  } else if (abilityName === 'water-absorb' || abilityName === 'storm-drain') {
    multipliersObject.water = 0

    // Inmunidad a tipo tierra
  } else if(abilityName === 'levitate') {
    multipliersObject.ground = 0

    //inmunidad a tipo planta
  } else if (abilityName === 'grass-pelt') {
    multipliersObject.grass = 0

    // Inmunidad a todo menos a las debilidades
  } else if (abilityName === 'wonder-guard') {
    
    allPokemonTypes.forEach(type => {
      if(multipliersObject[type] !== 2)
        multipliersObject[type] = 0
    })

    // Inmunidad al fuego
  } else if (abilityName === 'flash-fire') {
    multipliersObject.fire = 0
  } else if (abilityName === 'dry-skin') {
    multipliersObject.water = 0
    multipliersObject.fire += (multipliersObject.fire* 0.25)
  }

  
  return multipliersObject
}




const getWeaknesses = async (pokemonTypes, abilities) => {
    const damageMultipliers = {};

    allPokemonTypes.forEach(type => {
      damageMultipliers[type] = 1
    })

    

    const abilitiesNames = abilities.map( ability => ability.ability.name)


    const applyDamage = (damageType, multiplier) => {
      damageType.forEach((type) => {
          damageMultipliers[type.name] *= multiplier;
        
      });
    };

    
    
    

    if (pokemonTypes.length > 1) {
      const [firstTypeData, secondTypeData] = await Promise.all([
        typesService.getByName(pokemonTypes[0].type.name),
        typesService.getByName(pokemonTypes[1].type.name),
      ]);

      
      applyDamage(firstTypeData.double_damage_from, 2);
      applyDamage(secondTypeData.double_damage_from, 2);
  
      applyDamage(firstTypeData.half_damage_from, 0.5);
      applyDamage(secondTypeData.half_damage_from, 0.5);
  
      applyDamage(firstTypeData.no_damage_from, 0);
      applyDamage(secondTypeData.no_damage_from, 0);

      
    } else {
      const typeData = await typesService.getByName(pokemonTypes[0].type.name)

      applyDamage(typeData.double_damage_from, 2);
      applyDamage(typeData.half_damage_from, 0.5);
      applyDamage(typeData.no_damage_from, 0);
    }
    


    if(immunityAbilities.some(ability => abilitiesNames.includes(ability))){
     
     
    // Aqui se comienza a crear el array con los multiplicadores por habilidad
    const multipliersPerAbility = [];
    abilitiesNames.forEach((abilityName) => {
      let multipliersObject = {...damageMultipliers}

      
      
      if(immunityAbilities.includes(abilityName)){
        
        multipliersObject = getImmunity(abilityName, multipliersObject)
      }

      const abilityMultipliers = {
        ability:{
          name: abilityName,
          multipliers : multipliersObject
        }
        
      }
        
      multipliersPerAbility.push( abilityMultipliers)
    })

    

    return multipliersPerAbility

    // Se regresa una lista con los multiplicadores ordenados por habilidad
    // return multipliersPerAbility
  }

    // Se regresan los multiplicadores tomando solo en cuenta los tipos
    return damageMultipliers
  };
  

export default getWeaknesses