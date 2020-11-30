import React, { PureComponent } from "react";

import { Link } from "react-router-dom";

export default class ListItem extends PureComponent {
  handleDelete = (e) => {
    e.preventDefault();

    const { id, onDelete } = this.props;
    onDelete(id);
  };

  render() {
    const { id, name, lastName, email, tel, title } = this.props;

    return (
      <Link to={"/addPerson/" + id}>
        <div className="row align-items-center">
          <div className="col">
            <p className="mb-0">{title},</p>
            <p className="mb-0">
              {name} {lastName}, {email}, {tel}
            </p>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-sm btn-danger"
              onClick={this.handleDelete}
            >
              Delete
            </button>
          </div>
        </div>

        <hr></hr>
      </Link>
    );
  }
}
