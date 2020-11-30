import React, { Component } from "react";
import CompanyDataService from "../services/companyData.service";

export default class AddCompany extends Component {
  constructor(props) {
    super(props);
    this.onChangeCName = this.onChangeCName.bind(this);
    this.onChangeIAddress = this.onChangeIAddress.bind(this);
    this.saveCompany = this.saveCompany.bind(this);
    this.newCompany = this.newCompany.bind(this);

    this.state = {
      companyName: "",
      iAddress: "",
      submitted: false,
    };
  }

  onChangeCName(e) {
    this.setState({
      companyName: e.target.value,
    });
  }

  onChangeIAddress(e) {
    this.setState({
      iAddress: e.target.value,
    });
  }

  saveCompany() {
    var data = {
      companyName: this.state.companyName,
      iAddress: this.state.iAddress,
    };

    CompanyDataService.create(data)
      .then((response) => {
        this.setState({
          companyName: response.data.companyName,
          iAddress: response.data.iAddress,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newCompany() {
    this.setState({
      companyName: "",
      iAddress: "",
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCompany}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <h2>Add Company</h2>
            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                className="form-control"
                id="companyName"
                required
                value={this.state.companyName}
                onChange={this.onChangeCName}
                name="companyName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="iAddress">Internet Address</label>
              <input
                type="text"
                className="form-control"
                id="iAddress"
                required
                value={this.state.iAddress}
                onChange={this.onChangeIAddress}
                name="iAddress"
              />
            </div>

            <button onClick={this.saveCompany} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
