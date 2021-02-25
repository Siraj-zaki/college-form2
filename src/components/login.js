import React, { Component } from "react";
import { NavLink } from "react-router-dom"
import '../index.css'
import Loader from 'react-loader-spinner'
const App = () => {
  return (
    <div className='admin-page'>
      <div className='admin-heading'>
        <h1>Login</h1>
      </div>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username" required></input>
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="User-Name">User Name</label>
          <input type="text" class="form-control" id="User-Name" placeholder="Enter User Name"></input>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Password"></input>
        </div>
        <NavLink to="/posts" className="btn btn-primary">Submit</NavLink>
      </form>
    </div>

  );

}

export default App;
