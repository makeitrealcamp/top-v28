export const LOGIN_MUTATION = `
mutation LoginUser( $email:String!, $password:String!) {
    loginUser( email:$email, password:$password){
        user{
            id
            name
            username
            email
        }
        token
    }
  }`