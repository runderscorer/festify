import React from 'react';
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
}
