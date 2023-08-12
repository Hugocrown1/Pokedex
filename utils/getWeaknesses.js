import typesService from '@services/types'


const getWeaknesses = async (pokemonTypes) => {
    const damageMultipliers = {};
  
    const applyDamage = (damageType, multiplier) => {
      damageType.forEach((type) => {
        if (type.name in damageMultipliers) {
          damageMultipliers[type.name] *= multiplier;
        } else {
          damageMultipliers[type.name] = multiplier;
        }
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
    return damageMultipliers
  };
  

export default getWeaknesses