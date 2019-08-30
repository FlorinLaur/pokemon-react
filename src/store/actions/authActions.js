export const signUp = (newUser) => {
   return  {
        type: 'SIGNUP_SUCCESS',
        user: newUser
    };
}

