import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Profile extends Component {
    state = {
        cards:[1,2,3]
    }

    render() {

        return (
            <div className="container profile">
                <div className="row">
                    <div className="col-12">
                        <h5 className="">You've created your profile</h5>
                        <div className="card-profile">
                            <div>
                                <div className="header-card">
                                    <div className="title">
                                        <p>Your Pokémon</p>
                                        <p>Snorlax</p>
                                    </div>
                                    <div className="pokemon-img">
                                        <img src="https://dummyimage.com/140x140" alt=""/>
                                    </div>
                                </div>
                                <div className="use-data">
                                    <div><span>Name</span><span>Dario</span></div>
                                    <div><span>Surname</span><span>Carella</span></div>
                                    <div><span>Gender</span><span>Male</span></div>
                                    <div><span>Email</span><span>dario.carella@gmail.co</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}


export default Profile
