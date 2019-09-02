import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from "react-redux";

class Profile extends Component {
    state = {

    }

    render() {

        const { auth, pokemonsData, selectedPokemonName } = this.props;
        if (selectedPokemonName === "") return <Redirect to='/pokemon-list' />

        let selectedPokemonData

        pokemonsData.map((pokemon)=>{
            if(pokemon.name.trim() === selectedPokemonName.trim()){
                selectedPokemonData = pokemon
            }
        })

        if(selectedPokemonData === undefined){
            return <Redirect to='/pokemon-list' />
        }

        return (
            <div className="container profile">
                <div className="row">
                    <div className="col-12">
                        <h5 className="">You've created your profile</h5>
                        <div className={"card-profile " + selectedPokemonData.types[0].type.name}>
                            <div>
                                <div className="header-card">
                                    <div className="title">
                                        <p>Your Pokémon</p>
                                        <p>{selectedPokemonName}</p>
                                    </div>
                                    <div className="pokemon-img">
                                        <img src={selectedPokemonData.img} alt=""/>
                                    </div>
                                </div>
                                <div className="use-data">
                                    <div><span>Name</span><span>{auth.firstName}</span></div>
                                    <div><span>Surname</span><span>{auth.lastName}</span></div>
                                    <div><span>Gender</span><span>{auth.gender}</span></div>
                                    <div><span>Email</span><span>{auth.email}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {

        auth: state.auth,
        pokemonsData: state.pokemonsData.pokemons,
        selectedPokemonName: state.pokemonsData.selectedPokemonName
    }
}

export default connect(mapStateToProps, null)(Profile)
