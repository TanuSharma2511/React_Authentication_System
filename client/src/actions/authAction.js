import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {GET_ERRORS} from "../actions/types";
import {SET_CURRENT_USER} from "../actions/types";

//Register User
export const registerUser = (userData,history) => dispatch =>{
    axios
      .post("http://localhost:3001/api/users/register", userData)
      .then(res => history.push("/login"))  
      .catch(err => 
          dispatch({
              type:GET_ERRORS,
              payload:err.response.data
          })
          )
  };
  
  //Login - Get User Token
  export const loginUser = (userData) => dispatch =>{
      axios
        .post("http://localhost:3001/api/users/login", userData)
        .then(res => {
            //Save to local Storage
            const {token} = res.data;
            //Set Token To ls
            localStorage.setItem("jwtToken", token);
            //Set Token to Auth Header
            setAuthToken(token);
            //Decode Token to get user data
            const decoded = jwt_decode(token);
            //Set Current User
            dispatch(setCurrentUser(decoded));
  
        })  
        .catch(err => 
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
            )
    };
  
    //Set Logged in user
    export const setCurrentUser = (decoded) =>{
        return {
            type: SET_CURRENT_USER,
            payload:decoded
        }
    }
  
    
  //Log User Out
  export const logoutUser = () => dispatch => {
    //Remove token from localstorage
    localStorage.removeItem("jwtToken");
    //Remove auth header for future requests
    setAuthToken(false);
    //Set current user to () which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}