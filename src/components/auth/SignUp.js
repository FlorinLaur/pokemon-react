import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import {getPokemons} from "../../store/actions/pokemonsActions";


class SignUp extends Component {
  state = {
    formData: {
      firstName: '',
      lastName: '',
      gender: 'Male',
      email: '',
    },

    formErrors: {
      firstName: {
        errorTypes:{
          required:"This field is required"
        },
        errorBind:"",
        nameClassBind:"error"

      },
      lastName: {
        errorTypes:{
          required:"This field is required"
        },
        errorBind:"",
        nameClassBind:"error"

      },
      email: {
        errorTypes:{
          required:"This field is required",
          invalidFormat:"This mail format is not valid"
        },
        errorBind:"",
        nameClassBind:"error"

      }
    },

    genderStates:{
      maleClassName:"active",
      femaleClassName:"",
    }
  }
  handleChange = (e) => {
    const id = e.target.id
    const value = e.target.value
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [id] : value
      }
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if(this.validateForm()){

      this.props.signUp(this.state.formData)
      this.props.getPokemons()
      this.props.history.push('/pokemon-list')
    }
  }

  validateForm = () =>{

    let formHasErrors = false

    Object.keys(this.state.formData).map( key => {
      if(key !== "gender"){
        if(this.state.formData[key] === ""){
          this.activateErrorForInput(key, "required")
          formHasErrors = true
        }else{
          if(this.state.formErrors[key].errorTypes.hasOwnProperty('invalidFormat')){

            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(!re.test(String(this.state.formData[key]).toLowerCase())){
              this.activateErrorForInput(key,'invalidFormat')
              formHasErrors = true
            }else{
              this.desactivateErrorForInput(key)
            }

          }else{
            this.desactivateErrorForInput(key)
          }
        }
      }

    })

    if(formHasErrors){
      return false
    }else{
      return true
    }
  }

  desactivateErrorForInput = ( key ) =>
  {
    this.setState(prevState => ({
      formErrors: {
        ...prevState.formErrors,
        [key]: {
          ...prevState.formErrors[key],
          errorBind: '',
          nameClassBind: "error"
        }
      }
    }))
  }

  activateErrorForInput = (key , type) =>{

      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          hasErrors: true,
          [key]: {
            ...prevState.formErrors[key],
            errorBind: prevState.formErrors[key].errorTypes[type],
            nameClassBind: "error show"
          }

        }
      }))
  }

  handleGender = (e) => {
    e.preventDefault();


    if (e.currentTarget.getAttribute('data-gender') === "Male") {
      this.setState(prevState => ({
        genderStates: {
          maleClassName: "active",
          femaleClassName: "",
        },
        formData: {
          ...prevState.formData,
          gender: "Male"
        }
      }))
    } else {
      this.setState(prevState =>({
        genderStates: {
          maleClassName: "",
          femaleClassName: "active",
        },
        formData:{
          ...prevState.formData,
          gender: "Female"
        }

      }))
    }
  }

  render() {

    return (


      <div className="container">
        <form className="form-sign-up" onSubmit={this.handleSubmit}>
          <h5 className="">Become a Pokémon master!</h5>
          <div className="input-field">
            <div>
              <label htmlFor="firstName">NAME*</label>
              <input type="text" id='firstName' placeholder="Start typing here..." onChange={this.handleChange} />
              <div className={this.state.formErrors.firstName.nameClassBind}>{this.state.formErrors.firstName.errorBind}</div>
            </div>
          </div>
          <div className="input-field">
            <div>
              <label htmlFor="lastName">SURNAME*</label>
              <input type="text" id='lastName' placeholder="Start typing here..."  onChange={this.handleChange} />
              <div className={this.state.formErrors.lastName.nameClassBind}>{this.state.formErrors.lastName.errorBind}</div>
            </div>
          </div>
          <div className="input-field">
            <div>
              <label>GENDER*</label>
              <div className="gender">
                <span>
                  <span onClick={this.handleGender} className={this.state.genderStates.maleClassName} data-gender="Male">Male</span>
                </span>
                <span>
                  <span onClick={this.handleGender} className={this.state.genderStates.femaleClassName}  data-gender="Female">Female</span>
                </span>
              </div>
              <div className="error"></div>
            </div>
          </div>
          <div className="input-field">
            <div>
              <label htmlFor="email">Email*</label>
              <input type="text" id='email' placeholder="Start typing here..."  onChange={this.handleChange} />
              <div className={this.state.formErrors.email.nameClassBind}>{this.state.formErrors.email.errorBind}</div>
            </div>
          </div>

          <div className="input-field submit">
            <button className="btn">SUBMIT</button>
          </div>
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    auth: state.userData
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    signUp: (formData) => dispatch(signUp(formData)),
    getPokemons: () => dispatch(getPokemons())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
