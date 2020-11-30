import React, { Component } from "react";
import CompanyDataService from "../services/companyData.service";

export default class Company extends Component {
  constructor(props) {
    super(props);
    this.onChangecompanyName = this.onChangecompanyName.bind(this);
    this.onChangeiAddress = this.onChangeiAddress.bind(this);
    this.getCompany = this.getCompany.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateCompany = this.updateCompany.bind(this);
    this.deleteCompany = this.deleteCompany.bind(this);

    this.state = {
      currentCompany: {
        companyName: "",
        iAddress: ""
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getCompany(this.props.match.params.id);
  }

  onChangecompanyName(e) {
    const companyName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentCompany: {
          ...prevState.currentCompany,
          companyName: companyName,
        },
      };
    });
  }

  onChangeiAddress(e) {
    const iAddress = e.target.value;

    this.setState((prevState) => ({
      currentCompany: {
        ...prevState.currentCompany,
        iAddress: iAddress,
      },
    }));
  }

  getCompany(id) {
    CompanyDataService.get(id)
      .then((response) => {
        this.setState({
          currentCompany: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentCompany.id,
      companyName: this.state.currentCompany.companyName,
      iAddress: this.state.currentCompany.iAddress,
      published: status,
    };

    CompanyDataService.update(this.state.currentCompany.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentCompany: {
            ...prevState.currentCompany,
            published: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateCompany() {
    CompanyDataService.update(
      this.state.currentCompany.id,
      this.state.currentCompany
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The company was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteCompany() {
    CompanyDataService.delete(this.state.currentCompany.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/company");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentCompany } = this.state;

    return (
      <div>
        {currentCompany ? (
          <div className="edit-form">
            <h4>Company</h4>
            <form>
              <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="companyName"
                  value={currentCompany.companyName}
                  onChange={this.onChangecompanyName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="iAddress">Internet Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="iAddress"
                  value={currentCompany.iAddress}
                  onChange={this.onChangeiAddress}
                />
              </div>

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCompany}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCompany}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Company...</p>
          </div>
        )}
      </div>
    );
  }
}
