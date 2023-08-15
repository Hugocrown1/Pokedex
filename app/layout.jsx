
import '../styles/globals.css'
import {Providers} from "./providers";



export const metadata = {
    title: 'Pokedex by bijat',
    description: 'National pokedex powered by PokeAPI',
    icon: '/icon.png'
}

const RootLayout = ({children}) => {
  return (
    <html lang="en" className='dark' >
        
        
          <body>
          
          
          
            
                      <div className='main bg-[#0c0c0c]'>
                          <div className='gradient'/>
                      </div>
                      <main className='app '>
            
                              <Providers>
                                {children}
                              </Providers>
            
                      </main>
          
          
          
          
          </body>
        

    </html>
  )
}

export default RootLayout