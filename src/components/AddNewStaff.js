import React, { Component } from "react";
import Header from '../header';
import ImageUpload from './ImagePicker'
import '../index.css'
import Loader from 'react-loader-spinner'
import firebase from 'firebase'

class AddNewStaff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '', userName: '', password: '', email: '', phone: '',
        }
    }


    uploadHandler = (file) => {

        let name = 'image name'


        if (file === '') {
            // setProgress(50)
            // finishingEditCategory(cImage)
        }
        else {

            const uploadTask = firebase.storage().ref('category/' + name).put(file)
            uploadTask.on('state_changed', function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // setProgress(progress)
            }, function (error) {
                return alert(JSON.stringify(error))
                // Handle unsuccessful uploads
            }, function () {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                firebase.storage().ref('category').child(name).getDownloadURL()
                    .then(url => {
                        // finishingEditCategory(url)
                    })
            });

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
                <form>
                    <div className="form-row ">
                        <div class="form-group col-md-5">
                            <label for="first-name">Username</label>
                            <input type="text" class="form-control form-control-sm" id="first-name" placeholder="Username"></input>
                        </div>
                        <div class="form-group col-md-5">
                            <label for="last-name">Password</label>
                            <input type="password" class="form-control form-control-sm" id="last-name" placeholder="Password"></input>
                        </div>
                    </div>


                    <div className="form-row ">
                        <div class="form-group col-md-5">
                            <label for="first-name">Name</label>
                            <input type="text" class="form-control form-control-sm" id="first-name" placeholder="Name"></input>
                        </div>
                        <div class="form-group col-md-5">
                            <label for="code">Institute Code</label>
                            <input type="text" class="form-control form-control-sm" id="code" placeholder="Code"></input>
                        </div>
                    </div>
                    <ImageUpload new />


                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="phone">Phone</label>
                            <input type="number" name="" id="phone" placeholder="Phone" className="form-control form-control-sm" />

                        </div>
                        <div class="form-group col-md-5 custom-select-sm">
                            <label for="gender">Gender</label><br />
                            <select class="custom-select custom-select-sm" id="gender">
                                <option selected>Select Your Gender</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                                <option value="3">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* <button type="submit" class="btn btn-primary margin-top">Sign in</button> */}
                    <button type="button" class="btn btn-primary margin-top hide-on-print" onClick={() => window.print()} >Print</button>
                </form>

            </div>

        )
    }
}

export default (AddNewStaff);
