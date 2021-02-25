import React, { Component } from "react";
import Header from '../header';
import '../index.css'
import img from '../../src/assets/img.jpg'
import { Table } from 'react-bootstrap';
export default class ViewStudent extends Component {
    state = {
        staffdata: [
            {
                FirstName: 'Siraj',
                password: '123456789',
                LastName: 'Zaki',
                gender: 'male',
                phone: '03137669964',
                DateOfBirth: 'dd/mm/yyyy',
                PlaceOfBirth: 'faisalabad',
                Contact: 'phone no',
                Rollno: '740',
                Bloodroup: 'A+',
                StudentCnic: '1234789',
                MobileNO1: '03137669964',
                MobileNO2: '03137669965',
                Email: 'sirajmuneerfsd1@gmail.com',
                Fax: '234567890',
                Nationality: 'Pakistani',
                FatherCnic: '12356789',
                Guardian: 'idk',
                FatherName: 'MuneerAhmed',
                MotherName: 'asdfghjk',
                Address: '1234567890-------',
                Description: 'siraifdkdafafas',
                img: img
            },
            {
                FirstName: 'Siraj',
                password: '123456789',
                LastName: 'Zaki',
                gender: 'male',
                phone: '03137669964',
                DateOfBirth: 'dd/mm/yyyy',
                PlaceOfBirth: 'faisalabad',
                Contact: 'phone no',
                Rollno: '740',
                Bloodroup: 'A+',
                StudentCnic: '1234789',
                MobileNO1: '03137669964',
                MobileNO2: '03137669965',
                Email: 'sirajmuneerfsd1@gmail.com',
                Fax: '234567890',
                Nationality: 'Pakistani',
                FatherCnic: '12356789',
                Guardian: 'idk',
                FatherName: 'MuneerAhmed',
                MotherName: 'asdfghjk',
                Address: '1234567890-------',
                img: img

            },

        ]
    }
    // render() {
    //     return (

    //         <div className='admin-page add-new-student'>
    //             <Header />
    //             <div className='admin-heading'>
    //                 <h2 style={{ padding: '20px' }}> Student Data</h2>
    //                 <div style={{ position: 'absolute', top: '6%', right: '20%', fontSize: '30px' }}>
    //                     <a href="/AddNewStafft">
    //                         <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    //                             <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
    //                             <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
    //                         </svg>
    //                     </a>
    //                 </div>
    //                 <div className='grid'>
    //                     {
    //                         this.state.staffdata.map((e, index) =>
    //                             <div key={index}>
    //                                 <div style={{marginLeft:140}}>
    //                                     <div tyle={{ display: 'flex', width: '100%' }} className="list">
    //                                         <div className="img">
    //                                             <img src={e.img} alt="img" height='50' width='50' style={{ backgroundColor: 'red' }} />
    //                                         </div>
    //                                         <div className="list-data">
    //                                             <span>Name: {e.FirstName + ' ' + e.LastName}</span>
    //                                             <span>Roll no: {e.Rollno}</span>
    //                                             <span> Father Name: {e.FatherName}</span>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         )

    //                     }
    //                 </div>

    //             </div>

    //         </div>


    //     )

    // }
    // state = {
    //     staffdata: [
    //         { username: 'Siraj', password: '123456789', name: 'Siraj Zaki', gender: 'male', phone: '03137669964', insitituteName: 'Multiware', picture: pic },
    //         { username: 'Ali', password: '123456789', name: 'Ali mughal', gender: 'male', phone: '03137669964', insitituteName: 'Multiware', picture: pic },
    //         { username: 'Anjum', password: '123456789', name: 'Anjum Zaki', gender: 'male', phone: '03137669964', insitituteName: 'Multiware', picture: pic },
    //         { username: 'Muneer', password: '123456789', name: 'Muneer Ahmed', gender: 'male', phone: '03137669964', insitituteName: 'Zain associate', picture: pic },
    //     ]
    // }
    render() {
        return (

            <div className='admin-page add-new-student'>
                <Header />
                <div className='admin-heading'>
                    <h2 style={{ padding: '10px' }}> Student Data List</h2>
                    <div style={{ position: 'absolute', top: '6%', right: '20%', fontSize: '30px' }}>
                        <a href="/AddNewStaff">
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
                                <th>Roll No</th>
                                <th>Father Name</th>
                                <th>Picture</th>
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
                                        <td>{e.FirstName + e.LastName}</td>
                                        <td>{e.Rollno}</td>
                                        <td>{e.FatherName}</td>
                                        <td><img src={e.img} className="staffpic" alt="" /></td>
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
