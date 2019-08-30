const initState = {
    pokemons:[]
}

const pokemonReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_POKEMONS_SUCCESS':
            return ({
                    pokemons:action.pokemons
            })
        case 'GET_POKEMONS_ERROR':

            return state;
        default:
            return state;
    }
};

export default pokemonReducer;