// import '@styles/globals.css';
import '../styles/globals.css'


export const metadata = {
    title: 'Pokedex by bijat',
    description: 'National pokedex powered by PokeAPI',
    icon: '/icon.png'
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        
        <body className='bg-[#10002b]'>
            <div className='main'>
                <div className='gradient'/>
            </div>
            <main className='app'>
                {children}
            </main>
        </body>

    </html>
  )
}

export default RootLayout