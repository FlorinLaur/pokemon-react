const initState = {
  firstName: '',
  lastName: '',
  gender: '',
  email: '',

}

const authReducer = (state = initState, action) => {
  switch(action.type){

    case 'SIGNUP_SUCCESS':
      console.log('signup success')
      return ({
        ...action.user
      })

    case 'SIGNUP_ERROR':
      console.log('signup error')
      return {
        ...state,
        authError: action.err.message
      }

    default:
      return state
  }
};

export default authReducer;