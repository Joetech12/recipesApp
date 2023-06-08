import axios from "axios"

export const getRecipesList = async (tags = null, size) => {
    const options = {
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/recipes/list',
        params: { from: '0', size: size || '20', tags },
        headers: {
            'X-RapidAPI-Key': 'bf390c673emsh83652c0dd53042ap13c3f6jsn19f6305ab20f',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
    return await axios.request(options)
}