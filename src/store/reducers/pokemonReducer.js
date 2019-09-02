const initState = {
    pokemons:[],
    selectedPokemonName:""
}

const pokemonReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_POKEMONS_SUCCESS':
            return ({
                    ...state,
                    pokemons:action.pokemons
            })
        case 'GET_POKEMONS_ERROR':

            return state;
        case 'SELECTED_POKEMON_NAME':

            return ({
              ...state,
                selectedPokemonName:action.selectedPokemonName
            })
        default:
            return state;
    }
};

export default pokemonReducer;