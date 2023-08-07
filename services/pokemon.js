import axios from 'axios'
const baseUrl = 'https://pokeapi.co/api/v2'

const getByName = async (name) => {
    const response = await axios.get(`${baseUrl}/pokemon/${name}`)
    return response.data
}

const getSpecie = async (name) => {
    const response = await axios.get(`${baseUrl}/pokemon-species/${name}`)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getByName, getSpecie }