import { REGISTER_FAIL,REGISTER_SUCCESS,LOGIN_FAIL,LOGIN_SUCCESS, SET_LOADING} from "../types";
import AuthContext from "./AuthState";

 const userReducer=(state,action)=>{
     switch(action.type){
         case REGISTER_SUCCESS:
             return{
                ...state,
                user: action.payload.user,
                loading:false
             }
         case REGISTER_FAIL:
             return{

             } 
        case SET_LOADING:
            return {
                ...state,
                loading:true
            }
         default:
             return state
     }

}


export default userReducer