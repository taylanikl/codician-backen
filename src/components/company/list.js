import React, { Component } from "react";

import ListItem from "./list-item";

export default class List extends Component {
  constructor(props) {
    super(props);

    this.setActiveCompany = this.setActiveCompany.bind(this);

    this.state = {
      activeIndex: -1,
    };
  }

  setActiveCompany(company, activeIndex) {
    const { onSelect } = this.props;
    onSelect(company);

    this.setState({ activeIndex });
  }

  render() {
    const { companies } = this.props;
    const { activeIndex } = this.state;

    return companies.map((company, index) => (
      <ListItem
        {...company}
        key={company.id}
        index={index}
        activeIndex={activeIndex}
        onClick={this.setActiveCompany}
      ></ListItem>
    ));
  }
}
