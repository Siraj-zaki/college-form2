import React, { Component } from "react";
import Header from "../header";
import Loader from 'react-loader-spinner'
import { connect } from "react-redux";
import { _getAllUsers, _getServices, _getStudents } from "../store/middlewares/appMiddleware";
class Posts extends Component {

  componentDidMount() {


    this.props._getStudents(this.props.token, this.props.user.inCode)
    this.props._getAllUsers(this.props.token, this.props.user.inCode)
    this.props._getServices(this.props.token, this.props.user.inCode)
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
    token: state.authReducers.token,
    user: state.authReducers.user
  }
}
const mapDispatch = dispatch => {
  return {
    _getAllUsers: (token, code) => dispatch(_getAllUsers(token, code)),
    _getStudents: (token, code) => dispatch(_getStudents(token, code)),
    _getServices: (token, code) => dispatch(_getServices(token, code)),
  }
}

export default connect(mapState, mapDispatch)(Posts);
