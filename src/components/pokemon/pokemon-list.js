import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PokemonCard from './pokemon-card'
import { connect } from 'react-redux'
import {getPokemons, saveSelectPokemon ,getPokemonByName} from "../../store/actions/pokemonsActions";
import Arwos from '../../assets/arrow.svg';
import Search from '../../assets/search.svg';


class PokemonList extends Component {
    state = {
        searchState : {
            containerClass: '',
            placeholder: '',
            searchValue:'',
        },
        loading:''
    }

    goToProfile = (event, selectedPokemonName ) => {
        this.props.saveSelectPokemon(selectedPokemonName)
        this.props.history.push('/profile')
    }

    heandleSearch = () =>
    {

        if(this.state.searchState.searchValue === "" && this.state.searchState.containerClass === "")
        {
            this.setState(prevState => ({
                searchState: {
                    ...prevState.searchState,
                    containerClass: 'active',
                }


            }))

            setTimeout(()=>{
                this.setState(prevState => ({
                    searchState: {
                        ...prevState.searchState,
                        placeholder: 'Type a Pokémon name here....',
                    }


                }))
            },500)
        }else if(this.state.searchState.searchValue === "" && this.state.searchState.containerClass === "active") {
            this.setState(prevState => ({
                searchState: {
                    ...prevState.searchState,
                    containerClass: '',
                    placeholder: '',
                }
            }))
        }else  if(this.state.searchState.searchValue !== "" && this.state.searchState.containerClass === "active") {
            this.setState(prevState => ({
                ...prevState,
                searchState: {
                    ...prevState.searchState,
                    placeholder: 'Type another Pokémon name here....',
                    searchValue:"",
                },
                loading:'loading'

            }))
            this.props.getPokemonByName(this.state.searchState.searchValue)
        }

    }

    handleSearchInputChange = (e) =>
    {
        const value = e.target.value
        this.setState(prevState => ({
            searchState: {
                ...prevState.searchState,
                searchValue : value,
            }
        }))
    }

    handleGetPokemons = (e) =>
    {
        this.setState(prevState => ({
            ...prevState,
            searchState: {
                ...prevState.searchState,
                containerClass: '',
                placeholder: '',
                searchValue: ''
            },
            loading:'loading'
        }))

        this.props.getPokemons()
    }


    componentWillReceiveProps(nextProps) {
        this.setState(prevState => ({
            ...prevState,
            loading:nextProps.loading
        }))
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
        }else if(pokemonsData.length === 2 && pokemonsData[0] === false){
            return (
                <div className="container pokmon-list">
                    <div className="row">
                        <div className="col-12">
                            <h5 className="">Become a Pokémon master!</h5>
                            <div className="row search-container">
                                <div className="col-12">
                                    <div className={this.state.searchState.containerClass}>
                                        <input type="text" placeholder={this.state.searchState.placeholder} value={this.state.searchState.searchValue} onChange={this.handleSearchInputChange}/>
                                        <button onClick={this.heandleSearch}><img src={Search} alt="search"/></button>
                                    </div>
                                </div>
                            </div>
                            <div className={"row cards-container single-pokemon " + this.state.loading}>
                                <div className="col-12 col-md-4 card-pokemon single">
                                    <div>
                                        <h2 className='title-not-found'><span>Pokemon</span> "{pokemonsData[1]}" <span>Not Found</span></h2>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="refresh">
                        <button onClick={this.handleGetPokemons}><img src={Arwos} alt=""/></button>
                    </div>

                </div>
            )
        }else{
            return (
                <div className="container pokmon-list">
                    <div className="row">
                        <div className="col-12">
                            <h5 className="">Become a Pokémon master!</h5>
                            <div className="row search-container">
                                <div className="col-12">
                                    <div className={this.state.searchState.containerClass}>
                                        <input type="text" placeholder={this.state.searchState.placeholder} value={this.state.searchState.searchValue} onChange={this.handleSearchInputChange}/>
                                        <button onClick={this.heandleSearch}><img src={Search} alt="search"/></button>
                                    </div>
                                </div>
                            </div>
                            <div className={"row cards-container " + this.state.loading + (pokemonsData.length === 1 ? ' single-pokemon' : '')}>
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
                        <button onClick={this.handleGetPokemons}><img src={Arwos} alt=""/></button>
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
        selectedPokemonName: state.pokemonsData.selectedPokemonName,
        loading: state.pokemonsData.loading
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        getPokemons: () => dispatch(getPokemons()),
        getPokemonByName: (pokemonName) => dispatch(getPokemonByName(pokemonName)),
        saveSelectPokemon: (pokemonName) => dispatch(saveSelectPokemon(pokemonName))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PokemonList)
