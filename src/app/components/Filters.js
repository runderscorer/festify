import React from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';
import { timeRangeFilters } from '../constants/filters'

export default class Filters extends React.Component {
  render() {
    const {
      activeFilter,
      activeFilterCallback,
      filterCallback
    } = this.props;

    return (
      <div className='filters'>
        {Object.keys(timeRangeFilters).map(filterValue => {
          return (
            <Filter
              active={filterValue === activeFilter}
              activeFilterCallback={activeFilterCallback}
              filterCallback={filterCallback}
              filterParam='time-range'
              filterValue={filterValue}
              key={filterValue}
              label={timeRangeFilters[filterValue]}
            />
          )
        })}
      </div>
    )
  }
};

Filters.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  activeFilterCallback: PropTypes.func.isRequired,
  filterCallback: PropTypes.func.isRequired
};
