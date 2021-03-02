import React from "react";
import { Table } from 'react-bootstrap';
import Header from '../header';
import '../index.css' 
import { Loading } from "../components/Icons";
import { connect } from "react-redux";
import api from "../services/api";
import { setLoading } from "../store/actions/globalActions";
import { _getServices } from "../store/middlewares/appMiddleware";
import ConfirmModal from '../components/ConfirmModal'

class AddService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [], name: '', disp: '', ammount: '', inCode: props.user.inCode,
      deleteID: '', showModal: false,
    };
  }

  componentDidMount() {
    this.setState({ services: this.props.services })
  }



  addService = async (e) => {
    e.preventDefault()
    let service = {
      name: this.state.name.trim(),
      discription: this.state.disp.trim(),
      ammount: this.state.ammount.trim(),
      inCode: this.state.inCod.trim(),
    }

    this.props.setLoading(true)
    let res = await api.addService(this.props.token, service)
    if (res) {
      this.props._getServices(this.props.token, this.state.inCode)
      alert('Service added successfully')
    }
    this.props.setLoading(false)
  }


  deleteHandler = async () => {
    let res = await api.deleteService(this.props.token, this.state.deleteID)
    if (res) {
      this.setState({ services: this.state.services.filter(item => item.serviceID !== this.state.deleteID) })
      this.props._getServices(this.props.token,this.props.user.inCode)
    }

    this.setState({ showModal: false })
  }


  render() {

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
                <input required type="number" onChange={val => this.setState({ ammount: val.target.value })} class="form-control form-control-sm" id="first-name" placeholder="Ammount"></input>
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
          <Table striped bordered hover size="sm" className="table hide-on-print">

            <thead>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Amount</th>
            </thead>

            {

              this.state.services.map((item, index) =>

                <tr key={index}  >
                  <td>{index + 1}</td>
                  <td>{item.serviceName}</td>
                  <td>{item.serviceDescription}</td>
                  <td>{item.serviceAmmount}</td>
                  <div style={{ margin: 10 }}>
                    <a onClick={() => this.setState({ showModal: true, deleteID: item.serviceID })} style={{ color: 'red' }} >
                      <svg aria-hidden="true" width="20px" height="20px" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>
                    </a>
                  </div>
                </tr>

              )
            }

          </Table>

        </ul>
        {
          this.state.showModal &&
          <ConfirmModal onCancelClick={() => this.setState({ showModal: false })} onDoClick={this.deleteHandler} />
        }

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

