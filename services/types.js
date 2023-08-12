import axios from 'axios'
const baseUrl = 'https://pokeapi.co/api/v2/type'

const getByName = async (typeName) => {
    const response = await axios.get(`${baseUrl}/${typeName}`)
    return response.data.damage_relations
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getByName }