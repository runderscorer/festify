import React from 'react';
import { Link } from 'react-router-dom';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      activeFilterCallback,
      filterCallback,
      filterValue
    } = this.props;

    activeFilterCallback(filterValue);
    filterCallback(filterValue);
  }

  render() {
    const {
      active,
      label,
      filterParam,
      filterValue
    } = this.props;

    return (
      <Link
        className={`filter ${active ? 'active' : ''}`}
        onClick={this.handleClick}
        to={`?${filterParam}=${filterValue}`}
      >
        {label}
      </Link>
    )
  }
}
