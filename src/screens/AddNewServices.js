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
      text: "",

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

        <h3 className="apptitle">Add New Services</h3>
        <Name />
        <div style={{ alignSelf: 'flex-start' }}>
          <form className="row">
            <div className="col-md-8">
              <input  type="text" className="form-control" onChange={this.handleTextChange} value={this.state.text} />
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

export default (TodoApp);
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
      <Table className='itemClass' ref={li => this._listItem = li}  >
        <thead style={{ width: 400 }} >
          <td style={{ width: 400, justifyContent: 'space-between', display: 'flex' }}>
            <span>{this.props.text}</span>
            <button type="button" className="btn btn-danger btn-sm" onClick={this.deleteItem} style={{ marginLeft: 50 }}>x</button>
          </td>
        </thead >
      </Table>
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
  render() {
    return (
      <div style={{ alignSelf: 'flex-start' }}>
        <form>
          <div className="form-row ">
            <div class="form-group col-md-6">
              <label for="first-name">NAME</label>
              <input type="text" class="form-control form-control-sm" id="first-name" placeholder="NAME"></input>
            </div>
            <div class="form-group col-md-12">
              <label for="last-name">Description</label>
              <textarea type="password" class="form-control form-control-sm" id="last-name" placeholder="Description"></textarea>
            </div>
          </div>
        </form>
      </div>
    );
  }
}