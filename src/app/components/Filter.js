import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Filter extends React.Component {
  constructor() {
    super();

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
};

Filter.propTypes = {
  activeFilterCallback: PropTypes.func.isRequired,
  filterCallback: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired
};
