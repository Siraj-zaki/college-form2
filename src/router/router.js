import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "../auth/Login";
import Posts from "../screens/Posts";
import AddNewStudent from "../screens/AddNewStudent";
import AddNewServices from "../screens/AddNewServices";
import AddNewStaff from '../screens/AddNewStaff';
import ViewStaff from '../screens/ViewStaff';
import ViewStudent from '../screens/ViewStudent';
import AddNewFee from '../screens/AddNewFee';
import OverDue from '../screens/OverDue';
import FeeCollection from '../screens/FeeCollection';
import FeeReport from '../screens/FeeReport';
import ViewStudentData from '../screens/ViewStudentData';
import ClassForm from '../screens/ClassForm';
import ClassGeneration from '../screens/ClassGeneration'; 
import { connect,  } from "react-redux"; 
// import {store,per} from '../store/store'

class ReactRouter extends React.Component {

   

  render() {
   
    
    return (

      <React.Fragment>

        <Route exact path="/" component={Login} >
          {this.props.logged &&    <Redirect to="/posts" />}
        </Route>
        <Route path="/posts" component={Posts} />
        <Route path="/AddNewStudent" component={AddNewStudent} />
        <Route path="/AddNewServices" component={AddNewServices} />
        <Route path="/AddNewStaff" component={AddNewStaff} />
        <Route path="/ViewStaff" component={ViewStaff} />
        <Route path="/ViewStudent" component={ViewStudent} />
        <Route path="/AddNewFee" component={AddNewFee} />
        <Route path="/OverDue" component={OverDue} />
        <Route path="/FeeReport" component={FeeReport} />
        <Route path="/FeeCollection" component={FeeCollection} />
        <Route path="/ViewStudentData" component={ViewStudentData} />
        <Route path="/ClassForm" component={ClassForm} />
        <Route path="/ClassGeneration" component={ClassGeneration} />
      </React.Fragment>
    );
  }
}

const mapState = state => {
  return {
    logged: state.authReducers.logged
  }
}


export default connect(mapState, null)(ReactRouter);
