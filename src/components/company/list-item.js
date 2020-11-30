import React, { PureComponent } from "react";

export default class ListItem extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onClick, index } = this.props;
    onClick(this.props, index);
  }

  render() {
    const { companyName, iAddress, index, activeIndex } = this.props;

    return (
      <li
        className={`list-group-item ${index === activeIndex ? "active" : ""}`}
        onClick={this.handleClick}
      >
        <p className="mb-0">{companyName}</p>
        <small>{iAddress}</small>
      </li>
    );
  }
}
