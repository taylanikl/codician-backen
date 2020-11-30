import React, { Component } from "react";

import { Link } from "react-router-dom";

import { CompanyList, CompanyDetail } from "../components/company";
import { PeopleList } from "../components/person";
import { AddressList } from "../components/address";

import CompanyDataService from "../services/companyData.service";
import PersonDataService from "../services/personData.service";
import AddressDataService from "../services/addressData.service";

export default class CompanyScene extends Component {
  constructor(props) {
    super(props);

    this.retrieveCompany = this.retrieveCompany.bind(this);
    this.retrievePeople = this.retrievePeople.bind(this);
    this.retrieveAddresses = this.retrieveAddresses.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDeletePerson = this.handleDeletePerson.bind(this);
    this.handleDeleteAddress = this.handleDeleteAddress.bind(this);

    this.state = {
      activeCompany: null,
      companies: null,
      people: null,
      addresses: null,
    };
  }

  componentDidMount() {
    this.retrieveCompany();
  }

  handleSelect(activeCompany) {
    this.setState({ activeCompany, people: null });
    this.retrievePeople(activeCompany);
    this.retrieveAddresses(activeCompany);
  }

  handleDeletePerson() {
    this.retrievePeople(this.state.activeCompany);
  }

  handleDeleteAddress() {
    this.retrieveAddresses(this.state.activeCompany);
  }

  retrieveAddresses(currentCompany) {
    AddressDataService.getAddress(currentCompany.id)
      .then((response) => {
        console.log("Response: ", response);
        this.setState({
          addresses: response.data,
        });

        if (response.data.length) {
          const { latitude, longitude } = response.data[0];

          const ibbMAP = new window.SehirHaritasiAPI(
            {
              mapFrame: "mapFrame",
              apiKey: "1ffcbc786db44815b40a31300a8dee6d",
            },
            function () {
              ibbMAP.Panorama.Open({
                lat: latitude,
                lon: longitude,
                angle: 10,
              });
            }
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrieveCompany() {
    CompanyDataService.getAll()
      .then((response) => {
        this.setState({
          companies: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrievePeople(currentCompany) {
    PersonDataService.getPeople(currentCompany.id)
      .then((response) => {
        this.setState({
          people: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { companies, addresses, activeCompany, people } = this.state;

    if (!companies) return null;

    return (
      <div className="row mt-5">
        <div className="col-6">
          <CompanyList
            onSelect={this.handleSelect}
            companies={companies}
          ></CompanyList>
        </div>
        <div className="col-6">
          {!!activeCompany && (
            <>
              <CompanyDetail {...activeCompany} />
              <hr></hr>
              {!!people && (
                <>
                  <h4 className="my-4">
                    Employee
                    <Link
                      to={"/addPerson/" + activeCompany.id}
                      className="ml-3 badge badge-warning"
                    >
                      Add person
                    </Link>
                  </h4>
                  <PeopleList
                    onDelete={this.handleDeletePerson}
                    people={people}
                  />
                </>
              )}
              {!!addresses && (
                <>
                  <h4 className="my-4">
                    Addresses
                    <Link
                      to={"/addAddress/" + activeCompany.id}
                      className="ml-3 badge badge-warning"
                    >
                      Add address
                    </Link>
                  </h4>
                  <AddressList
                    onDelete={this.handleDeleteAddress}
                    people={addresses}
                  />

                  <iframe
                    title="ibb-map"
                    id="mapFrame"
                    src="http://sehirharitasi.ibb.gov.tr"
                    style={{ height: "100%", width: "100%" }}
                  ></iframe>
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}
