import axios from 'axios'

const getChain = async (url) => {
    
    const response = await axios.get(url)
    
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getChain }