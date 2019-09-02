import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PokemonCard from './pokemon-card'
import { connect } from 'react-redux'
import {getPokemons} from "../../store/actions/pokemonsActions";
import {saveSelectPokemon} from "../../store/actions/pokemonsActions";


class PokemonList extends Component {
    state = {
        cards:[1,2,3]
    }

    goToProfile = (event, selectedPokemonName ) => {
        this.props.saveSelectPokemon(selectedPokemonName)
        this.props.history.push('/profile')
    }

    render() {

        const { auth, pokemonsData } = this.props;
        if (auth.email === "") return <Redirect to='/' />


        if(pokemonsData.length === 0){
            return (
                <div className="container pokmon-list">
                    <div className="row">
                        <div className="col-12">
                            <h5 className="">Become a Pokémon master!</h5>
                            <p>Loading...</p>
                        </div>
                    </div>

                </div>
            )
        }else{
            return (
                <div className="container pokmon-list">
                    <div className="row">
                        <div className="col-12">
                            <h5 className="">Become a Pokémon master!</h5>
                            <div className="row cards-container">
                                {
                                    pokemonsData.map((card,index)=>{
                                        return(
                                            <PokemonCard parentFunc={this.goToProfile} key={index}  pInfo={card}  />
                                        )
                                    })
                                }

                            </div>

                        </div>
                    </div>
                    <div className="refresh">
                        <button onClick={this.props.getPokemons}>Refresh</button>
                    </div>

                </div>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {

        auth: state.auth,
        pokemonsData: state.pokemonsData.pokemons,
        selectedPokemonName: state.pokemonsData.selectedPokemonName
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        getPokemons: () => dispatch(getPokemons()),
        saveSelectPokemon: (pokemonName) => dispatch(saveSelectPokemon(pokemonName))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PokemonList)
