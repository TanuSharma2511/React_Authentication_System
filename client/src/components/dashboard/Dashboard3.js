import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {logoutUser} from "../../actions/authAction";
import "../../App.css";

//Divide screen into top and bottom halves

 class Dashboard2 extends Component {
    render() {
        const {user} = this.props.auth;
        console.log(user);
        return (
            <div className="heading2">
               
            <div id = "topHalf">
            
                <h1 style={{fontSize: "40px",color:"white"}}>Type Value : C</h1>
                <div><button onClick={()=> this.props.logoutUser()}>Logout</button></div>
                </div>
            <div id = "bottomHalf"><h1 style={{fontSize: "40px",color:"white"}}>LoginID : {user.email}</h1></div>
            </div>
        )
    }
}

Dashboard2.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    errors:state.errors
  })
  
  export default connect(mapStateToProps,{logoutUser})(Dashboard2);