import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {logoutUser} from "../../actions/authAction";
import "../../App.css";

//Divide screen into left and right halves

 class Dashboard1 extends Component {
    render() {
        const {user} = this.props.auth;
        console.log(user);
        return (
            <div className="heading1">
            <div id = "leftHalf"><button onClick={()=> this.props.logoutUser()}>Logout</button></div>
            <div id = "rightHalf"><h1 style={{fontSize: "40px",color:"white"}}>Type Value : B</h1><br /><h1 style={{fontSize: "40px",color:"white"}}>LoginId : {user.email}</h1></div>
            <div ></div>
            </div>
        )
    }
}

Dashboard1.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    errors:state.errors
  })
  
  export default connect(mapStateToProps,{logoutUser})(Dashboard1);