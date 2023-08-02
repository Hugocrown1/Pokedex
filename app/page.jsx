import logo from '../public/assets/images/pokefondo.png'
import pikachu from '../public/assets/images/pikachu.gif'
import arcanine from '../public/assets/images/arcanine.gif'
import Image from 'next/image'
import Searcher from '@components/Searcher'



const Home = () => {
  
  
  return (
    <>
    
    <div className='flex flex-col items-center justify-center'>
      <div className="flex items-center justify-center mt-10 mb-10">
        <Image className="w-20 h-1/2" alt="Pikachu" src={pikachu} />
        <Image prority="true" className='w-1/2' alt="Pokelogo" src={logo} />
        <Image className="w-20 h-20" alt="Arcanine" src={arcanine} />
      </div>
      <Searcher/>
    </div>
    
    </>
  )
}

export default Home