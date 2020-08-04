import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from "../../actions/authAction";
import {Link} from "react-router-dom";
import Navbar from "../Layout/Navbar";

 class Login extends Component {
  constructor(){
    super();
    this.state = {
         email:"",
         password:'',
         errors:{}
    }
}

//if authenticate, then render dashboard
componentDidMount(){
  if(this.props.auth.isAuthenticated){
    this.props.history.push("/dashboard");
  }
}

//if errors
componentWillReceiveProps(nextProps){
 if(nextProps.auth.isAuthenticated){
   this.props.history.push("/dashboard");
 }

  if(nextProps.errors){
    this.setState({errors: nextProps.errors});
  }
}

//Set Value
onChange = (e) =>{
    this.setState({[e.target.name]: e.target.value });
}

//call function registerUser
onSubmit = (e) =>{
    e.preventDefault();
    const userData={
        email:this.state.email,
        password:this.state.password,
    }
    this.props.loginUser(userData);
}
    render() {
      const {errors} = this.state;
        return (
            <div>
              <Navbar />
              <div className="row mt-5">
    <div className="col-md-6 m-auto">
      <div className="card card-body">
        <h1 className="text-center mb-3"><i class="fas fa-sign-in-alt"></i>  Login</h1>

        <form className="form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={this.onChange}
              error = {errors.email}
            />
                  {errors.email? <div style={{color:"red",textAlign:"left",fontSize:"10px"}}>{errors.email}</div> : null} 
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.onChange}
              error = {errors.password}
            />
            {errors.password? <div style={{color:"red",textAlign:"left",fontSize:"10px"}}>{errors.password}</div> : null}
          </div>
          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </form>
        <p className="lead mt-4">
          No Account?  <Link to ="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  </div>
  
            </div>
        )
    }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors:state.errors
})

export default connect(mapStateToProps, {loginUser})( Login);
