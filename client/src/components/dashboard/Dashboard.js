import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Dashboard1 from "./Dashboard1";
import Dashboard2 from "./Dashboard2";
import Dashboard3 from "./Dashboard3";

 class Dashboard extends Component {
    render() {
        const {user} = this.props.auth;
        return (
            <div>
                {/* if type="A", render Dashboard3 */}
             {user.name == "AAA" ? <Dashboard1 /> : null} 
             
               {/* if type="B", render Dashboard1 */}  
             {user.name == "BBB" ? <Dashboard2 /> : null}   

               {/* if type="C", render Dashboard2 */}
             {user.name == "CCC" ? <Dashboard3 /> : null}   
             
            </div>
        )
    }
}
Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    errors:state.errors
  })
  
  export default connect(mapStateToProps)(Dashboard);
