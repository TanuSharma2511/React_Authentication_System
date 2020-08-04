import React,{Component} from 'react';
import { BrowserRouter as Router,Route ,Switch} from "react-router-dom";  
import { setCurrentUser, logoutUser} from "./actions/authAction";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import './App.css';

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/Layout/Navbar";
import PrivateRoute from "./components/common/PrivateRoute";

// Redux
import { Provider } from 'react-redux';
import store from './store';

//Check for token
if(localStorage.jwtToken){
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  //Set User and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired Token
  const currentTime = Date.now()/1000;
  if(decoded.exp < currentTime){
    //Logout User
    store.dispatch(logoutUser());
    //Redirect to Login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      
      <div className="App">
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Login} />
      <Switch>
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
      </div>
    </Router>
    </Provider>
    )
  }
}
export default App;
