import React from "react";
import { Route } from "react-router-dom";
import login from "../components/login";
import Posts from "../components/Posts";
import AddNewStudent from "../components/AddNewStudent";
import AddNewServices from "../components/AddNewServices";
import AddNewStaff from '../components/AddNewStaff';
import ViewStaff from '../components/ViewStaff';
import ViewStudent from '../components/ViewStudent';
import AddNewFee from '../components/AddNewFee';
import OverDue from '../components/OverDue';
import FeeCollection from '../components/FeeCollection';
import FeeReport from '../components/FeeReport';
import ViewStudentData from '../components/ViewStudentData';
import ClassForm from '../components/ClassForm';
import ClassGeneration from '../components/ClassGeneration';
class ReactRouter extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={login} />
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

export default ReactRouter;
