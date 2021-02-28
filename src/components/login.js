import React, { Component } from "react";
import { NavLink } from "react-router-dom"
import '../index.css'
import Loader from 'react-loader-spinner'
class App extends React.Component {
  state = {
    username: 'user',
    password: 'pass',
    email: '',

  }
  formfunct = (e) => {
    e.preventDefault()
    window.location.href = '/posts'
  }
  render() {
    return (
      <div className='admin-page'>
        <div className='admin-heading'>
          <h1>Login</h1>
        </div>
        <form onSubmit={this.formfunct}>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input onChange={(e) => this.setState({ email: e.target.value })} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" required></input>
            <small style={{visibility:'hidden'}} id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="User-Name">User Name</label>
            <input onChange={(e) => this.setState({ username: e.target.value })} type="text" class="form-control" id="User-Name" placeholder="Enter User Name" required></input>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input minLength="6" onChange={(e) => this.setState({ password: e.target.value })} type="password" class="form-control" id="password" placeholder="Password" required></input>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )



  }
}




export default App;
