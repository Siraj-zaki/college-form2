import React, { Component } from "react";
import Header from '../header';
import '../index.css'
import Loader from 'react-loader-spinner'
export default class FeeCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Fee: 3000,
            paidfee: '',
            remainingfee: '',
            curTime: new Date().toLocaleString(),
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRemaining = this.handleRemaining.bind(this);
    }

    handleChange(event) {
        this.setState({ Fee: event.target.value });
    }

    handleSubmit(event) {
        this.setState({ paidfee: event.target.value })
    }
    handleRemaining(event) {
        this.setState({ remainingfee: event.target.value })
    }
    render() {
        return (

            <div className='admin-page add-new-student'>
                <Header />
                <div className='admin-heading'>

                    <h2 className="hide-on-print">Fee Collection</h2>
                </div>
                <hr />
                <form>
                    <div className="form-row  ">
                        <div class="form-group col-md-3 onprint">
                            <label for="name">Name</label>
                            <input type="text" class="form-control form-control-sm" id="name" placeholder="Name"></input>
                        </div>
                        <div class="form-group col-md-3 onprint">
                            <label for="first-name">Roll No</label>
                            <input type="number" class="form-control form-control-sm" id="first-name" placeholder="Roll No"></input>
                        </div>
                        <div class="form-group col-md-3 onprint">
                            <label for="fathername">Father Name</label>
                            <input type="text" class="form-control form-control-sm" id="fathername" placeholder="Father Name"></input>
                        </div>
                        <div class="form-group col-md-3 custom-select-sm">
                            <label for="gender">Gender</label><br />
                            <select class="custom-select custom-select-sm" id="gender">
                                <option selected>Select Your Gender</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                                <option value="3">Other</option>
                            </select>
                        </div>
                        <div class="form-group col-md-3 onprint">
                            <label for="fee">Fee</label>
                            <input type="text" class="form-control form-control-sm" id="fee" placeholder="" value={this.state.Fee} onChange={this.handleChange} ></input>
                        </div>
                        <div class="form-group col-md-3 onprint">
                            <label for="paidfee">Paid Fee</label>
                            <input type="text" class="form-control form-control-sm" id="paidfee" placeholder="Paid Fee" value={this.state.paidfee} onChange={this.handleSubmit}></input>
                        </div>
                        <div class="form-group col-md-3 onprint">
                            <label for="fathername">Remaining Fee</label>
                            <input type="text" class="form-control form-control-sm" id="fathername" placeholder="" value={this.state.Fee - this.state.paidfee} onChange={this.handleRemaining} ></input>
                        </div>
                        <div class="form-group col-md-3 onprint">
                            <label for="fathername">Dated</label>
                            <input type="text" class="form-control form-control-sm" id="fathername" placeholder="" value={this.state.curTime} ></input>
                        </div>
                    </div>

                    <button type="button" class="btn btn-primary margin-top hide-on-print" onClick={() => window.print()} >Print</button>
                </form>

            </div>

        )
    }
}
