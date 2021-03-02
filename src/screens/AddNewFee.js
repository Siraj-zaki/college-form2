import React from "react";
import { Table } from 'react-bootstrap';
import Header from '../header';
import '../index.css'
import { connect } from "react-redux";
import { setLoading } from "../store/actions/globalActions";
import comma from 'comma-number'

class AddNewFee extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [], searchKey: '',
      month: '', selected: { fee: 100 },
      cnic:'',
    };


  }

  searchHandler = (val) => {
    if (!val) {
      return this.setState({ searchResults: [] })
    }
    let searchKey = val.toLowerCase()

    let students = this.props.students.filter(item => (item.firstName + ' ' + item.lastName).toLowerCase().includes(searchKey) === true)
    this.setState({ searchResults: students })
  }

  cnicHandler = (cnic) => {

    if (this.state.cnic.length - 1 === cnic.length) {
      cnic = cnic.slice(0, cnic.length )
    }
    else if (cnic.length === 5 || cnic.length === 13) {
      cnic += '-'
    }
    else if (cnic.length > 15) {
      return
    }


    this.setState({ cnic })

  }

  render() {

    return (

      <div className='admin-page add-new-student'>
        <Header />

        <h3 className="apptitle hide-on-print" style={{ paddingBottom: 20 }}>Add Fee</h3>
        <div style={{ alignSelf: 'flex-start', width: '100%' }}>
          <form style={{ width: '100%' }}>

            <div className="search-bar hide-on-print">
              <input type="text" id="search"  onChange={(e) => this.searchHandler(e.target.value)} placeholder="Search" />
            </div>
          </form>
          {
            this.state.searchResults.length > 0 &&
            <Table striped bordered hover size="sm" className="table hide-on-print">
              <thead>

                <th>#</th>
                <th>Name</th>
                <th>Class</th>
                <th>Semester</th>
                <th>Roll No</th>
                <th>Total Fee</th>

              </thead>
              {
                this.state.searchResults.map((student, index) =>
                  <tr key={index} onClick={() => this.setState({ selected: student })} >
                    <td>{index + 1}</td>
                    <td>{student.firstName + ' ' + student.lastName}</td>
                    <td>{student.className}</td>
                    <td>{student.noOfSemester}</td>
                    <td>{student.rollNo}</td>
                    <td>{comma(student.fee)}</td>
                  </tr>
                )

              }
            </Table>
          }

          <h1 className="hide-on-print" style={{ textAlign: 'center', fontSize: 20 }}>Genrate Schedule</h1>
          <div className="hide-on-print" style={{ width: 500, display: 'flex', justifyContent: "space-between", alignItems: 'center', margin: 10 }}>
            <span>Total Months: </span>
            <input className="total-months" type="number" name="text" value={this.state.month} id="months" placeholder="0" onChange={(e) => this.setState({ month: e.target.value })} />
          </div>
          <div className="hide-on-print" style={{ width: 500, display: 'flex', justifyContent: "space-between", alignItems: 'center', margin: 10 }}>
            <span>Total Amount Per Months: </span>
            <input className="total-months new-total-months" disabled name="text" style={{ background: '#fff' }} value={this.state.month ? comma(parseInt(this.state.selected.fee / this.state.month)) : null} id="months" placeholder="0" />
          </div>
          <div className="hide-on-print" style={{ width: 500, display: 'flex', justifyContent: "space-between", alignItems: 'center', margin: 10 }}>
            <span>cnic </span>
            <input className="total-months new-total-months" type='number' value={this.state.cnic} onChange={(e) => this.cnicHandler(e.target.value)} id="months" placeholder="12345-1234567-1" />
          </div>
          <button className='btn-primary m-2 hide-on-print' onClick={() => this.setState({ genrate: true })}>Genrate</button>
          {
            this.state.genrate &&
            <div>
              <Table striped bordered hover size="sm" className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Due Date</th>
                    <th>Amount</th>
                    <th>Voucher Date</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    this.state.searchResults.map((student, index) =>
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>Due Date</td>
                        <td>Amount</td>
                        <td>Voucher Date</td>
                      </tr>
                    )}

                </tbody>

              </Table>
              <button className='btn-primary m-2 hide-on-print' onClick={() => window.print()}>Print</button>
            </div>
          }
        </div>
        <div className='hide-on-print' style={{ alignSelf: 'flex-start' }}>
          <form className="row">
            <div className="col-md-8">
              <input type="text" className="form-control" onChange={this.handleTextChange} value={this.state.text} />
            </div>
            <button className="btn btn-primary" style={{ fontSize: '10px' }} onClick={this.handleAddItem} disabled={!this.state.text}>{"Add New Services #"}</button>
          </form>
          <div className="row" style={{ padding: '20px' }}>
            <div className="col-md-12" >
              {/* <TodoList items={this.state.items} onItemCompleted={this.markItemCompleted} onDeleteItem={this.handleDeleteItem} /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.authReducers.user,
    token: state.authReducers.token,
    loading: state.globalReducers.loading,
    students: state.appReducers.students,
  }
}
const mapDispatch = dispatch => {
  return {
    setLoading: bol => dispatch(setLoading(bol)),
  }
}

export default connect(mapState, mapDispatch)(AddNewFee)


class TodoItem extends React.Component {


  render() {
    return (
      <div>
        <Table className='itemClass' ref={li => this._listItem = li}  >
          <thead style={{ width: 400 }} >
            <td style={{ width: 400, justifyContent: 'space-between', display: 'flex' }}>
              <span>{'hy'}</span>
              <button type="button" className="btn btn-danger btn-sm" style={{ marginLeft: 50 }}>x</button>
            </td>
          </thead >
        </Table>
      </div>
    );
  }
}

