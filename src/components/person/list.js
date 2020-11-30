import React, { PureComponent } from "react";

import PersonDataService from "../../services/personData.service";
import ListItem from "./list-item";

export default class List extends PureComponent {
  constructor(props) {
    super(props);

    this.deletePerson = this.deletePerson.bind(this);
  }

  deletePerson(id) {
    PersonDataService.delete(id)
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
          <ListItem {...it} key={it.id} onDelete={this.deletePerson} />
        ))}
      </>
    );
  }
}
