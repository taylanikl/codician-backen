import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCompany from "./components/addCompany.component";
import AddAddress from "./components/addAddress.component";
import AddPerson from "./components/addPerson.component";
import Company from "./components/company.component";
import { CompanyScene } from "./scenes";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/company"} className="navbar-brand">
            Codician
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/company"} className="nav-link">
                Companies
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addCompany"} className="nav-link">
                Add Company
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/company"]} component={CompanyScene} />
            <Route exact path="/addCompany" component={AddCompany} />
            <Route exact path="/addAddress/:id" component={AddAddress} />
            <Route path="/addPerson/:id" component={AddPerson} />
            <Route path="/company/:id" component={Company} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
