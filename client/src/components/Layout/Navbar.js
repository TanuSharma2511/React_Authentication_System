import React, { Component } from 'react';
import {Link } from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authAction";

class Navbar extends Component {

  onLogoutClick(e){
    e.preventDefault();
    this.props.logoutUser();
  }
    render() {
     const {isAuthenticated,user} = this.props.auth;

    //  if isAuthenticated, then auth links will be visible
     const authLinks = (
      <ul>
       <li><Link to ="/dashboard">Dashboard</Link></li>
       <li><Link to ="/feed">Postfeed</Link></li>
      <li><a href="#" onClick={this.onLogoutClick.bind(this)} >
        Logout </a>
      </li>
    </ul>
     )

    //  if not authenticated, then guest links will be visible
     const guestLinks = (
      <ul style={{display:"flex"}}>
      <li style={{listStyleType:"none",marginRight:"20px"}}><Link to ="/register">Register</Link></li>
      <li style={{listStyleType:"none",marginRight:"20px"}}><Link to ="/login">Login</Link></li>
    </ul>
     )

        return (
     <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i class="fas fa-code"></i> React Authentication System</Link>
      </h1>
     
      {isAuthenticated ? authLinks : guestLinks}  
    </nav> 
        )
    }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
  auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(Navbar);
