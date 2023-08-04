

const PokeCard = ({pokemon}) => {
  
    
    return (
      <>
      <div>{pokemon.name}</div>
      <div>{pokemon.types[0].type.name}</div>
      </>
      
    );
}
  
  export default PokeCard