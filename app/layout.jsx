import '@styles/globals.css';

export const metadata = {
    title: 'Pokedex',
    description: 'National pokedex powered by PokeAPI'

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