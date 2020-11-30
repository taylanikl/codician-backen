import React, { Component } from "react";
import AddressDataService from "../services/addressData.service";

export default class AddCompany extends Component {
  constructor(props) {
    super(props);
    this.saveAddress = this.saveAddress.bind(this);
    this.newAddress = this.newAddress.bind(this);

    this.state = {
      title: "",
      latitude: null,
      longitude: null,
      submitted: false,
    };
  }

  handleChangeText = (key) => (e) =>
    this.setState({
      [key]: e.target.value,
    });

  saveAddress() {
    const { id } = this.props.match.params;

    AddressDataService.create({ ...this.state, company: id })
      .then((response) => {
        this.setState({
          title: response.data.title,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newAddress() {
    this.setState({
      title: "",
      longitude: "",
      latitude: "",
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newAddress}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <h2>Add Company</h2>
            <div className="form-group">
              <label htmlFor="addressTitle">Address Title</label>
              <input
                type="text"
                className="form-control"
                id="addressTitle"
                required
                value={this.state.title}
                onChange={this.handleChangeText("title")}
                name="addressTitle"
              />
            </div>

            <div className="form-group">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="text"
                className="form-control"
                id="latitude"
                required
                value={this.state.latitude}
                onChange={this.handleChangeText("latitude")}
                name="latitude"
              />
            </div>

            <div className="form-group">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="text"
                className="form-control"
                id="longitude"
                required
                value={this.state.longitude}
                onChange={this.handleChangeText("longitude")}
                name="longitude"
              />
            </div>

            <button onClick={this.saveAddress} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
