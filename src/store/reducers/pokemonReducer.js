const initState = {
    pokemons:[],
    selectedPokemonName:"",
    loading:'loading'
}

const pokemonReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_POKEMONS_SUCCESS':
            return ({
                    ...state,
                    pokemons:action.pokemons,
                    loading: ''
            })
        case 'GET_POKEMONS_ERROR':

            return state;
        case 'SELECTED_POKEMON_NAME':

            return ({
              ...state,
                selectedPokemonName:action.selectedPokemonName
            })
        case 'GET_POKEMON_BY_NAME_SUCCESS':

            return ({
                ...state,
                pokemons:action.pokemons,
                loading: 'single-pokemon'
            })
        default:
            return state;
    }
};

export default pokemonReducer;