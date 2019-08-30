import authReducer from './authReducer'
import pokemonReducer from './pokemonReducer'
import { combineReducers } from 'redux'


const rootReducer = combineReducers({
  auth: authReducer,
  pokemonsData: pokemonReducer,

});

export default rootReducer

// the key name will be the data property on the state object