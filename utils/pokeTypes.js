const typeIconMapping = {
    dragon: 'type-icon type-dragon',
    flying: 'type-icon type-flying',
    normal: 'type-icon type-normal',
    fire: 'type-icon type-fire',
    water: 'type-icon type-water',
    grass: 'type-icon type-grass',
    electric: 'type-icon type-electric',
    ice: 'type-icon type-ice',
    fighting: 'type-icon type-fighting',
    poison: 'type-icon type-poison',
    ground: 'type-icon type-ground',
    psychic: 'type-icon type-psychic',
    bug: 'type-icon type-bug',
    rock: 'type-icon type-rock',
    ghost: 'type-icon type-ghost',
    dark: 'type-icon type-dark',
    steel: 'type-icon type-steel',
    fairy: 'type-icon type-fairy'
  };

  export const cardStyleMapping = {
    dragon: { border: 'dragon-card pokemon-card', divider: 'card-divider dragon-divider', chip: 'card-chip dragon-chip' },
    water: { border: 'water-card pokemon-card', divider: 'card-divider water-divider', chip: 'card-chip cyan-chip' },
    steel: { border: 'steel-card pokemon-card', divider: 'card-divider steel-divider', chip: 'card-chip gray-chip' },
    grass: { border: 'grass-card pokemon-card', divider: 'card-divider grass-divider', chip: 'card-chip blood-chip' },
    fire: { border: 'fire-card pokemon-card', divider: 'card-divider fire-divider', chip: 'card-chip red-chip' },
    electric: { border: 'electric-card pokemon-card', divider: 'card-divider electric-divider', chip: 'card-chip red-chip' },
    psychic: { border: 'psychic-card pokemon-card', divider: 'card-divider psychic-divider', chip: 'card-chip white-chip' },
    ice: { border: 'ice-card pokemon-card', divider: 'card-divider ice-divider', chip: 'card-chip white-chip' },
    rock: { border: 'rock-card pokemon-card', divider: 'card-divider rock-divider', chip: 'card-chip brown-chip' },
    ground: { border: 'ground-card pokemon-card', divider: 'card-divider ground-divider', chip: 'card-chip cyan-chip' },
    flying: { border: 'flying-card pokemon-card', divider: 'card-divider flying-divider', chip: 'card-chip white-chip' },
    fighting: { border: 'fighting-card pokemon-card', divider: 'card-divider fighting-divider', chip: 'card-chip brown-chip' },
    normal: { border: 'normal-card pokemon-card', divider: 'card-divider normal-divider', chip: 'card-chip brown-chip' },
    ghost: { border: 'ghost-card pokemon-card', divider: 'card-divider ghost-divider', chip: 'card-chip blood-chip' },
    poison: { border: 'poison-card pokemon-card', divider: 'card-divider poison-divider', chip: 'card-chip yellow-chip' },
    bug: { border: 'bug-card pokemon-card', divider: 'card-divider bug-divider', chip: 'card-chip yellow-chip' },
    dark: { border: 'dark-card pokemon-card', divider: 'card-divider dark-divider', chip: 'card-chip blood-chip' },
    fairy: { border: 'fairy-card pokemon-card', divider: 'card-divider fairy-divider', chip: 'card-chip cyan-chip' },
  };
  

  export const allPokemonTypes = ['steel', 'water', 'bug', 'dragon', 'electric', 'ghost', 'fire', 'fairy',
  'ice', 'fighting', 'normal', 'grass', 'psychic', 'rock', 'dark', 'ground',
  'poison', 'flying']

  export const pokemonTypes = {
    firstBatch: [
      'steel', 'water', 'bug', 'dragon', 'electric', 'ghost', 'fire', 'fairy',
      'ice'
    ],

    secondBatch: [
        'fighting', 'normal', 'grass', 'psychic', 'rock', 'dark', 'ground',
        'poison', 'flying'
    ]

  }

  
  export default typeIconMapping