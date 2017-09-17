import React from 'react';
import Filter from './Filter';
import { timeRangeFilters } from '../constants/filters'

export default class Filters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFilter: this.props.activeFilter
    }
  }

  componentWillReceiveProps() {
    const { activeFilter } = this.props;

    this.setState({
      activeFilter: activeFilter
    })
  }

  render() {
    const {
      activeFilterCallback,
      filterCallback
    } = this.props;
    const { activeFilter } = this.state;

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
