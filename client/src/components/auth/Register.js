import React, { Component } from 'react';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {registerUser} from "../../actions/authAction";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Navbar from "../Layout/Navbar";

class Register extends Component {
  constructor(){
    super();
    this.state = {
         name:'AAA',
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
    const newUser={
        name:this.state.name,
        email:this.state.email,
        password:this.state.password,
    }

   this.props.registerUser(newUser, this.props.history);
}

    render() {
      const {errors} = this.props;
        return (
      <div>
        <Navbar />
      <div className="row mt-5">
    <div className="col-md-6 m-auto">
      <div className="card card-body">
        <h1 className="text-center mb-3">
          <i className="fas fa-user-plus"></i> Register
        </h1>
         
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
              placeholder="Create Password"
              value={this.state.password}
               onChange={this.onChange}
              error = {errors.password}
            />
                {errors.password? <div style={{color:"red",textAlign:"left",fontSize:"10px"}}>{errors.password}</div> : null} 
          </div>

          <div className="form-group">
          <label for="name">Choose a type: </label><br />

          <select name="name" id="name" onChange={this.onChange} value={this.state.name}>
          <option value="AAA">A - Image 1 is Displyed</option>
          <option value="BBB">B - Screen is divided into left and right halves</option>
          <option value="CCC">C - Screen is divided into top and bottom halves</option>
          </select>
          </div>
          <br />
         
          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </form>
        <p className="lead mt-4">Have An Account? <Link to ="/login">Sign In</Link></p>
      </div>
    </div>
  </div>
            </div>
        )
    }
}

Register.propTypes ={
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) =>({
   auth:state.auth,
   errors:state.errors
})

export default connect(mapStateToProps, {registerUser})(withRouter(Register));

