import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


class PokemonCard extends Component {
    state = {

    }


    handleSelected = (e) =>{
        this.props.parentFunc(e, this.props.pInfo.name)
    }


    render() {

        return (
            <div className={' col-12 col-md-4 card-pokemon ' + this.props.pInfo.types[0].type.name}>
                <div onClick={this.handleSelected}>
                    <p className="title">{this.props.pInfo.name} </p>
                    <div className="img-container">
                        <img src={this.props.pInfo.img} alt=""/>
                    </div>
                    <div className="pokemon-types">
                        {
                            this.props.pInfo.types.map((types,index)=>{
                                return(
                                    <span key={index} className={types.type.name}>{types.type.name}</span>
                                )
                            })
                        }

                    </div>
                    <div className="pokemon-skils">
                        <div><span>Attack</span><span>{this.props.pInfo.stats.attack}</span></div>
                        <div><span>Defense</span><span>{this.props.pInfo.stats.defense}</span></div>
                        <div><span>Hp</span><span>{this.props.pInfo.stats.hp}</span></div>
                        <div><span>Special-attack</span><span>{this.props.pInfo.stats['special-attack']}</span></div>
                        <div><span>Special-defene</span><span>{this.props.pInfo.stats['special-defense']}</span></div>
                        <div><span>Speed</span><span>{this.props.pInfo.stats.speed}</span></div>
                    </div>
                </div>
            </div>
        )
    }
}


export default PokemonCard
