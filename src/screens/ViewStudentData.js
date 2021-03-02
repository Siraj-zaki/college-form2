import React, { Component } from "react";
import Header from '../header';
import '../index.css'
import { Table } from 'react-bootstrap'; 
import { connect } from "react-redux";

class ViewStudentData extends Component {
    state = {
        students: []
    }

    componentDidMount() {
        this.setState({ students: this.props.students })
    }


    render() {
        return (

            <div className='admin-page add-new-student'>
                <Header />
                <div className='admin-heading'>
                    <h2 style={{ padding: '20px' }}> View Student Data</h2>
                    <div style={{ position: 'absolute', top: '6%', right: '20%', fontSize: '30px' }}>
                        <a href="/AddNewStudent">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        </a>
                    </div>

                    <Table striped bordered hover size="sm" className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Gender</th>  
                                <th>Roll #</th>
                                <th>Father Name</th>
                                <th>Father Cnic</th>
                                <div style={{ margin: 10 }}>
                                    <a href="/AddNewStudent">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </a>
                                </div>

                            </tr>
                        </thead>

                        <tbody>


                            {
                                this.state.students.map((student, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{student.firstName+' '+ student.lastName}</td> 
                                        <td>{student.gender}</td> 
                                        <td>{student.rollNo}</td> 
                                        <td>{student.fatherName}</td>
                                        <td>{student.fatherCnic}</td>
                                        <div style={{ margin: 10 }}>
                                            <a href="/AddNewStaff">
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </tr>
                                )

                            }

                        </tbody>

                    </Table>

                </div>



            </div>

        )
    }
}

const mapState = state => {
    return {
        token: state.authReducers.token,
        students: state.appReducers.students,
    }
}
const mapDispatch = dispatch => {
    return {

    }
}



export default connect(mapState, mapDispatch)(ViewStudentData);