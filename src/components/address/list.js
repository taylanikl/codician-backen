import React, { PureComponent } from "react";

import AddressDataService from "../../services/addressData.service";
import ListItem from "./list-item";

export default class List extends PureComponent {
  constructor(props) {
    super(props);

    this.deleteAddress = this.deleteAddress.bind(this);
  }

  deleteAddress(id) {
    AddressDataService.delete(id)
      .then((response) => {
        const { onDelete } = this.props;
        onDelete(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { people } = this.props;

    return (
      <>
        {people.map((it) => (
          <ListItem {...it} key={it.id} onDelete={this.deleteAddress} />
        ))}
      </>
    );
  }
}
