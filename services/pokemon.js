import axios from 'axios'
const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

const getByName = async (name) => {
    const response = await axios.get(`${baseUrl}/${name}`)
    return response.data
    
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getByName }