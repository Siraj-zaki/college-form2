import React, { Component } from "react";
import { Table } from 'react-bootstrap';
import Header from '../header';
import '../index.css'
import Loader from 'react-loader-spinner'

class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      text: ""
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.markItemCompleted = this.markItemCompleted.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }
  handleTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }
  handleAddItem(event) {
    event.preventDefault();

    var newItem = {
      id: Date.now(),
      text: this.state.text,
      done: false
    };

    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: ""
    }));
  }
  markItemCompleted(itemId) {
    var updatedItems = this.state.items.map(item => {
      if (itemId === item.id)
        item.done = !item.done;

      return item;
    });

    // State Updates are Merged
    this.setState({
      items: [].concat(updatedItems)
    });
  }
  handleDeleteItem(itemId) {
    var updatedItems = this.state.items.filter(item => {
      return item.id !== itemId;
    });

    this.setState({
      items: [].concat(updatedItems)
    });
  }
  render() {
    return (

      <div className='admin-page add-new-student'>
        <Header />

        <h3 className="apptitle hide-on-print" style={{ paddingBottom: 20 }}>Add New Fee</h3>
        <Name />
        <div className='hide-on-print' style={{ alignSelf: 'flex-start' }}>
          <form className="row">
            <div className="col-md-8">
              <input type="text" className="form-control" onChange={this.handleTextChange} value={this.state.text} />
            </div>
            <button className="btn btn-primary" style={{ fontSize: '10px' }} onClick={this.handleAddItem} disabled={!this.state.text}>{"Add New Services #" + (this.state.items.length + 1)}</button>
          </form>
          <div className="row" style={{ padding: '20px' }}>
            <div className="col-md-12" >
              <TodoList items={this.state.items} onItemCompleted={this.markItemCompleted} onDeleteItem={this.handleDeleteItem} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoApp
class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.markCompleted = this.markCompleted.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  markCompleted(event) {
    this.props.onItemCompleted(this.props.id);
  }
  deleteItem(event) {
    this.props.onDeleteItem(this.props.id);
  }
  // Highlight newly added item for several seconds.
  componentDidMount() {
    if (this._listItem) {
      // 1. Add highlight class.
      this._listItem.classList.add("highlight");

      // 2. Set timeout.
      setTimeout((listItem) => {
        // 3. Remove highlight class.
        listItem.classList.remove("highlight");
      }, 500, this._listItem);
    }
  }
  render() {
    return (
      <div>
        <Table className='itemClass' ref={li => this._listItem = li}  >
          <thead style={{ width: 400 }} >
            <td style={{ width: 400, justifyContent: 'space-between', display: 'flex' }}>
              <span>{this.props.text}</span>
              <button type="button" className="btn btn-danger btn-sm" onClick={this.deleteItem} style={{ marginLeft: 50 }}>x</button>
            </td>
          </thead >
        </Table>
      </div>
    );
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul className="todolist">
        {this.props.items.map(item => (
          <TodoItem key={item.id} id={item.id} text={item.text} completed={item.done} onItemCompleted={this.props.onItemCompleted} onDeleteItem={this.props.onDeleteItem} />
        ))}
      </ul>
    );
  }
}
class Name extends React.Component {
  state = {
    Search: "",
    TotalMonths: null,
    TotalAmountPerMonths: null,
    genrate: false,

    dataarray: [
      {
        name: "Ali",
        class: 'unpar',
        semester: 'unknown',
        rollno: '124',
        totalfee: 5000,
      },
      {
        name: "Ali",
        class: 'unpar',
        semester: 'unknown',
        rollno: '124',
        totalfee: 5000,
      }, {
        name: "Ali",
        class: 'unpar',
        semester: 'unknown',
        rollno: '124',
        totalfee: 5000,
      }
    ]
  }
  render() {
    return (
      <div style={{ alignSelf: 'flex-start', width: '100%' }}>
        <form style={{ width: '100%' }}>
          {/* <div className="form-row ">
            <div class="form-group col-md-3">
              <label for="first-name">Name</label>
              <input type="text" class="form-control form-control-sm" id="first-name" placeholder="Name"></input>
            </div>
            <div class="form-group col-md-3">
              <label for="fee">Fee</label>
              <input type="number" class="form-control form-control-sm" id="fee" placeholder="Description"></input>
            </div>
            <div class="form-group col-md-3">
              <label for="last-name">Tax</label>
              <input type="text" class="form-control form-control-sm" id="last-name" placeholder="Tax"></input>
            </div>
          </div> */}
          <div className="search-bar hide-on-print">
            <input type="text" id="search" onChange={(e) => this.setState({ Search: e.target.value })} placeholder="Search" />
          </div>
        </form>
        <Table striped bordered hover size="sm" className="table hide-on-print">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Class</th>
              <th>Semester</th>
              <th>Roll No</th>
              <th>Total Fee</th>
            </tr>
          </thead>

          <tbody>


            {
              this.state.dataarray.map((student, index) =>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.class}</td>
                  <td>{student.semester}</td>
                  <td>{student.rollno}</td>
                  <td>{student.totalfee}</td>
                </tr>
              )

            }

          </tbody>

        </Table>

        <h1 className="hide-on-print" style={{ textAlign: 'center', fontSize: 20 }}>Genrate Schedule</h1>
        <div className="hide-on-print" style={{ width: 500, display: 'flex', justifyContent: "space-between", alignItems: 'center', margin: 10 }}>
          <span>Total Months: </span>
          <input className="total-months" type="number" name="text" value={this.state.TotalMonths} id="months" placeholder="0" onChange={(e) => this.setState({ TotalMonths: e.target.value })} />
        </div>
        <div className="hide-on-print" style={{ width: 500, display: 'flex', justifyContent: "space-between", alignItems: 'center', margin: 10 }}>
          <span>Total Amount Per Months: </span>
          <input className="total-months new-total-months" type="number" name="text" value={this.state.TotalAmountPerMonths} id="months" placeholder="0" onChange={(e) => this.setState({ TotalAmountPerMonths: e.target.value })} />
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
                  this.state.dataarray.map((student, index) =>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>Due Date</td>
                      <td>Amount</td>
                      <td>Voucher Date</td>
                    </tr>
                  )

                }

              </tbody>

            </Table>
            <button className='btn-primary m-2 hide-on-print' onClick={() => window.print()}>Print</button>
          </div>
        }
      </div>
    );
  }
}