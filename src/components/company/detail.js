import React, { PureComponent } from "react";

import { Link } from "react-router-dom";

export default class CompanyDetail extends PureComponent {
  render() {
    const { id, companyName, iAddress } = this.props;

    return (
      <div>
        <h4>
          Details
          <Link to={"/company/" + id} className="ml-4 badge badge-warning">
            Edit
          </Link>
        </h4>
        <div className="mt-3">
          <label>
            <strong>Name:&nbsp;</strong>
          </label>
          {companyName}
        </div>
        <div className="mb-3">
          <label>
            <strong>Internet Address:&nbsp;</strong>
          </label>
          {iAddress}
        </div>
      </div>
    );
  }
}
