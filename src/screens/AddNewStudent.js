import React, { Component } from "react";
import Header from '../header';
import ImageUpload from '../components/ImagePicker';
import logo from '../assets/logo.png'
import moment from 'moment';
import HBL from '../assets/Capture.PNG'
import '../index.css'
import { _getStudents } from "../store/middlewares/appMiddleware";
import { connect } from "react-redux";
import api from "../services/api";
import * as firebase from 'firebase'
import { Loading } from "../components/Icons";
import { ProgressBar } from 'react-bootstrap'
import { setLoading } from "../store/actions/globalActions";

class AddNewStudent extends Component {
  state = {
    allClasses: [],
    firstName: '',
    lastName: '',
    dateoOfBirth: '',
    placeOfbirth: '',
    bloodGroup: 'A+',
    studentCnic: '',
    gender: 'Male',
    avatar: '', 
    contact: '',
    phoneNo: '',
    mobileNo1: '',
    fax: '',
    description: '',
    progress: 0,
    fatherCnic: '', guardain: '', fatherName: '',
    motherName: '',
    address: '',
    inCode: this.props.user.inCode,
    email: '',
    rollNo: '',
  }

  async componentDidMount() {
    let res = await api.getClass(this.props.token)
    if (res) {
      this.setState({ allClasses: res.result, classID: res.result[0].classID })
    }

  }

  handleChange(evt, name) {
    this.setState({ [name]: evt.target.value });
  }

  uploadHandler = (e) => {
    e.preventDefault();

    if (!this.state.avatar) {
      return alert('Image is required')
    }
    if (this.state.avatar.url) {
      return this.finishAddStudent(this.state.avatar.url)
    }
    if (!this.state.gender) {
      return alert('Gender is required')
    }
    this.props.setLoading(true)
    let file = this.state.avatar.file
    let name = this.state.rollNo + '_' + this.state.firstName + '_' + this.state.lastName + '_' + new Date().toISOString()
    let dir = 'student'
    let t = this;
    const uploadTask = firebase.default.storage().ref(dir + '/' + name).put(file)
    uploadTask.on('state_changed', function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      t.setState({ progress })
    }, function (error) {
      return alert(JSON.stringify(error))
      // Handle unsuccessful uploads
    }, function () {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      firebase.default.storage().ref(dir).child(name).getDownloadURL()
        .then(url => {
          let obj = t.state.avatar;
          obj.url = url
          t.setState({ avatar: obj })
          t.finishAddStudent(url)
        })
    });


  }


  finishAddStudent = async (url) => {
    let avatarObj = this.state.avatar;
    await this.setState({ avatar: url, progress: 0 })
    let res = await api.addStudent(this.props.token, this.state)
    if (res) {
      alert('Student added Sucessfullly')
      await this.props._getStudents(this.props.token, this.state.inCode)
    }
    else {
      this.setState({ avatar: avatarObj })
    }
    this.props.setLoading(false)
  }

  imageHandler = (file) => {
    let avatar = {
      file: file,
      url: '',
    }
    this.setState({ avatar })

  }

  render() {

    return (
      <div className='admin-page add-new-student'>
        <Header />
        <div className='admin-heading hide-on-print'>
          <ProgressBar variant='success' now={this.state.progress} style={{ width: '100%', zIndex: 100, left: 0, height: 8, position: 'fixed', top: 0, opacity: this.state.progress }} />

          <h1>ADMISSION FORM</h1>
        </div>
        <hr />
        <form className="hide-on-print" onSubmit={this.uploadHandler} >
          <div className="form-row hide-on-print">
            <div class="form-group col-md-3">
              <label for="first-name">First Name *</label>
              <input onChange={(event) => this.handleChange(event, "firstName")} required value={this.state.firstName} type="text" class="form-control form-control-sm" id="first-name" placeholder="First Name"></input>
            </div>
            <div class="form-group col-md-3">
              <label for="last-name">Last Name *</label>
              <input required onChange={(event) => this.handleChange(event, "lastName")} value={this.state.lastName} type="text" class="form-control form-control-sm" id="last-name" placeholder="Last Name"></input>
            </div>

          </div>
          <ImageUpload getFile={file => this.imageHandler(file)} />
          <div className="form-row">
            <div class="form-group col-md-3">
              <label for="date-of-birth">Date Of Birth *</label>
              <input required onChange={(event) => this.handleChange(event, "dateoOfBirth")} value={this.state.dateoOfBirth} type="date" class="form-control form-control-sm" id="date-of-birth"></input>
            </div>
            <div class="form-group col-md-3">
              <label for="place-of-birth">Place Of Birth *</label>
              <input required onChange={(event) => this.handleChange(event, "placeOfbirth")} value={this.state.placeOfbirth} type="text" class="form-control form-control-sm" id="place-of-birth" placeholder="Place Of Birth"></input>
            </div>
          </div>
          <div className="form-row">
            <div class="form-group col-md-3">
              <label for="Contact">Contact *</label>
              <input required onChange={(event) => this.handleChange(event, "contact")} value={this.state.contact} type="number" class="form-control form-control-sm" id="Contact" placeholder="Contact"></input>
            </div>
            <div class="form-group col-md-2">
              <label for="rollno">Roll No *</label>
              <input required onChange={(event) => this.handleChange(event, "rollNo")} value={this.state.rollNo} type="number" class="form-control form-control-sm" id="rollno" placeholder="Roll No"></input>
            </div>
            <div class="form-group col-md-2">
              <label for="rollno">Class</label>
              <select required onChange={(event) => this.handleChange(event, "classID")} value={this.state.gender} class="custom-select custom-select-sm" id="gender">

                {
                  this.state.allClasses.map((c, index) =>
                    <option value={c.classID}  >{c.className}</option>
                  )
                }

              </select>
            </div>
          </div>
          <div className="form-row">

            <div class="form-group col-md-3">
              <label for="student-cnic">Student CNIC *</label>
              <input required onChange={(event) => this.handleChange(event, "studentCnic")} value={this.state.studentCnic} type="text" class="form-control form-control-sm" id="student-cnic" placeholder="Student CNIC"></input>
            </div>
            <div class="form-group col-md-3">
              <label for="phone">Phone No </label>
              <input onChange={(event) => this.handleChange(event, "phoneNo")} value={this.state.phoneno} type="number" class="form-control form-control-sm" id="phone" placeholder="Phone No"></input>
            </div>
            <div class="form-group col-md-3 custom-select-sm">
              <label for="gender">Gender</label><br />
              <select required onChange={(event) => this.handleChange(event, "gender")} value={this.state.gender} class="custom-select custom-select-sm" id="gender">

                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Other</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div class="form-group col-md-3">
              <label for="Mobile-1">Mobile 1 </label>
              <input onChange={(event) => this.handleChange(event, "mobileNo1")} value={this.state.mobileno1} type="number" class="form-control form-control-sm" id="Mobile-1" placeholder="Mobile 1"></input>
            </div>
            {/* <div class="form-group col-md-3">
              <label for="Mobile-2">Mobile 2 </label>
              <input onChange={(event) => this.handleChange(event, "mobileno2")} value={this.state.mobileno2} type="number" class="form-control form-control-sm" id="Mobile-2" placeholder="Mobile 2"></input>
            </div> */}
            <div class="form-group col-md-3">
              <label for="email-2">Email *</label>
              <input required onChange={(event) => this.handleChange(event, "email")} value={this.state.email} type="email" class="form-control form-control-sm" id="email-2" placeholder="Email"></input>
            </div>
            <div class="form-group col-md-3">
              <label for="fax">Fax</label>
              <input onChange={(event) => this.handleChange(event, "fax")} value={this.state.fax} type="text" class="form-control form-control-sm" id="fax" placeholder="Fax"></input>
            </div>


          </div>
          <div class="form-row">
            <div class="form-group col-md-3">
              <label for="icnic-1">Father CNIC *</label>
              <input required onChange={(event) => this.handleChange(event, "fatherCnic")} value={this.state.fatherCnic} type="text" class="form-control form-control-sm" id="cnic-1" placeholder="CNIC" ></input>
            </div>
            <div class="form-group col-md-3">
              <label for="Guardian">Guardian</label>
              <input onChange={(event) => this.handleChange(event, "guardain")} value={this.state.guardian} type="text" class="form-control form-control-sm" id="Guardian" placeholder="Guardian"></input>
            </div>
            <div class="form-group col-md-3">
              <label for="fathername">Father Name *</label>
              <input required onChange={(event) => this.handleChange(event, "fatherName")} value={this.state.fatherName} type="text" class="form-control form-control-sm" id="fathername" placeholder="Father Name" ></input>
            </div>
            <div class="form-group col-md-3">
              <label for="mothername">Mother Name</label>
              <input onChange={(event) => this.handleChange(event, "motherName")} value={this.state.mothername} type="text" class="form-control form-control-sm" id="mothername" placeholder="Mother Name"></input>
            </div>
            <div class="form-group col-md-3">
              <label for="blood-group">Blood Group</label>
              <select required onChange={(event) => this.handleChange(event, "bloodGroup")} value={this.state.gender} class="custom-select custom-select-sm" id="gender">

                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>

              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="address">Address</label>
              <textarea onChange={(event) => this.handleChange(event, "address")} value={this.state.address} class="form-control" id="address" rows="2"></textarea>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="exampleFormControlTextarea1">Description</label>
              <textarea onChange={(event) => this.handleChange(event, "description")} value={this.state.description} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
          </div>
          <button type='submit' class="btn btn-primary" style={{ marginBottom: '50px', width: 200, height: 50 }}>
            {
              this.props.loading ?
                <Loading size={30} color='#fff' />
                :
                'Add Student'
            }

          </button>
        </form>
        <div className="show-on-print" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>


          <div className="cash-voucher" >
            <div className="upper-side">
              <div className="left-side">
                <img style={{ width: 50, height: 50 }} src={logo} alt="" />
                <h1 style={{ fontSize: 5, marginTop: 10, textAlign: 'center' }}>Record Copy</h1>

              </div>
              <div className="right-side">
                <span className="pt-1" style={{ fontSize: 6 }}>Horizon School for Nursing and & Health Sciences</span>
                <span className="pt-1" style={{ fontSize: 6 }}>SF. 15/A 3rd Floor, Hanif Hospital,Block "B" </span>
                <span className="pt-1" style={{ fontSize: 5 }}>Near Brand Office, North Nazimabad, karachi Pakistan </span>
                <span className="pt-1" style={{ fontSize: 6 }}><b>www/horizonsnhs.com.pk</b> </span>
                <span className="pt-1" style={{ fontSize: 6 }}><b>Tell:021-3664944, 0332-8999444, 0321-9224721</b> </span>
              </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Fee Month</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings">{moment().format('MMMM')}</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Issued On</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >{moment().format('YYYY/DD/MM')}</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >Valid Upto</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >2021-02-19</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Family ID</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >145/145/145</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >Challan No</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >145</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings">Student Name</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ minHeight: 15 }}>{`${this.state.firstname}  ${this.state.lastname} `}</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Father Name</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ minHeight: 15 }}  >{this.state.fathername}</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Class / Sec</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ minHeight: 15 }}  >{this.state.class}</h2>
                </div>
              </div>
            </div>
            <div style={{ height: 400, display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                <div className="newnew" style={{ backgroundColor: "gray", display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                  <span>Sr.</span>
                  <span>ID</span>
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                  <span>1</span>
                  <span>145</span>
                  <span>T/F Jan 21 </span>
                  <span>{this.state.fee}</span>
                </div>
              </div>
              <div>
                <h2 style={{ fontSize: 14, marginLeft: 10 }}>Note: After 10th of every Month Late Fee 300/- Will Be Charged</h2>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <div className="feemonth">
                <div className="width-2">
                  <h2 className="headings" >Any Other Fee</h2>
                </div>
                <div className="width">
                  <h2 className="headings">Rs. 0</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width-2">
                  <h2 className="headings">Total Dues Till <span>2021-02-19</span></h2>
                </div>
                <div className="width">
                  <h2 className="headings">Rs. 9000</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width-2">
                  <h2 className="headings" >Amount After Above Due Date</h2>
                </div>
                <div className="width">
                  <h2 className="headings">{this.state.fee + 300}</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Depositer`s Name</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ height: 15 }}> </h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >CNIC#</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ height: 15 }}></h2>
                </div>
              </div>
            </div>
            <div style={{ width: '100%' }}>
              <img style={{ width: '100%' }} src={HBL} alt="" />
            </div>

          </div>
          <div className="cash-voucher" >
            <div className="upper-side">
              <div className="left-side">
                <img style={{ width: 50, height: 50 }} src={logo} alt="" />
                <h1 style={{ fontSize: 5, marginTop: 10, textAlign: 'center' }}>Record Copy</h1>

              </div>
              <div className="right-side">
                <span className="pt-1" style={{ fontSize: 6 }}>Horizon School for Nursing and & Health Sciences</span>
                <span className="pt-1" style={{ fontSize: 6 }}>SF. 15/A 3rd Floor, Hanif Hospital,Block "B" </span>
                <span className="pt-1" style={{ fontSize: 5 }}>Near Brand Office, North Nazimabad, karachi Pakistan </span>
                <span className="pt-1" style={{ fontSize: 6 }}><b>www/horizonsnhs.com.pk</b> </span>
                <span className="pt-1" style={{ fontSize: 6 }}><b>Tell:021-3664944, 0332-8999444, 0321-9224721</b> </span>
              </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Fee Month</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings">{moment().format('MMMM')}</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Issued On</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >{moment().format('YYYY/DD/MM')}</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >Valid Upto</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >2021-02-19</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Family ID</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >145/145/145</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >Challan No</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >145</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings">Student Name</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ minHeight: 15 }}>{`${this.state.firstname}  ${this.state.lastname} `}</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Father Name</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ minHeight: 15 }}  >{this.state.fathername}</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Class / Sec</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ minHeight: 15 }}  >{this.state.class}</h2>
                </div>
              </div>
            </div>
            <div style={{ height: 400, display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                <div className="newnew" style={{ backgroundColor: "gray", display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                  <span>Sr.</span>
                  <span>ID</span>
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                  <span>1</span>
                  <span>145</span>
                  <span>T/F Jan 21 </span>
                  <span>{this.state.fee}</span>
                </div>
              </div>
              <div>
                <h2 style={{ fontSize: 14, marginLeft: 10 }}>Note: After 10th of every Month Late Fee 300/- Will Be Charged</h2>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <div className="feemonth">
                <div className="width-2">
                  <h2 className="headings" >Any Other Fee</h2>
                </div>
                <div className="width">
                  <h2 className="headings">Rs. 0</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width-2">
                  <h2 className="headings">Total Dues Till <span>2021-02-19</span></h2>
                </div>
                <div className="width">
                  <h2 className="headings">Rs. 9000</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width-2">
                  <h2 className="headings" >Amount After Above Due Date</h2>
                </div>
                <div className="width">
                  <h2 className="headings">{this.state.fee + 300}</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Depositer`s Name</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ height: 15 }}> </h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >CNIC#</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ height: 15 }}></h2>
                </div>
              </div>
            </div>
            <div style={{ width: '100%' }}>
              <img style={{ width: '100%' }} src={HBL} alt="" />
            </div>

          </div>
          <div className="cash-voucher" >
            <div className="upper-side">
              <div className="left-side">
                <img style={{ width: 50, height: 50 }} src={logo} alt="" />
                <h1 style={{ fontSize: 5, marginTop: 10, textAlign: 'center' }}>Record Copy</h1>

              </div>
              <div className="right-side">
                <span className="pt-1" style={{ fontSize: 6 }}>Horizon School for Nursing and & Health Sciences</span>
                <span className="pt-1" style={{ fontSize: 6 }}>SF. 15/A 3rd Floor, Hanif Hospital,Block "B" </span>
                <span className="pt-1" style={{ fontSize: 5 }}>Near Brand Office, North Nazimabad, karachi Pakistan </span>
                <span className="pt-1" style={{ fontSize: 6 }}><b>www/horizonsnhs.com.pk</b> </span>
                <span className="pt-1" style={{ fontSize: 6 }}><b>Tell:021-3664944, 0332-8999444, 0321-9224721</b> </span>
              </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Fee Month</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings">{moment().format('MMMM')}</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Issued On</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >{moment().format('YYYY/DD/MM')}</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >Valid Upto</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >2021-02-19</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Family ID</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >145/145/145</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >Challan No</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >145</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings">Student Name</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ minHeight: 15 }}>{`${this.state.firstname}  ${this.state.lastname} `}</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Father Name</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ minHeight: 15 }}  >{this.state.fathername}</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Class / Sec</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ minHeight: 15 }}  >{this.state.class}</h2>
                </div>
              </div>
            </div>
            <div style={{ height: 400, display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                <div className="newnew" style={{ backgroundColor: "gray", display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                  <span>Sr.</span>
                  <span>ID</span>
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                  <span>1</span>
                  <span>145</span>
                  <span>T/F Jan 21 </span>
                  <span>{this.state.fee}</span>
                </div>
              </div>
              <div>
                <h2 style={{ fontSize: 14, marginLeft: 10 }}>Note: After 10th of every Month Late Fee 300/- Will Be Charged</h2>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <div className="feemonth">
                <div className="width-2">
                  <h2 className="headings" >Any Other Fee</h2>
                </div>
                <div className="width">
                  <h2 className="headings">Rs. 0</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width-2">
                  <h2 className="headings">Total Dues Till <span>2021-02-19</span></h2>
                </div>
                <div className="width">
                  <h2 className="headings">Rs. 9000</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width-2">
                  <h2 className="headings" >Amount After Above Due Date</h2>
                </div>
                <div className="width">
                  <h2 className="headings">{this.state.fee + 300}</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Depositer`s Name</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ height: 15 }}> </h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >CNIC#</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ height: 15 }}></h2>
                </div>
              </div>
            </div>
            <div style={{ width: '100%' }}>
              <img style={{ width: '100%' }} src={HBL} alt="" />
            </div>

          </div>
          <div className="cash-voucher" >
            <div className="upper-side">
              <div className="left-side">
                <img style={{ width: 50, height: 50 }} src={logo} alt="" />
                <h1 style={{ fontSize: 5, marginTop: 10, textAlign: 'center' }}>Record Copy</h1>

              </div>
              <div className="right-side">
                <span className="pt-1" style={{ fontSize: 6 }}>Horizon School for Nursing and & Health Sciences</span>
                <span className="pt-1" style={{ fontSize: 6 }}>SF. 15/A 3rd Floor, Hanif Hospital,Block "B" </span>
                <span className="pt-1" style={{ fontSize: 5 }}>Near Brand Office, North Nazimabad, karachi Pakistan </span>
                <span className="pt-1" style={{ fontSize: 6 }}><b>www/horizonsnhs.com.pk</b> </span>
                <span className="pt-1" style={{ fontSize: 6 }}><b>Tell:021-3664944, 0332-8999444, 0321-9224721</b> </span>
              </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Fee Month</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings">{moment().format('MMMM')}</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Issued On</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >{moment().format('YYYY/DD/MM')}</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >Valid Upto</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >2021-02-19</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Family ID</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >145/145/145</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >Challan No</h2>
                </div>
                <div className="width">
                  <h2 className="headings" >145</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings">Student Name</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ minHeight: 15 }}>{`${this.state.firstname}  ${this.state.lastname} `}</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Father Name</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ minHeight: 15 }}  >{this.state.fathername}</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Class / Sec</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ minHeight: 15 }}  >{this.state.class}</h2>
                </div>
              </div>
            </div>
            <div style={{ height: 400, display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                <div className="newnew" style={{ backgroundColor: "gray", display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                  <span>Sr.</span>
                  <span>ID</span>
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-start' }}>
                  <span>1</span>
                  <span>145</span>
                  <span>T/F Jan 21 </span>
                  <span>{this.state.fee}</span>
                </div>
              </div>
              <div>
                <h2 style={{ fontSize: 14, marginLeft: 10 }}>Note: After 10th of every Month Late Fee 300/- Will Be Charged</h2>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <div className="feemonth">
                <div className="width-2">
                  <h2 className="headings" >Any Other Fee</h2>
                </div>
                <div className="width">
                  <h2 className="headings">Rs. 0</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width-2">
                  <h2 className="headings">Total Dues Till <span>2021-02-19</span></h2>
                </div>
                <div className="width">
                  <h2 className="headings">Rs. 9000</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width-2">
                  <h2 className="headings" >Amount After Above Due Date</h2>
                </div>
                <div className="width">
                  <h2 className="headings">{this.state.fee + 300}</h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >Depositer`s Name</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ height: 15 }}> </h2>
                </div>
              </div>
              <div className="feemonth">
                <div className="width">
                  <h2 className="headings" >CNIC#</h2>
                </div>
                <div className="width-2">
                  <h2 className="headings" style={{ height: 15 }}></h2>
                </div>
              </div>
            </div>
            <div style={{ width: '100%' }}>
              <img style={{ width: '100%' }} src={HBL} alt="" />
            </div>

          </div>

        </div>
      </div>

    )
  }
}
const mapState = state => {
  return {
    token: state.authReducers.token,
    loading: state.globalReducers.loading,
    user: state.authReducers.user
  }
}
const mapDispatch = dispatch => {
  return {
    _getStudents: (token, code) => dispatch(_getStudents(token, code)),
    setLoading: bol => dispatch(setLoading(bol)),
  }
}


export default connect(mapState, mapDispatch)(AddNewStudent);