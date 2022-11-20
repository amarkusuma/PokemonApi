import fetch from 'node-fetch';

export const PokemonList = async (req, res) => {
    try {
        const apiResponse = await fetch(`${process.env.API_URL}` )
        const apiResponseJson = await apiResponse.json()
        
        res.send(apiResponseJson);

    } catch (err) {
        console.log(err)
        res.status(500).send('Something went wrong')
    }
}

export const PokemonDetail = async (req, res) => {
    try {
        
        const { name } = req.params;
        const apiResponse = await fetch(`${process.env.API_URL}/${name}` )
        const apiResponseJson = await apiResponse.json()
        
        res.send(apiResponseJson);

    } catch (err) {
        console.log(err)
        res.status(500).send('Something went wrong')
    }
}