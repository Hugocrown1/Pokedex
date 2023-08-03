import axios from 'axios'
const baseUrl = 'https://pokeapi.co/api/v2/pokedex/1/'

const getAll = async () => {
    const response = await axios.get(`${baseUrl}`)
    return response.data.pokemon_entries
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }