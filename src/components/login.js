import React, { Component } from "react";
import { NavLink } from "react-router-dom"
import '../index.css'
import Loader from 'react-loader-spinner'
import { connect } from "react-redux";
import { setLogged } from '../store/actions/authActions'
import { _login } from "../store/middlewares/authMiddleware";
import { validate } from "email-validator";


class Login extends React.Component {
  state = {
    email: 'user',
    password: 'pass',
    collogeCode: '',

  }
  formfunct = async (e) => {
    e.preventDefault()
    validate(this.state.email)


    let res = await this.props._login(this.state.collogeCode, this.state.email, this.state.password)
    if (res) {
      window.location.href = "/posts"
    }


  }
  render() {
    return (
      <div className='admin-page'>
        <div className='admin-heading'>
          <h1>Login</h1>
        </div>
        <form onSubmit={this.formfunct}>
          <div class="form-group">
            <label for="exampleInputEmail1">College Code</label>
            <input onChange={(e) => this.setState({ collogeCode: e.target.value.trim() })} value={this.state.collogeCode} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter College Code" required></input>
            <small id="emailHelp" style={{ visibility: 'hidden' }} class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="User-Name">Email</label>
            <input onChange={(e) => this.setState({ email: e.target.value.trim() })} type="email" class="form-control" id="User-Name" placeholder="Enter Email" required></input>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input minLength="6" onChange={(e) => this.setState({ password: e.target.value.trim() })} type="password" class="form-control" id="password" placeholder="Password" required></input>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    )



  }
}

const mapState = state => {
  return {

  }
}
const mapDispatch = dispatch => {
  return {
    setLogged: (val) => dispatch(setLogged(val)),
    _login: (cCode, email, pass) => dispatch(_login(cCode, email, pass)),
  }
}

export default connect(mapState, mapDispatch)(Login);
