import { getToken } from '.'

const AuthHeader = () => {
  const token = getToken()
  if(token !== null){
    return {Authorization: `Bearer ${token}`}
  }
  else{
    return null;
  }
}

export default AuthHeader