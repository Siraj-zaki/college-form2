import React, { Component } from "react";
import Header from '../header';
import '../index.css'
import { Table } from 'react-bootstrap';
import Loader from 'react-loader-spinner'
class OverDue extends Component {
    state = {
        staffdata: [
            { studentname: 'Siraj', rollno: '123456789', name: 'Siraj Zaki', gender: 'male', phone: '03137669964', insitituteName: 'Multiware', lastdate: 'mm/dd/yyyy', fee: '3000', fathername: 'Muneer Ahmed' },
            { studentname: 'Siraj', rollno: '123456789', name: 'Siraj Zaki', gender: 'male', phone: '03137669964', insitituteName: 'Multiware', lastdate: 'mm/dd/yyyy', fee: '3000', fathername: 'Muneer Ahmed' },
            { studentname: 'Siraj', rollno: '123456789', name: 'Siraj Zaki', gender: 'male', phone: '03137669964', insitituteName: 'Multiware', lastdate: 'mm/dd/yyyy', fee: '3000', fathername: 'Muneer Ahmed' },
            { studentname: 'Siraj', rollno: '123456789', name: 'Siraj Zaki', gender: 'male', phone: '03137669964', insitituteName: 'Multiware', lastdate: 'mm/dd/yyyy', fee: '3000', fathername: 'Muneer Ahmed' },
        ]
    }
    render() {
        return (

            <div className='admin-page add-new-student'>
                <Header />
                <div className='admin-heading'>
                    <h2 style={{ padding: '20px' }}>Over Due</h2>
                    <div style={{ position: 'absolute', top: '6%', right: '20%', fontSize: '30px' }}>
                        <a href="/AddNewStafft">
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
                                <th>Student Name</th>
                                <th>Gender</th>
                                <th>Roll No</th>
                                <th>Father Name</th>
                                <th>Fee</th>
                                <th>Last Date</th>
                                <th>Phone</th>
                                <div style={{ margin: 10 }}>
                                    <a href="/AddNewStaff">
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
                                this.state.staffdata.map((e, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{e.studentname}</td>
                                        <td>{e.gender}</td>
                                        <td>{e.rollno}</td>
                                        <td>{e.fathername}</td>
                                        <td>{e.fee}</td>
                                        <td>{e.lastdate}</td>
                                        <td>{e.phone}</td>
                                        <div style={{ margin: 10 }}>
                                            <a href="/AddNewStudent">
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

export default (OverDue);
