import React from 'react';
import { Link, withRouter } from "react-router-dom";

const isActive = (history,path)=>{
    if (history.location.pathname === path){
        return {color:'#ff9900'}
    }else{
        return {color: "#ffffff"}
    }
}

const Menu = ({history}) => {
    return (
        <div>
            <ul className="nav nav-tab bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,"/")} to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login" style={isActive(history,"/login")}> Sign In</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register" style={isActive(history,"/register")}>Sign Up</Link>
                </li>
            </ul>
            
        </div>
    )
}

export default withRouter(Menu)
