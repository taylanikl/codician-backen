import React, { Component } from "react";
import PersonDataService from "../services/personData.service";

import { Link } from "react-router-dom";

export default class AddPerson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      name: "",
      lastName: "",
      email: "",
      tel: "",
      company: "",
      submitted: false,
      error: null,
    };
  }

  handleChangeText = (key) => (e) =>
    this.setState({
      [key]: e.target.value,
    });

  savePerson = () => {
    const { title, name, lastName, email, tel } = this.state;

    if (!title || !name || !lastName || !email || !tel) {
      this.setState({
        error: "Please fill the blanks",
      });

      return;
    }

    const { id } = this.props.match.params;

    var data = {
      title,
      name,
      lastName,
      email,
      tel,
      company: id,
    };

    PersonDataService.create(data)
      .then((response) => {
        console.log("Person is added !");
        console.log(response.data);
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  newPerson = () => {
    this.setState({
      title: "",
      name: "",
      lastName: "",
      email: "",
      tel: "",
      company: "",
      submitted: false,
      error: null,
    });
  };

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/company"} className="btn btn-link">
              Return to List
            </Link>
            <button className="btn btn-success mt-2" onClick={this.newPerson}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <h2>Add Person</h2>
            <div className="form-group">
              <label htmlFor="title">
                Title <label className="text-danger">*</label>
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.handleChangeText("title")}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">
                Name <label className="text-danger">*</label>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.handleChangeText("name")}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="iAddress">
                Lastname <label className="text-danger">*</label>
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                required
                value={this.state.lastName}
                onChange={this.handleChangeText("lastName")}
                name="lastName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="iAddress">
                Email <label className="text-danger">*</label>
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.handleChangeText("email")}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="iAddress">
                Tel <label className="text-danger">*</label>
              </label>
              <input
                type="text"
                className="form-control"
                id="tel"
                required
                value={this.state.tel}
                onChange={this.handleChangeText("tel")}
                name="tel"
              />
            </div>

            {!!this.state.error && (
              <p className="text-danger">{this.state.error}</p>
            )}
            <button onClick={this.savePerson} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
