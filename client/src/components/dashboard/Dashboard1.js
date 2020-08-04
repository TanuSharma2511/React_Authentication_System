import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {logoutUser} from "../../actions/authAction";
import "../../App.css";

//Image1 on whole screen

 class Dashboard3 extends Component {
    render() {
        const {user} = this.props.auth;
        console.log(user);
        return (
            <div className="heading3">
            <div id = "fullArea">
                
                <h1 style={{fontSize: "40px",color:"black"}}>Type Value : A</h1>
                <h1 className="loginid" style={{fontSize: "40px",color:"black"}}>LoginID : {user.email}</h1>
                <div><button onClick={()=> this.props.logoutUser()}>Logout</button></div>
                </div>
            </div>
        )
    }
}

Dashboard3.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    errors:state.errors
  })
  
  export default connect(mapStateToProps,{logoutUser})(Dashboard3);