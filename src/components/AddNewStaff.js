import React, { Component } from "react";
import Header from '../header';
import ImageUpload from './ImagePicker'
import '../index.css'
import Loader from 'react-loader-spinner'

import * as firebase from 'firebase'
import { connect } from "react-redux";
import { _getAllUsers } from "../store/middlewares/appMiddleware";
import api from "../services/api";

class AddNewStaff extends Component {

    state = {
        username: "",
        password: "",
        name: "",
        insituteCode: "",
        phone: "",
        gender: "",
        avatar: '',
        email: '',

    }

    uploadHandler = (e) => {
        e.preventDefault();

        if (!this.state.avatar) {
            return alert('Image is required')
        }
        if (!this.state.gender) {
            return alert('Gender is required')
        }

        let file = this.state.avatar
        let name = this.state.username + new Date().toISOString()
        let dir = 'staff'
        let t = this;
        const uploadTask = firebase.default.storage().ref(dir + '/' + name).put(file)
        uploadTask.on('state_changed', function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // setProgress(progress)
        }, function (error) {
            return alert(JSON.stringify(error))
            // Handle unsuccessful uploads
        }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            firebase.default.storage().ref(dir).child(name).getDownloadURL()
                .then(url => {
                    t.finishAddStaff(url)
                })
        });


    }

    finishAddStaff = async (url) => {
        let user = {
            name: this.state.name,
            password: this.state.password,
            userName: this.state.username,
            phone: this.state.phone,
            inCode: this.state.insituteCode,
            gender: this.state.gender,
            avatar: url,
            email: this.state.email

        }

        let res = await api.addUser(this.props.token, user);
        if (res) {
            alert('Added Successfully')
            await this.props._getAllUsers(this.props.token)
            window.history.back()
        }
    }



    render() {

        
        return (

            <div className='admin-page add-new-student'>
                <Header />
                <div className='admin-heading'>

                    <h2>Add New Staff</h2>
                </div>
                <hr />
                <form onSubmit={this.uploadHandler} >
                    <div className="form-row ">
                        <div class="form-group col-md-5">
                            <label for="first-name">Username</label>
                            <input onChange={(e) => this.setState({ username: e.target.value })} type="text" required class="form-control form-control-sm" id="first-name" placeholder="Username"></input>
                        </div>
                        <div class="form-group col-md-5">
                            <label for="last-name">Email</label>
                            <input onChange={(e) => this.setState({ email: e.target.value })} type="email" required class="form-control form-control-sm" id="last-name" placeholder="Email"></input>
                        </div>


                    </div>


                    <div className="form-row ">
                        <div class="form-group col-md-5">
                            <label for="first-name">Name</label>
                            <input onChange={(e) => this.setState({ name: e.target.value })} type="text" required class="form-control form-control-sm" id="first-name" placeholder="Name"></input>
                        </div>
                        <div class="form-group col-md-5">
                            <label for="code">Institute Code</label>
                            <input onChange={(e) => this.setState({ insituteCode: e.target.value })} required type="text" class="form-control form-control-sm" id="code" placeholder="Code"></input>
                        </div>
                    </div>
                    <ImageUpload new getFile={file => this.setState({ avatar: file })} />


                    <div className="form-row">
                        <div className="form-group col-md-5">
                            <label htmlFor="phone">Phone</label>
                            <input onChange={(e) => this.setState({ phone: e.target.value })} required type="number" name="" id="phone" placeholder="Phone" className="form-control form-control-sm" />

                        </div>
                        <div class="form-group col-md-5 custom-select-sm">
                            <label for="gender">Gender</label><br />
                            <select onChange={(e) => this.setState({ gender: e.target.value })} required class="custom-select custom-select-sm" id="gender">
                                <option selected>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Femle">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="form-group col-md-5">
                            <label for="last-name">Password</label>
                            <input onChange={(e) => this.setState({ password: e.target.value })} type="password" required class="form-control form-control-sm" id="last-name" placeholder="Password"></input>
                        </div>
                    </div>

                    {/* <button type="submit" class="btn btn-primary margin-top">Sign in</button> */}
                    <button type="submit" class="btn btn-primary margin-top hide-on-print"   >Add Staff</button>
                </form>

            </div>

        )
    }
}

const mapState = state => {
    return {
        token: state.authReducers.token,
    }
}
const mapDispatch = dispatch => {
    return {
        _getAllUsers: token => dispatch(_getAllUsers(token))
    }
}

export default connect(mapState, mapDispatch)(AddNewStaff);
