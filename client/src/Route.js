import React from 'react';
import { BrowserRouter as Router ,Route, Switch} from "react-router-dom";
import SignIn from './components/user/SignIn';
import SignUp from './components/user/SignUp';
import Home from './components/core/Home';
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/Alert/AlertState";


const Routes = () => {
    return (

<AlertState>
    <AuthState>
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={SignIn} />
                <Route path="/register" exact component={SignUp} />
            </Switch>
            
        </Router>

    </AuthState>

</AlertState>
    
        
    )
}

export default Routes
