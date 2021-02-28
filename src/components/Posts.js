import React, { Component } from "react";
import Header from "../header";
import Loader from 'react-loader-spinner'
import { connect } from "react-redux";
import { _getAllUsers, _getStudents } from "../store/middlewares/appMiddleware";
class Posts extends Component {

  componentDidMount() {
    
    this.props._getAllUsers(this.props.token)
    this.props._getStudents(this.props.token)
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div style={{ textAlign: "center", marginTop: '10rem' }}>

        </div>
      </React.Fragment>
    );
  }
}

const mapState = state => {
  return {
    token: state.authReducers.token
  }
}
const mapDispatch = dispatch => {
  return {
    _getAllUsers: token => dispatch(_getAllUsers(token)),
    _getStudents: token => dispatch(_getStudents(token)),
  }
}

export default connect(mapState, mapDispatch)(Posts);
