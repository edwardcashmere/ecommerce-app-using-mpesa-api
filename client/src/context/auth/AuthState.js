import React,{useReducer} from 'react';
import authReducer from "./authReducer";
import AuthContect from "./authContext";
import { REGISTER_SUCCESS,REGISTER_FAIL,LOGIN_SUCCESS,LOGIN_FAIL, SET_LOADING} from "../types";
import axios from 'axios';


const AuthState = (props)=>{
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated:false,
        user:null,
        loading:false,
        error:null

    }

    const [state,dispatch] = useReducer(authReducer,initialState);


const createUser =async(formData)=>{
    const config ={
        headers:{
            "Content-Type":"application/json"
        }
    }
    try {
        dispatch({type:SET_LOADING})
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/register`,formData,config)
        dispatch({type:REGISTER_SUCCESS,payload:res.data})
        dispatch({type:SET_LOADING});
        
    } catch (error) {
        dispatch({
            type:REGISTER_FAIL,
            payload:error.response.data
        })
        
    }
    
}





return <AuthContect.Provider
    value={{
        isAuthenticated:state.isAuthenticated,
        token: state.token,
        user: state.user,
        loading: state.loading,
        error: state.error,
        createUser,
    }}>
    {props.children}
</AuthContect.Provider>

}

export default AuthState