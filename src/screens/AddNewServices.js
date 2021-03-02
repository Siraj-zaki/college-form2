import React, { Component } from "react";
import { Table } from 'react-bootstrap';
import Header from '../header';
import '../index.css'
import Loader from 'react-loader-spinner'
import { Loading } from "../components/Icons";
import { connect } from "react-redux";
import api from "../services/api";
import { setLoading } from "../store/actions/globalActions";
import { _getServices } from "../store/middlewares/appMiddleware";

class AddService extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      text: "",
      name: '',
      disp: '',
      ammount: '',
      inCode: props.user.inCode

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

  addService = async (e) => {
    e.preventDefault()
    let service = {
      name: this.state.name,
      discription: this.state.disp,
      ammount: this.state.ammount,
      inCode: this.state.inCode
    }

    this.props.setLoading(true)
    let res = await api.addService(this.props.token, service)
    if (res) {
      this.props._getServices(this.props.token, this.state.inCode)
      alert('Service added successfully')
    }
    this.props.setLoading(false)
  }





  render() {

    const TodoList = ({ item }) => {
      return (

        <Table className='itemClass'  >
          <thead style={{ width: 400 }} >
            <td style={{ width: 400, justifyContent: 'space-between', display: 'flex' }}>
              <span>{item.serviceName}</span>
              <button type="button" className="btn btn-danger btn-sm" style={{ marginLeft: 50 }}>x</button>
            </td>
          </thead >
        </Table>


      );
    }


    return (

      <div className='admin-page add-new-student'>
        <Header />

        <h3 className="apptitle">Add Services</h3>
        <div style={{ alignSelf: 'flex-start' }}>
          <form onSubmit={this.addService} >
            <div className="form-row ">
              <div class="form-group col-md-6">
                <label for="first-name">Name</label>
                <input required onChange={val => this.setState({ name: val.target.value })} type="text" class="form-control form-control-sm" id="first-name" placeholder="NAME"></input>
              </div>
              <div class="form-group col-md-12">
                <label for="last-name">Description</label>
                <textarea required onChange={val => this.setState({ disp: val.target.value })} class="form-control form-control-sm" id="last-name" placeholder="Description"></textarea>
              </div>
            </div>
            <div className="form-row ">
              <div class="form-group col-md-6">
                <label for="first-name">Ammount</label>
                <input required type="text" onChange={val => this.setState({ ammount: val.target.value })} class="form-control form-control-sm" id="first-name" placeholder="Ammount"></input>
              </div>

            </div>

            <button type="submit" class="btn btn-primary margin-top hide-on-print" style={{ height: 50, width: 200 }}  >
              {
                this.props.loading ?
                  <Loading size={30} color='#fff' />
                  :
                  'Add Service'
              }
            </button>
          </form>
        </div>

        <ul className="todolist mt-5" >
          {

            this.props.services.map((item, index) =>
              // <TodoList key={index} item={item} />
              <Table striped bordered hover size="sm" className="table hide-on-print">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <div style={{ margin: 10 }}>
                      <a href="#">
                        <svg aria-hidden="true" width="20px" height="20px" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>
                      </a>
                    </div>
                  </tr>
                </thead>

                <tbody>


                  {
                    this.props.services.map((item, index) =>
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.serviceName}</td>
                        <td>{item.serviceDiscription}</td>
                        <td>{item.serviceAmmount}</td>
                        <div style={{ margin: 10 }}>
                          <a href="#">
                            <svg aria-hidden="true" width="20px" height="20px" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>
                          </a>
                        </div>
                      </tr>
                    )

                  }

                </tbody>

              </Table>
            )
          }
        </ul>


      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.authReducers.user,
    token: state.authReducers.token,
    loading: state.globalReducers.loading,
    services: state.appReducers.services,
  }
}
const mapDispatch = dispatch => {
  return {
    setLoading: bol => dispatch(setLoading(bol)),
    _getServices: (token, code) => dispatch(_getServices(token, code))
  }
}

export default connect(mapState, mapDispatch)(AddService);

